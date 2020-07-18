var $aevaWhatsApp  = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>Connecting... connecting... connected! Looks like there's a recent WhatsApp message from someone. Seems like it could be helpful? But it's a bit difficult to tell.</p></div><img src='aeva-neutral.png'></div></div>");

var $aevaWhatsAppHint = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>This one's a little ambiguous. How much time do you have left to find Anisa? Listen to the WhatsApp message a little closer.</p></div><img src='aeva-neutral.png'></div></div>");


$(document).ready(function() {
    $aevaWhatsApp.appendTo('.full');
});

$('.full').on('click', function() {
    if ($aevaWhatsApp) {
        $aevaWhatsApp.remove();
    }
    if ($aevaWhatsAppHint) {
        $aevaWhatsAppHint.remove();
    }
});

$('.aeva-button').on('click', function() {
    $aevaWhatsAppHint.appendTo('.full');
});

