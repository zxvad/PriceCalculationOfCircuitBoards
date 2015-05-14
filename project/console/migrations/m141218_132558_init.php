<?php

use yii\db\Schema;
use yii\db\Migration;

class m141218_132558_init extends Migration
{
    public function up()
    {

        $initialDbDump = file_get_contents(realpath(__DIR__) . '/m000000_000000_initialDump.sql');
        return $this->execute($initialDbDump);

    }

    public function down()
    {
        $this->execute("
		    SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT;
            SET NAMES utf8;
            SET FOREIGN_KEY_CHECKS=0;
            SET UNIQUE_CHECKS=0;
            SET AUTOCOMMIT=0;

            DROP TABLE IF EXISTS `user`;
            DROP TABLE IF EXISTS `formula`;
            DROP TABLE IF EXISTS `calculation`;
            DROP TABLE IF EXISTS `input_param`;
            DROP TABLE IF EXISTS `output_param`;

		    COMMIT;
            SET AUTOCOMMIT=1;
            SET UNIQUE_CHECKS=1;
            SET FOREIGN_KEY_CHECKS=1;
            SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT;
		");
        return true;
    }
}
