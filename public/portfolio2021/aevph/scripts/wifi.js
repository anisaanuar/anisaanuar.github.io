var $aevaWifi = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>Less than an hour left... but it feels like we're so close! Maybe if we connect to wi-fi we can find out where to go next.</p><p>Luckily, Dunkin has free wifi! Buuuut unfortunately, you need to solve this riddle to get the password! Isn't that weird?</p></div><img src='./assets/aeva/aeva-smile.png'></div></div>");

var $aevaWifiHint = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>You should be able to find the answer to the riddle by googling it!</p></div><img src='./assets/aeva/aeva-help.png'></div></div>");


$(document).ready(function() {
    $aevaWifi.appendTo('.full');
});

$('.full').on('click', function() {
    if ($aevaWifi) {
        $aevaWifi.remove();
    }
    if ($aevaWifiHint) {
        $aevaWifiHint.remove();
    }
});

$('.aeva-button').on('click', function() {
    $aevaWifiHint.appendTo('.full');
});