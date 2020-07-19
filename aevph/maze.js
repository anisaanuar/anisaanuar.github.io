var $aevaMaze  = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>Up to the fifteenth floor we go. I can't believe there are even fifteen floors in this building! It looked so small from the outside... Anyway, now we just need to get to the room Anisa's in.</p></div><img src='aeva-smile.png'></div></div>");

var $aevaMazeHint = $('<div class="aeva-full"><div class="aeva-message"><div class="aeva-message-text"><p>If you could find your way from the top of the maze to the bottom, take a look at the characters you pass through. Combine them to get the number of the room Anisa\'s in.</p></div><img src="aeva-help.png"></div></div>');


$(document).ready(function() {
    $aevaMaze.appendTo('.full');
});

$('.full').on('click', function() {
    if ($aevaMaze) {
        $aevaMaze.remove();
    }
    if ($aevaMazeHint) {
        $aevaMazeHint.remove();
    }
});

$('.aeva-button').on('click', function() {
    $aevaMazeHint.appendTo('.full');
});
