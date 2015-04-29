<?php

namespace console\controllers;

use Yii;
use yii\console\Controller;
use common\components\rbac\rules\GroupRule;

/**
 * RBAC console controller.
 */
class RbacController extends Controller
{
    /**
     * Initial RBAC action
     * @param integer $id Superadmin ID
     */
    public function actionInit($id = null)
    {
        $auth = Yii::$app->authManager;

        // Rules
        $groupRule = new GroupRule();

        $auth->add($groupRule);

        // Roles
        $user = $auth->createRole('USER');
        $user->description = 'User';
        $user->ruleName = $groupRule->name;
        $auth->add($user);

        $admin = $auth->createRole('ADMIN');
        $admin->description = 'Admin';
        $admin->ruleName = $groupRule->name;
        $auth->add($admin);
        $auth->addChild($admin, $user);

        // Admin assignments
        if ($id !== null) {
            $auth->assign($admin, $id);
        }
    }
}
