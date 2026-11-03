var $aevaWhatsApp = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>Connecting... connecting... connected! Looks like there's a recent WhatsApp message from someone. Seems like it could be helpful? But it's a bit difficult to tell.</p></div><img src='./assets/aeva/aeva-smile.png'></div></div>");

var $aevaWhatsAppHint = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>If you can't understand this text, maybe try to translate it.</p><p>Need some more help? Hover below for the unabbreviated text messages.</div><img src='./assets/aeva/aeva-help.png'></div></div>");

var $secondWaHint = $('<p class="second-hint">Kakak: heiiii ada apa<br>Anisa: takde. kenapa?<br>Kakak: bored je<br>Anisa: ya, faham. penat pun<br>Anisa: tapi nanti jumpa malam ini betul?<br>Kakak: betul. jumpa :)<br>Kakak: salam! neesa dah datang ker tak? boleh tunjuk invite sekali lagi. cukup tanya "hantar invite skli lagi" :) jumpa!</p>');


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
    $secondWaHint.appendTo('.aeva-message-text');
});