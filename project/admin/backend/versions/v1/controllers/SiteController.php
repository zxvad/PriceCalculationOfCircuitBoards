<?php
namespace api\versions\v1\controllers;

use api\versions\v1\models\LoginForm;
use api\versions\v1\models\User;
use yii\rest\ActiveController;
use yii\filters\AccessControl;

class SiteController extends ActiveController
{
    public $modelClass = 'api\versions\v1\models\User';

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['access'] = [
            'class' => AccessControl::className(),
            'only' => ['login'],
            'rules' => [
                [
                    'allow' => true,
                    'actions' => ['login'],
                    'roles' => ['?'],
                ],
                [
                    'allow' => true,
                    'actions' => ['logout'],
                    'roles' => ['@'],
                ],
            ],
        ];
        return $behaviors;
    }

    public function actionLogin()
    {
        $model = new LoginForm();
        $jwt = new \Yii::$app->jwt;

        if ($model->load(\Yii::$app->getRequest()->getBodyParams(), '') && $model->login()) {
            $userModel = User::findByUsername($model->username);
            $token['username'] = $userModel->username;
            $userInfo = [
                'username' => $userModel->username,
                'role' => $userModel->role
            ];
            $userInfo['token'] = $jwt::encode($token, $jwt->secret_key);
            echo json_encode($userInfo);
        } else {
            return $model;
        }
    }

    public function actionIndex()
    {
        if (\Yii::$app->user->isGuest) {
            throw new \HttpHeaderException();
        }
        return \Yii::$app->user->getId();
    }
}
