var $aevaIntro = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>Hi there! I'm AEVA: <em>Anisa's Extraordinary Virtual Assistant</em>.</p><p>I'm here to help you on your journey today!</p><p>If you ever need a hint on a puzzle, just call on me by tapping on my icon on the bottom right corner of your screen.</p><p>Good luck!</p><p class='footnote'>(Close this window by clicking anywhere)</p></div><img src='aeva-neutral.png'></div></div>");

var $aevaHint = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>Need a hint already? That's fine, I won't judge!</p><p>So you're looking for stuff that Anisa packed up. What's missing from the video that isn't in her second story?</p><p>Hover below for the second hint, if you need it.</p></div><img src='aeva-neutral.png'></div></div>");

var $secondHint = $("<p class='second-hint'>The first missing item is some sort of identification needed to get around Northeastern. The second missing item is something Anisa uses a lot when she wants to get a drink or a pick-me-up. The last item is an accessory Anisa uses to exercise regularly.</p>");

$(document).ready(function() {
    $aevaIntro.appendTo('.full');
});

$('.full').on('click', function() {
    if ($aevaIntro) {
        $aevaIntro.remove();
    }
    if ($aevaHint) {
        $aevaHint.remove();
    }
});

$('.aeva-button').on('click', function() {
    $aevaHint.appendTo('.full');
    $secondHint.appendTo('.aeva-message-text')
});

$('.aeva-second-hint').on('click', function() {
	$secondHint.remove();
	$aevaHint2.appendTo('.aeva-message-text');
})