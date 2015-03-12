function fload() {
	document.getElementById("mask_2").style.display="none";
	document.getElementById("mask_1").style.display="block";
	document.getElementById("type_pokr_2").style.display="none";
	document.getElementById("type_pokr_1").style.display="block";
	document.getElementById("type_pl").value="1";
	document.getElementById("klt").value="3";
	document.getElementById("kol_ojpl").value="";
	document.getElementById("dlpl").value="";
	document.getElementById("shpl").value="";
	document.getElementById("hpl").value="0.1";
	document.getElementById("mask_1").value="0";
	document.getElementById("mask_2").value="0";
	document.getElementById("type_pokr_1").value="2";
	document.getElementById("type_pokr_2").value="1";
	document.getElementById("mark").value="0";
	document.getElementById("zol").style.display="none";
	document.getElementById("el_2").style.display="none";
	document.getElementById("dlmet").value="";
	document.getElementById("shmet").value="";
	document.getElementById("el_1").value="0";
	document.getElementById("el_2").value="0";
}
function changemask(val) {
	document.getElementById("mask_1").value="0";
	document.getElementById("mask_2").value="0";
	document.getElementById("mark").value="0";
	document.getElementById("type_pokr_1").style.display="block";
	document.getElementById("type_pokr_2").style.display="none";
	if (val==1) {
		document.getElementById("mask_1").style.display="block";
		document.getElementById("mask_2").style.display="none";
		document.getElementById("el_1").style.display="block";	
		document.getElementById("el_2").style.display="none";
	} 
	else {
		document.getElementById("mask_1").style.display="none";
		document.getElementById("mask_2").style.display="block";
		document.getElementById("el_1").style.display="none";	
		document.getElementById("el_2").style.display="block";
	}
}

function showmet(val) {
	if (val==3 || val==4) {
		document.getElementById("zol").style.display="block";
	}
	else 
		document.getElementById("zol").style.display="none";
}

function calc() {
	var mask, type_pokr, el;
	if (document.getElementById("kol_ojpl").value==""){
		alert("¬ведите количество ожидаемых к заказу печатных плат!");
		return;
	}
	if (document.getElementById("dlpl").value==""){
		alert("¬ведите длину платы");
		return;
	}
	if (document.getElementById("shpl").value==""){
		alert("¬ведите ширину платы");
		return;
	}
	if (document.getElementById("mask_1").style.display=="block") {
		mask=document.getElementById("mask_1").value;
	}
	else 
		mask=document.getElementById("mask_2").value;
	
		
	if (document.getElementById("type_pokr_1").style.display=="block")
		type_pokr=document.getElementById("type_pokr_1").value;
	else 
		type_pokr=document.getElementById("type_pokr_2").value;
	if (document.getElementById("el_1").style.display=="block")
		el=document.getElementById("el_1").value;
	else
		el=document.getElementById("el_2").value;	
	
	if (type_pokr==3 || type_pokr==4) {
		if (document.getElementById("dlmet").value==""){
			alert("¬ведите длину металлизации");
			return;
		}
		if (document.getElementById("shmet").value==""){
			alert("¬ведите ширину металлизации");
			return;
		}
	}
	
	var ajax;
	try {
		ajax = new XMLHttpRequest();
	}
	catch(e) {
		try {
			ajax=new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch(e) { }
	}
	var tbody_tr=document.getElementById("tbody_tr");
	ajax.open("GET", "../rspp/php/test.php?type_pl="+document.getElementById("type_pl").value+"&klt="+document.getElementById("klt").value+"&kol_ojpl="+document.getElementById("kol_ojpl").value+"&dlpl="+document.getElementById("dlpl").value+"&shpl="+document.getElementById("shpl").value+"&hpl="+document.getElementById("hpl").value+"&mask="+mask+"&mark="+document.getElementById("mark").value+"&type_pokr="+type_pokr+"&el="+el+"&dlmet="+document.getElementById("dlmet").value+"&shmet="+document.getElementById("shmet").value+"&priemka="+document.getElementById("priemka").value, true);
	ajax.send(null);
	ajax.onreadystatechange = function() {	
		if (ajax.readyState == 4 && ajax.status == 200) {
			if (ajax.responseText != "1") {
				tbody_tr.innerHTML = ajax.responseText;
				
				document.getElementById("tab_tr").style.display = "block";
			}
			else {
				alert("ќшибка!");
			}
		}
	}
}

function show_marsh() {
	if (document.getElementsByName('marsh')[0].style.display=='none')
		for (i=0; i<document.getElementsByName('marsh').length; i++) {
			document.getElementsByName('marsh')[i].style.display='';
		}
	else
		for (i=0; i<document.getElementsByName('marsh').length; i++)
			document.getElementsByName('marsh')[i].style.display='none';
			
}

function zifra(str) {
	str_ = "";
	var pattern = new RegExp(/(\d)$/);
	for (i = 0;i <= str.length;i ++ ) {
		if (str[0]=="0") 	continue;
		if (!pattern.test(str[i]))	continue;
		str_  += str[i];
	}
	return str_;
}

function showTypepokr(mask) {
	if (mask==0) {
		document.getElementById("type_pokr_1").style.display="block";
		document.getElementById("type_pokr_2").style.display="none";
	}
	else {
		document.getElementById("type_pokr_2").style.display="block";
		document.getElementById("type_pokr_1").style.display="none";
	}

}