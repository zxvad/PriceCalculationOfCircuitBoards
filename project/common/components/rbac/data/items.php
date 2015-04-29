<?php
return [
    'USER' => [
        'type' => 1,
        'description' => 'User',
        'ruleName' => 'group',
    ],
    'ADMIN' => [
        'type' => 1,
        'description' => 'Admin',
        'ruleName' => 'group',
        'children' => [
            'USER',
        ],
    ],
];
