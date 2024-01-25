
$(function(){

	// Hide submenus
	// $('#body-row .collapse').collapse('hide');

	$(".menu-collapsed").addClass("d-flex");

	$(".btn-menu").on("click", function(e){
		alert("dfdsdff")
		e.preventDefault();
		SidebarCollapse();
	});




	function SidebarCollapse(){

		var SeparatorTitle = $(".menu-collapsed");

		if (SeparatorTitle.hasClass("d-flex")){
			SeparatorTitle.addClass("d-none");
			SeparatorTitle.removeClass("d-flex");
			$("#collapse-icon").toggleClass("fa-angle-double-left");
			$(".container-sidebar").addClass("sidebar-collapse");
		} else {
			
			
			$("#collapse-icon").toggleClass("fa-angle-double-right");
			$(".container-sidebar").removeClass("sidebar-collapse");
			setTimeout(function(){
				SeparatorTitle.removeClass("d-none");
				SeparatorTitle.addClass("d-flex");
			}, 500);
		}
	}

});