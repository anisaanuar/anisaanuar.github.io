var $note;
var $notebox;


$('.cubby-note').on('click', function() {
    $note = $(this).attr('id');
    $notebox = $('<div class="full-screen"><div id="ig" class="cb-note"><img class="feature" src="./' + $note + '.png"></div>');
    $notebox.appendTo('.full');
});

var $aevaInsideCubby = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>You found Anisa's cubby - isn't it great? It seems super cluttered, but maybe there's something in here that can help you find somewhere to look next.</p></div><img src='aeva-neutral.png'></div></div>");

var $aevaInsideCubbyHint = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>Find the place that seems out of order. Check the grocery list and the receipts - what did Anisa not have on her list that she bought? Maybe we can go there next?</p></div><img src='aeva-neutral.png'></div></div>");


$(document).ready(function() {
    $aevaInsideCubby.appendTo('.full');
});

$('.full').on('click', function() {
    if ($notebox) {
        $notebox.remove();
    }
    if ($aevaInsideCubby) {
        $aevaInsideCubby.remove();
    }
    if ($aevaInsideCubbyHint) {
        $aevaInsideCubbyHint.remove();
    }
});

$('.aeva-button').on('click', function() {
    $aevaInsideCubbyHint.appendTo('.full');
});