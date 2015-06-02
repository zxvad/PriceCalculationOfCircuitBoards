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
use api\versions\v1\models\Formula;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;
use yii\filters\auth\QueryParamAuth;
use yii\filters\AccessControl;

class CalculationController extends ActiveController
{
    public $modelClass = 'api\versions\v1\models\Calculation';

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::className(),
        ];
        $behaviors['access'] = [
            'class' => AccessControl::className(),
            'only' => ['make', 'create', 'index', 'update', 'delete'],
            'rules' => [
                [
                    'allow' => true,
                    'actions' => ['make', 'create', 'index', 'update', 'delete'],
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

                        $m = new CalculationSearch();
                        $params = \Yii::$app->getRequest()->getQueryParams();
                        $dataProvider = $m->search($params);
                        return $dataProvider;
                    }
                ]
            ]
        );
    }

    public function actionMake($id)
    {
        $params = \Yii::$app->request->getBodyParams();
        $formulaModel = new Formula();
        return $formulaModel->calculate($id);

    }
}