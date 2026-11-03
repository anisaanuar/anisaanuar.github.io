var $aevaCubbies  = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>Nice order! You found a charger with a label on it that says 'Property of Anisa'... Wow, she really loses things easily doesn't she? Well, she's not here, so let's check the climbing gym next. Maybe there's something in Anisa's cubby. But which one is hers?</p></div><img src='./assets/aeva/aeva-smile.png'></div></div>");

var $aevaCubbiesHint = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>The cubbies look like they represent different movies. Which one is the odd one out? Use the songs to help identify them.</p></div><img src='./assets/aeva/aeva-help.png'></div></div>");


$(document).ready(function() {
    $aevaCubbies.appendTo('.full');
});

$('.full').on('click', function() {
    if ($aevaCubbies) {
        $aevaCubbies.remove();
    }
    if ($aevaCubbiesHint) {
        $aevaCubbiesHint.remove();
    }
});

$('.aeva-button').on('click', function() {
    $aevaCubbiesHint.appendTo('.full');
});