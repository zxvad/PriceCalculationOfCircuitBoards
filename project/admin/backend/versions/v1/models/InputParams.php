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

class InputParams extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%input_param}}';
    }

    public function fields()
    {
        return [
            'id',
            'formula_id',
            'type',
            'value',
            'added_on',
        ];
    }


    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['formula_id'], 'exist', 'targetClass' => Formula::className(), 'targetAttribute' => 'id'],
            ['type', 'in', 'range' => ['select', 'input']],
            ['value', 'string'],
            [['type', 'formula_id'], 'required']
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
            'value' => 'Значение',
            'added_on'
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
        ];
    }

    /**
    * @return \yii\db\ActiveQuery
    */
    public function getFormula()
    {
        return $this->hasOne(Formula::className(), ['id' => 'formula_id']);
    }

}