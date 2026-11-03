var $aevaSigns  = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>So you took the T to Park Street. But as you know, it's impossible to find your way out without following the signs - unless you're a local. But how do we know which way Anisa went?</div><img src='./assets/aeva/aeva-smile.png'></div></div>");

var $aevaSignsHint = $('<div class="aeva-full"><div class="aeva-message"><div class="aeva-message-text"><p>Do you still have the <a href="./codenames.png" target="blank">invitation</a> from earlier? Remember the answer and see if that helps you here!</div><img src="./assets/aeva/aeva-help.png"></div></div>');


$(document).ready(function() {
    $aevaSigns.appendTo('.full');
});

$('.full').on('click', function() {
    if ($aevaSigns) {
        $aevaSigns.remove();
    }
    if ($aevaSignsHint) {
        $aevaSignsHint.remove();
    }
});

$('.aeva-button').on('click', function() {
    $aevaSignsHint.appendTo('.full');
});

