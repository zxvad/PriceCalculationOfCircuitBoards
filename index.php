<!DOCTYPE html>
<html>
    <head>
	<title>Расчет стоимости печатных плат</title>
    </head>
    <body>
		<div id="logo_div" >
		<a class="start-link" href="index.php"></a>
		</div>
		<?php include("phpinclude/navigation.php"); ?>
		<div class="ui-widget-content add-panel-content">
		<?php
        $CurSec = empty($_GET['cat'])? null: $_GET['cat'];
        echo $CurSec;

		if (empty($CurSec)) {
            include("./public_pages/calculation.php");
        }
		elseif (file_exists("./public_pages/" . $CurSec . ".php")) {
            include("./public_pages/" . $CurSec . ".php");
        }
		?>
        </div>
    </body>
</html>
