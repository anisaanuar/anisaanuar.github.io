var $aevaFloor  = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>You're almost there, I can feel it! We just need to figure out where to go from here... Let's start with which floor Anisa's on.</p></div><img src='./assets/aeva/aeva-smile.png'></div></div>");

var $aevaFloorHint = $('<div class="aeva-full"><div class="aeva-message"><div class="aeva-message-text"><p>This type of puzzle is called a "fallen phrase" puzzle. The letters in each column correspond to a letter directly above it. It helps to start with smaller words that seem a little more obvious. None of the words are obscure so just keep an eye out for anything that looks familiar! And don\'t forget - we\'re looking for which <em>floor</em> Anisa is on.</p></div><img src="./assets/aeva/aeva-help.png"></div></div>');


$(document).ready(function() {
    $aevaFloor.appendTo('.full');
});

$('.full').on('click', function() {
    if ($aevaFloor) {
        $aevaFloor.remove();
    }
    if ($aevaFloorHint) {
        $aevaFloorHint.remove();
    }
});

$('.aeva-button').on('click', function() {
    $aevaFloorHint.appendTo('.full');
});
