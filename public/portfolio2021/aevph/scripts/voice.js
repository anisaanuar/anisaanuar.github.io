var $aevaVoice  = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>Nicely done! Now let's see if we can find any clues in Anisa's phone.</p></div><img src='./assets/aeva/aeva-smile.png'></div></div>");

var $aevaVoiceHint = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>This one's a little ambiguous. How much time do you have left to find Anisa? Listen to the voice message a little closer.</p></div><img src='./assets/aeva/aeva-help.png'></div></div>");


$(document).ready(function() {
    $aevaVoice.appendTo('.full');
});

$('.full').on('click', function() {
    if ($aevaVoice) {
        $aevaVoice.remove();
    }
    if ($aevaVoiceHint) {
        $aevaVoiceHint.remove();
    }
});

$('.aeva-button').on('click', function() {
    $aevaVoiceHint.appendTo('.full');
});
