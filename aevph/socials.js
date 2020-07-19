function openImage(url) {
    window.open(url);
}

var $img;
var $igimage;
var $caption;
var $creator;


$('.sm-icon').on('click', function() {
    $url = $(this).attr('id') + '.html';
    window.location = $url;
});

var $aevaIntro = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>Hi there! I'm AEVA: <em>Anisa's Extraordinary Virtual Assistant</em>.</p><p>I'm here to help you on your journey today!</p><p>If you ever need a hint on a puzzle, just call on me by tapping on my icon on the bottom right corner of your screen.</p><p>Good luck!</p><p class='footnote'>(Close this window by clicking anywhere)</p></div><img src='aeva-smile.png'></div></div>");

var $aevaHint = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>Need a hint already? That's fine, I won't judge!</p><p>So Anisa said to check her socials. Try clicking around on some of the social media apps to see if you can find anything there.</p></div><img src='aeva-help.png'></div></div>");

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
});
