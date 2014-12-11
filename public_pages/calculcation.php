<?php
?>
<html>
	<head>

		<link href="dist/css/rspp.css" rel="stylesheet" type="text/css">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta http-equiv='Cache-control' content='no-cache'>
	</head>
	<body>
	<div class="mainStr">
		<div class="params">
			<table class="tab_par">
				<tbody><tr>
						<td width="50%">Тип печатной платы:&nbsp;<br>
						<select id="type_pl"">
							<option value="1">Односторонние</option>
							<option value="2">Двухсторонние</option>
						</select></td>
					</tr>
					<tr>
						<td width="50%">Класс точности:&nbsp;<br>
						<select id="klt">
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
						</select></td>
					</tr>
					<tr>
						<td >Количество ожидаемое к заказу печатных плат:&nbsp;<br>
						<input id="kol_ojpl" type="text" maxlength="4" size="5"></input></td>
					</tr>
					<tr>
						<td>Размеры печатной платы:&nbsp;<br>
                            Длина(мм):&nbsp;
                            <input id="dlpl" type="text" maxlength="4" size="5"></input>
                            Ширина(мм):&nbsp;
                            <input id="shpl" type="text" maxlength="4" size="5"></input>
                            Толщина(мм):&nbsp;
						<select id="hpl">
							<option value="0.1" selected>0.1</option>
							<option value="0.2">0.2</option>
							<option value="0.51">0.51</option>
							<option value="1">1</option>
							<option value="1.5">1.5</option>
							<option value="2">2</option>
						</select></td>
					</tr>
					<tr>
						<td>Защитная маска:&nbsp;<br>
						<select id="mask_1">
							<option value="0">Нет</option>
							<option value="1">С одной стороны</option>
						</select>
						<select id="mask_2">
							<option value="0">Нет</option>
							<option value="2">С двух сторон</option>
						</select></td>
					</tr>
					<tr>
						<td>Маркировка:&nbsp;<br>
						<select id="mark">
							<option value="0">Нет</option>
							<option value="1">С одной стороны</option>
							<option value="2">С двух сторон</option>
						</select></td>
					</tr>
					<tr>
						<td>Вид покрытия:&nbsp;<br>
						<select id="type_pokr_2">
							<option value="1">ГорПос-61</option>
							<option value="2">Олово-свинец</option>
							<option value="3">Иммерсионное золочение</option>
							<option value="4">Гальваническое золочение</option>
						</select>
						<select id="type_pokr_1">
							<option value="2">Олово-свинец</option>
							<option value="4">Гальваническое золочение</option
</select></td>
					</tr>
					<tr id="zol">
						<td>Размеры металлизации печатной платы:<br>
                            Длина(мм):
                            <input id="dlmet" type="text" maxlength="4" size="5">
                            Ширина(мм):
                            <input id="shmet" type="text" maxlength="4" size="5"></td>
					</tr>
					<tr>
						<td>Электроконтроль:<br>
						<select id="el_1">
							<option value="0">Нет</option>
						</select>
						<select id="el_2">
							<option value="0">Нет</option>
							<option value="1">Да</option>
						</select>
						</td>
					</tr>
					<tr>
						<td>Приемка&nbsp;
						<select id="priemka">
							<option value="0">ПЗ</option>
							<option value="1">ОТК</option>
						</select></td>
					</tr>
					<tr>
						<td><button align="right" class="modern" onclick="calc()">Расчет</button></td>
					<tr>
				</tbody>
			</table>
		</div>
		<div id="res_div" align="center">
			<table id="tab_tr" align='center' width="100%">
				<tbody id="tbody_tr">
				</tbody>
			</table>
		</div>
	</div>
	</body>
</html>