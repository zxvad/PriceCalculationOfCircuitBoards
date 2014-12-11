<?php

class Database
{
     
    public function __construct(){}

    private function printSqlQuery($sql)
    {
            echo "<pre>".$sql."</pre>";
    }

    private function dbconnect() 
    {

    }
    
    private function dbclose($conn) 
    {

    }
    
    private function doQuery($sql)
    {
        $results = array();

        $res = mysql_query($sql);
        while ($row = pg_fetch_array($res)) 
        {
            $result = new QueryResult();
            
            foreach ($row as $key=>$value)
            {
                $result->$key = iconv("UTF-8","windows-1251",$value);
            }
            $results[] = $result;
        }
        $this->dbclose();
        return $results;
    }  
}
?>