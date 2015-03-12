<?php
namespace api\versions\v1;

use yii\base\Module;

class RestModule extends Module
{
    public function init()
    {
        parent::init();

        \Yii::$app->user->identityClass = 'common\models\User';
    }
}