<?php

namespace classes;
use Exception;

include "QueryResult.php";

class Database
{
    private $username;
    private $password;
    private $host;

    public function __construct($username, $password, $host)
    {
        $this->username = $username;
        $this->password = $password;
        $this->host = $host;
    }

    private function dbConnect()
    {
        try {
            $connect = mysql_connect($this->host, $this->username, $this->$password);
            return $connect;
        } catch (Exception $e) {
            throw new Exception('Не удалось подключиться к базе данных');
        }
    }

    private function dbClose($connect)
    {
        try {
            mysql_close($connect);
        } catch (xception $e) {
            throw new Exception('Не удалось закрыть подключение к базе данных');
        }
    }

    private function doQuery($sql)
    {
        $results = array();
        $connect = $this->dbConnect();

        try {
            $res = mysql_query($sql, $connect);
        } catch (Exception $e) {
            throw new Exception('Не удалось выполнить запрос');
        }

        while ($row = pg_fetch_array($res)) {
            $result = new QueryResult();
            foreach ($row as $key=>$value) {
                $result->$key = iconv("UTF-8","windows-1251",$value);
            }
            $results[] = $result;
        }
        $this->dbClose($connect);
        return $results;
    }

    private function printSqlQuery($sql)
    {
            echo "<pre>".$sql."</pre>";
    }
}
?>