$(document).ready(function() {
	$('body').css('display', 'none');
	$('body').fadeIn(750);

	$('.link').click(function(event) {
		event.preventDefault();
		newLocation = this.href;
		$('body').fadeOut(250, newpage);
	});

	function newpage() {
		window.location = newLocation;
	}
});

function toggleMenu() {
	var menu = document.getElementById("menuWindow");
	var content = document.getElementById("main");
	var menuIcon = document.getElementById("menuIcon");
	if (menu.style.width === "250px") {
		menu.style.width = "0px";
		content.style.marginRight = "0";
		menuIcon.style.right = "0";
	} else {
		menu.style.width = "250px"
		content.style.marginRight = "250px";
		menuIcon.style.right = "250px";
	}
}
