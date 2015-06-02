<?php
/**
 * Created by PhpStorm.
 * User: job
 * Date: 14.04.2015
 * Time: 12:41
 */

namespace api\versions\v1\models;


use yii\db\ActiveRecord;
use yii\behaviors\TimestampBehavior;
use yii\behaviors\BlameableBehavior;

class Formula extends ActiveRecord

{
    const FORMULA_TYPE = 'formula';
    const CALC_TYPE = 'calc';
    const CONSTANT_TYPE = 'constant';
    const INPUT_TYPE = 'input';
    const OUTPUT_TYPE = 'output';

    public $sign = ['+', '*', '/', ',', ')', '+', '=', '>', '<', '(', ' ', '-'];
    public $formuls;
    public $variables;

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%formula}}';
    }

    public function fields()
    {
        return [
            'id',
            'type',
            'variable',
            'title',
            'expression',
            'added_on',
            'calculation_id',
        ];
    }


    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['added_on', 'safe'],
            ['type', 'in', 'range' => [self::FORMULA_TYPE, self::CONSTANT_TYPE, self::INPUT_TYPE, self::OUTPUT_TYPE, self::CALC_TYPE]],
            [['title', 'variable', 'type', 'calculation_id'], 'required'],
            ['expression', 'required', 'when' => function ($model) {
                return $model->type != self::INPUT_TYPE;
            }],
            ['variable', 'unique'],
            ['expression', 'string', 'max' => 500],
            [['calculation_id'], 'exist', 'targetClass' => Calculation::className(), 'targetAttribute' => 'id'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id',
            'type' => 'Тип',
            'variable' => 'Имя переменной',
            'title' => 'Описание',
            'expression' => 'Выражение',
            'added_on' => 'added_on',
        ];
    }


    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'added_on' => [
                'class' => TimestampBehavior::className(),
                'createdAtAttribute' => 'added_on',
                'updatedAtAttribute' => false,
                'value' => function () {
                    $date = new \DateTime();
                    return $date->format('Y:m:d H:i:s');
                }
            ]
        ];
    }

    public function replaceVariable($str)
    {
        //echo "Строка на входе:".$str."\n";
        if ((substr_count($str, '?') * 2) == substr_count($str, '$')) { //возвращает значение, если заменены все переменные, кроме искомой
            eval("\$str = $str;");
            return $str;
        } else {  //если есть переменные в строке
            $c = strpos($str, '$');
            $currentStr = ''; //текущая заменяемая переменная
            while ($c < strlen($str)) {
                if (array_search($str[$c], $this->sign) === false) { //конец переменной
                    $currentStr .= $str[$c];
                    $c++;
                } else {
                    if (($str[$c] == '=') && ($str[$c + 1] != '=')) { //переменная, которую не надо заменять
                        $currentStr = '';
                        $c = strpos(substr($str, $c, strlen($str) - $c - 1), '$') + $c; //позиция в строке новой переменной, находящейся после переменной, которую не надо заменять
                    } else {
                        break;
                    }
                }
            }
            if (($j = array_search($currentStr, $this->variables)) === false) { //находим формулу для переменной tekstr
                //ошибка
                return 0;
            } else {
                //если заменяющая строка является ветвлением, то сразу получаем результат условия, а не строку
                if (strstr($this->formuls[$j], '?')) {
                    $this->formuls[$j] = $this->replaceVariable($this->formuls[$j]);
                }
                $str = str_replace($currentStr, $this->formuls[$j], $str);
                return $this->replaceVariable($str);
            }


        }
    }

    public function calculate($id)
    {

        //берем все формулы
        $params = \Yii::$app->request->getBodyParams();
        $this->formuls = [];
        $this->variables = [];
        $types = [];
        $names = [];
        $i = 0;
        $formulArray = Formula::find()->andWhere(['calculation_id' => $id])->asArray()->all();
        foreach ($formulArray as $row) {
            $this->formuls[$i] = $row['expression'];
            $this->variables[$i] = $row['variable'];
            $types[$i] = $row['type'];
            $names[$i] = $row['title'];
            if ($row['type'] == Formula::INPUT_TYPE) {
                for ($j = 0; $j < count($params); $j++) {
                    if ($row['variable'] == $params[$j]['name']) {
                        $this->formuls[$i] = $params[$j]['value'];
                    }
                }

            }
            $i++;
        }

        $outputParams = Formula::find()->andWhere(['calculation_id' => $id, 'type' => Formula::OUTPUT_TYPE])->asArray()->all();
        $result = [];
        foreach ($outputParams as $row) {
            $j = array_search($row['variable'], $this->variables);
            $result[] = [
                'result' => $this->replaceVariable($this->formuls[$j]),
                'name' => $row['title'],
                'variable' => $row['variable'],
                'a' => $this->variables,
            ];
        }
        return $result;
    }
}