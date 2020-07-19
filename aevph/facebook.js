var $aevaFBHint = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>We're starting off a little easy, it seems. There's no puzzle here, but maybe a clue for later? Just press enter on the password bar or click the home icon to go back to the phone screen.</p></div><img src='aeva-help.png'></div></div>");

$('.full').on('click', function() {
    if ($aevaFBHint) {
        $aevaFBHint.remove();
    }
});

$('.aeva-button').on('click', function() {
    $aevaFBHint.appendTo('.full');
});
