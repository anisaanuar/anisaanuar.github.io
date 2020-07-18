var $aeva = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>Hi there! I'm AEVA: <em>Anisa's Extraordinary Virtual Assistant</em>.</p><p>I'm here to help you on your journey today!</p><p>If you ever need a hint on a puzzle, just call on me by tapping on my icon on the bottom right corner of your screen.</p><p>Good luck!</p><p class='footnote'>(Close this window by clicking anywhere)</p></div><img src='aeva-neutral.png'></div></div>");

$(document).ready(function() {
    $aeva.appendTo('.full');
});

$('.full').on('click', function() {
	$aeva.remove();
});

$('.aeva-button').on('click', function() {
	$aeva.appendTo('.full');
});
