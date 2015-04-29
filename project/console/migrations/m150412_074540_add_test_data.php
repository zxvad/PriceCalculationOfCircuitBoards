<?php

use yii\db\Schema;
use yii\db\Migration;

class m150412_074540_add_test_data extends Migration
{
    public function up()
    {
        $this->insert('{{%user}}', [
            'id' => 1,
            'username' => 'userTest',
            'password_hash' => '$2y$13$l6ccy8936nLs2AdMXq9tOOya9AOhfN8fqimO9PP11H5HTfHukjnr6',
            'role' => 'USER',
            'firstname' => 'Test',
            'lastname' => 'Test',
            'added_on' => '2015-03-16 07:28:06',
            'dep' => 11
        ]);

        $this->insert('{{%user}}', [
            'id' => 2,
            'username' => 'adminTest',
            'password_hash' => '$2y$13$l6ccy8936nLs2AdMXq9tOOya9AOhfN8fqimO9PP11H5HTfHukjnr6',
            'role' => 'ADMIN',
            'firstname' => 'Admin',
            'lastname' => 'Admin',
            'added_on' => '2015-03-16 07:28:06',
            'dep' => 321
        ]);

    }

    public function down()
    {
        $this->delete('{{%user}}', array('username' =>
            ['userTest',
                'adminTest',
                'dmitry.smirnov@fastdev.se'
            ]));

        return true;
    }
    
    /*
    // Use safeUp/safeDown to run migration code within a transaction
    public function safeUp()
    {
    }
    
    public function safeDown()
    {
    }
    */
}
