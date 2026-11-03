var $aevaOutro  = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>We made it! Couldn't have done it without your awesome puzzle-solving skills. :) Looks like you found Anisa. Let's hear what she has to say.</p></div><img src='./assets/aeva/aeva-smile.png'></div></div>");

var $aevaOutroHint = $('<div class="aeva-full"><div class="aeva-message"><div class="aeva-message-text"><p>It was great working with you! You make a really great sleuth. Don\'t forget about me when you\'re famous and successful!! Signing off. - AEVA</p></div><img src="./assets/aeva/aeva-smile.png"></div></div>');


$(document).ready(function() {
    $aevaOutro.appendTo('.full');
});

$('.full').on('click', function() {
    if ($aevaOutro) {
        $aevaOutro.remove();
    }
    if ($aevaOutroHint) {
        $aevaOutroHint.remove();
    }
});

$('.aeva-button').on('click', function() {
    $aevaOutroHint.appendTo('.full');
});
