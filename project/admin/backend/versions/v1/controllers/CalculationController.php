<?php
/**
 * Created by PhpStorm.
 * User: job
 * Date: 12.04.2015
 * Time: 13:38
 */

namespace api\versions\v1\controllers;

use api\versions\v1\models\CalculationForm;
use yii\rest\ActiveController;
use yii\filters\auth\QueryParamAuth;
use yii\filters\AccessControl;

class CalculationController extends ActiveController
{
    public $modelClass = 'api\versions\v1\models\CalculationForm';

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => QueryParamAuth::className(),
        ];
        $behaviors['access'] = [
            'class' => AccessControl::className(),
            'only' => ['calculation'],
            'rules' => [
                [
                    'allow' => true,
                    'actions' => ['Calculation'],
                    'roles' => ['ADMIN'],
                ]
            ],
        ];
        return $behaviors;
    }

    public function actionMake()
    {
        $calcForm = new CalculationForm();
        $params = \Yii::$app->getRequest()->getBodyParams();
        $calcForm->load($params, '');
        if ($calcForm->validate()) {
            return 1;
        }
        else {
            return $calcForm;
        }
    }
}