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
                'user',
                'clubsales',
                'partnercontact',
                'clubadmin',
                'superadmin'
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
            'dsn' => 'mysql:host=localhost;port=8080;dbname=marketplace',
            'username' => 'root',
            'password' => 'Gho2Dq4lb',
            'charset' => 'utf8',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            'transport' => [
                'class' => 'Swift_SmtpTransport',
                'host' => 'smtp.gmail.com',
                'username' => 'test.mp.noffside@gmail.com',
                'password' => 'marketplace',
                'port' => '587',
                'encryption' => 'tls',
            ],
        ],

        'user' => [
            'class' => 'yii\web\User',
            'identityClass' => 'common\models\User',
            'on afterLogin' => function($event)
            {
                Yii::$app->user->identity->afterLogin($event);
            }
        ],

        'languageComponent' => [
            'class' => 'common\components\LanguageComponent',
        ],

        'i18n' => [
            'translations' => [
                '*' => [
                    'class' => 'yii\i18n\PhpMessageSource',
                    'basePath' => '@common/messages'
                ],
            ],
        ],
    ],

    'on beforeRequest' => function ($event)
    {

        \Yii::$app->languageComponent->initLanguage();
    }
];
