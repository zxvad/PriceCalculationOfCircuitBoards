<?php
namespace api\versions\v1\models;

use yii\base\Model;

class CalculationForm extends Model
{
    public $type_pl;
    public $klt;
    public $kol_ojpl;
    public $dlpl;
    public $shpl;
    public $hpl;
    public $mark;
    public $mask;
    public $type_pokr;
    public $el;

    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            [['type_pl', 'klt', 'kol_ojpl', 'dlpl', 'shpl', 'hpl', 'mask', 'mark', 'type_pokr', 'el'], 'required'],
            ['type_pokr', 'in', 'range' => [1, 2, 3, 4]],
            ['el', 'in', 'range' => [0, 1]],
            [['mark', 'mask'], 'in', 'range' => [0, 1 ,2]],
            [['hpl'], 'in', 'range' => [0.1, 0.2, 0.51, 1, 1.5, 2]],
            [['shpl', 'dlpl'], 'integer', 'min' => 1, 'max' => 1000],
            [['kol_ojpl'], 'integer', 'min' => 1],
            ['klt', 'in', 'range' => [3, 4, 5]],
            ['type_pl', 'in', 'range' => [1, 2]]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'type_pl' => 'Тип печатной платы',
            'klt' => 'Класс точности',
            'kol_ojpl' => 'Количество ожидаемых к заказу плат',
            'dlpl' => 'Длина',
            'shpl' => 'Ширина',
            'hpl' => 'Толщина',
            'mask' => 'Защитная маска',
            'mark' => 'Маркировка',
            'type_pokr' => 'Вид покрытия',
            'el' => 'Электроконтроль',
        ];
    }
}