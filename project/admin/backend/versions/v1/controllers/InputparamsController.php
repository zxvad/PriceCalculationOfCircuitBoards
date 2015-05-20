<?php
/**
 * Created by PhpStorm.
 * User: job
 * Date: 12.04.2015
 * Time: 13:38
 */

namespace api\versions\v1\controllers;

use api\versions\v1\models\Calculation;
use api\versions\v1\models\CalculationForm;
use api\versions\v1\models\CalculationSearch;
use api\versions\v1\models\InputParamsSearch;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;
use yii\filters\auth\QueryParamAuth;
use yii\filters\AccessControl;

class InputparamsController extends ActiveController
{
    public $modelClass = 'api\versions\v1\models\InputParams';

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::className(),
        ];
        $behaviors['access'] = [
            'class' => AccessControl::className(),
            'only' => ['create', 'index', 'update', 'delete'],
            'rules' => [
                [
                    'allow' => true,
                    'actions' => ['create', 'index', 'update', 'delete'],
                    'roles' => ['ADMIN'],
                ]
            ],
        ];
        return $behaviors;
    }

    public function actions()
    {
        return array_merge(
            parent::actions(),
            [
                'index' => [
                    'class' => 'yii\rest\IndexAction',
                    'modelClass' => $this->modelClass,
                    'checkAccess' => [$this, 'checkAccess'],
                    'prepareDataProvider' => function ($action) {

                        $m = new InputParamsSearch();
                        $params = \Yii::$app->getRequest()->getQueryParams();
                        $dataProvider = $m->search($params);
                        return $dataProvider;
                    }
                ],
                'create' => [
                    'class' => 'api\components\rest\InputParamsCreateAction',
                    'modelClass' => $this->modelClass,
                    'checkAccess' => [$this, 'checkAccess']
                ]
            ]
        );
    }
}