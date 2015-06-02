<?php

$params = array_merge(
    require(__DIR__ . '/../../../common/config/params.php'),
    require(__DIR__ . '/../../../common/config/params-local.php'),
    require(__DIR__ . '/params.php'),
    require(__DIR__ . '/params-local.php')
);

return [
    'id' => 'rest-api',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'modules' => [
        'v1' => [
            'class' => 'api\versions\v1\RestModule',
        ]
    ],
    'components' => [
        'user' => [
            'identityClass' => 'api\versions\v1\models\User',
            'enableSession' => false,
            'enableAutoLogin' => false,
            'loginUrl' => null
        ],
        'log' => [
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'request' => [
            'class' => '\yii\web\Request',
            'enableCookieValidation' => false,
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ],
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'enableStrictParsing' => true,
            'showScriptName' => false,
            'rules' => [
                ['class' => 'yii\rest\UrlRule',
                    'prefix' => 'admin/api',
                    'controller' => [
                        'v1/formula',
                        'v1/calculation',
                        'v1/inputparams',
                        'v1/outputparams',
                    ]
                ],
                'OPTIONS admin/api/v1/site/login' => 'v1/site/login',
                'POST admin/api/v1/site/login' => 'v1/site/login',
                'POST admin/api/v1/calculations/make/<id:\d+>' => 'v1/calculation/make'
            ],
        ],
    ],
    'params' => $params,
];
