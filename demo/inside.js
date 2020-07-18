var $note;
var $notebox;


$('.cubby-note').on('click', function() {
    $note = $(this).attr('id');
    $notebox = $('<div class="full-screen"><div id="ig" class="cb-note"><img class="feature" src="./' + $note + '.png"></div>');
    $notebox.appendTo('.full');
});

$('.full').on('click', function() {
	$notebox.remove();
});