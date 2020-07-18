var $aevaWifi = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>Dunkin has free wifi but you need to solve this riddle to get the password! Isn't that weird?</p></div><img src='aeva-neutral.png'></div></div>");

var $aevaWifiHint = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>You should be able to find the password by googling it!</p></div><img src='aeva-neutral.png'></div></div>");


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