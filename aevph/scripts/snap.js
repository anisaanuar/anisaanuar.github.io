var $aevaHint = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>So you're looking for stuff that Anisa packed up. What's missing from the video that isn't in her second story?</p><p>Hover below for the second hint, if you need it.</p></div><img src='./assets/aeva/aeva-help.png'></div></div>");

var $secondHint = $("<p class='second-hint'>The first missing item is some sort of identification needed to get around Northeastern. The second missing item is something Anisa uses a lot when she wants to get bubble tea. The last item is an accessory Anisa uses to exercise regularly - specifically at the rock climbing gym.</p>");

$('.full').on('click', function() {
    if ($aevaHint) {
        $aevaHint.remove();
    }
});

$('.aeva-button').on('click', function() {
    $aevaHint.appendTo('.full');
    $secondHint.appendTo('.aeva-message-text')
});