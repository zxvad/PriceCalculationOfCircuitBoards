<?php

namespace api\versions\v1\controllers;

use yii;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;
use yii\filters\AccessControl;
use api\versions\v1\models\FormulaSearch;

class FormulaController extends ActiveController
{

    public $modelClass = 'api\versions\v1\models\Formula';

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::className(),
        ];
        $behaviors['access'] = [
            'class' => AccessControl::className(),
            'only' => ['index', 'create', 'view', 'update', 'delete'],
            'rules' => [
                [
                    'allow' => true,
                    'actions' => ['index', 'create', 'view', 'update', 'delete'],
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

                        $m = new FormulaSearch();
                        $params = \Yii::$app->getRequest()->getQueryParams();
                        $dataProvider = $m->search($params);
                        return $dataProvider;
                    }
                ]
            ]
        );
    }
} 