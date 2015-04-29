<?php

namespace common\components\rbac\rules;

use Yii;
use yii\rbac\Rule;

/**
 * User group rule class.
 */
class GroupRule extends Rule
{
    /**
     * @inheritdoc
     */
    public $name = 'group';

    /**
     * @inheritdoc
     */
    public function execute($user, $item, $params)
    {
        if (!Yii::$app->user->isGuest) {
            $role = Yii::$app->user->identity->role;

            if ($item->name === 'ADMIN') {
                return $role === $item->name;
            } elseif ($item->name === 'USER') {
                return $role === $item->name || $role === 'ADMIN';
            }
        }
        return false;
    }
}
