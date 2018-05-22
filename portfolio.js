<<<<<<< HEAD
$("#resume").delay(1000).animate({ opacity: 1 }, 700);​
=======
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
>>>>>>> bf0a28e356bb7e08fed37f08ece22ddcb1243ce0
