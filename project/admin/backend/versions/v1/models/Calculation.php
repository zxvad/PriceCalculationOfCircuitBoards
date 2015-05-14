<?php

namespace api\versions\v1\models;

use yii\db\ActiveRecord;
use yii;
/**
 * This is the model class for table "calculation".
 *
 * @property integer $id
 * @property string $title
 */
class Calculation extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%calculation}}';
    }

    public function fields()
    {
        return [
            'id',
            'title'
        ];
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['title', 'required'],
            ['title', 'string', 'max' => 255]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'title' => 'Название расчета'
        ];
    }
}
