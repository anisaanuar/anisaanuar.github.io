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
