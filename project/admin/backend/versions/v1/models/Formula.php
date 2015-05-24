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
            ['expression', 'required', 'when' => function($model) {
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
            'variable'=> 'Имя переменной',
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
                'value' => function (){
                    $date = new \DateTime();
                    return $date->format('Y:m:d H:i:s');
                }
            ]
        ];
    }
}