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
    const INPUT_TYPE = 'input';
    const CALC_TYPE = 'calc';
    const CONSTANT_TYPE = 'constant';
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
            'operation',
            'type',
            'variable',
            'title',
            'expression',
            'tech_proc',
            'added_on',
            'added_by'
        ];
    }


    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['operation', 'tech_proc'], 'string', 'max' => 3],
            ['added_on', 'safe'],
            ['tech_proc', 'default', 'value' => 59],
            ['type', 'in', 'range' => [self::FORMULA_TYPE, self::CONSTANT_TYPE, self::INPUT_TYPE, self::CALC_TYPE]],
            [['title', 'variable', 'type'], 'required'],
            ['expression', 'required', 'when' => function($model) {
                return $model->type != self::INPUT_TYPE;
            }],
            ['expression', 'string', 'max' => 500]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id',
            'operation' => 'Номер операции',
            'type' => 'Тип',
            'variable'=> 'Имя переменной',
            'title' => 'Описание',
            'expression' => 'Выражение',
            'tech_proc' => 'Технический процесс',
            'added_on' => 'added_on',
            'added_by' => 'added_by',
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
            ],
            'added_by' => [
                'class' => BlameableBehavior::className(),
                'attributes' => [
                    ActiveRecord::EVENT_BEFORE_INSERT => ['added_by'],
                ],
            ]
        ];
    }

    /**
    * @return \yii\db\ActiveQuery
    */
    public function getAddedBy()
    {
        return $this->hasOne(User::className(), ['id' => 'added_by']);
    }

}