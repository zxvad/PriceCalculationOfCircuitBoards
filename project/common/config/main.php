<?php
return [
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'components' => [
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'authManager' => [
            'class' => 'yii\rbac\PhpManager',
            'defaultRoles' => [
                'USER',
                'ADMIN',
            ],
            'itemFile' => '@common/components/rbac/data/items.php',
            'assignmentFile' => '@common/components/rbac/data/assignments.php',
            'ruleFile' => '@common/components/rbac/data/rules.php',
        ],
        'jwt' => [
            'class' => 'common\components\Jwt\Jwt'
        ],
        'db' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=localhost;port=8080;dbname=boards',
            'username' => 'root',
            'password' => 'Gho2Dq4lb',
            'charset' => 'utf8',
        ],
        'user' => [
            'class' => 'yii\web\User',
            'identityClass' => 'api\versions\v1\models\User'
        ]
    ]
];
