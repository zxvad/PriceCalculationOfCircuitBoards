<!DOCTYPE html>
<?
?>
<html> <head >
<html>
    <head>
	<title>Расчет стоимости печатной платы</title>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1251">
        <link type="text/css" href="css/jquery-ui-1.10.3.custom.min.css" rel="stylesheet">
	<script src="js/js_rspp.js" type="text/javascript"></script>
		<link type="text/css" href="css/jquery-ui.menubar.css" rel="stylesheet">
        <link type="text/css" href="css/dataTables/jquery.dataTables.css" rel="stylesheet">
		<link type="text/css" href="css/main.css" rel="stylesheet">
    </head>
    <body>
	   <script src="js/jquery-1.9.1.js" type="text/javascript"></script>
        <script src="js/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
        <script src="js/jquery.dataTables.min.js" type="text/javascript"></script>
	<script src="js/jquery-ui.menubar.js" type="text/javascript"></script>
	<script src="js/main.js" type="text/javascript"></script>
		<div id="logo_div" >
		<a class="start-link" href="../rspp/index.php">Расчет стоимости печатной платы</a>
		</div>
		<?php include("phpinclude/navigation.php"); ?>
		<div class="ui-widget-content add-panel-content">
		<?php
		
                $CurSec=empty($_GET['cat'])? null: $_GET['cat']; 
		if(empty($CurSec)) 
			include("./catalogs/rspp.inc.php"); 
		elseif(file_exists("./catalogs/".$CurSec.".inc.php")) 
			include("./catalogs/".$CurSec.".inc.php"); 
		?>
		</div>
    <script src="js/jquery-1.9.1.js" type="text/javascript"></script>
    <script src="js/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
    <script src="js/jquery.dataTables.min.js" type="text/javascript"></script>
	<script src="js/jquery-ui.menubar.js" type="text/javascript"></script>
	<script src="js/main.js" type="text/javascript"></script>
    
    </body>
</html>
