var table;
var giRedraw = false;
$(function () {
	$(document).keyup(function(e) {
		if (e.keyCode == 27) { 
			$(table.fnSettings().aoData).each(function (){
				$(this.nTr).removeClass('row_selected');
			});
			$("#edit").button("disable");
			$("#del").button("disable");
		}  
	});	
	
	$("#tablespace tbody").on("click", function(event) {
		$(table.fnSettings().aoData).each(function (){
			$(this.nTr).removeClass('row_selected');
		});
                if (event.target.parentNode.nodeName=="TR") {
                    $(event.target.parentNode).addClass('row_selected');
                    $("#edit").button("enable");
                    $("#del").button("enable");
                }
	});
	$("input:text, input:password").button(); 
	$("#menu").menubar({
		autoExpand: true,
		menuIcon: true,
		buttons: true
	});
	function checkRegexp( o, regexp, n ) {
		if ( !( regexp.test( o.val() ) ) ) {
			o.addClass( "ui-state-error" );
			updateTips( n );
			return false;
		} else {
			return true;
		}
	}
});