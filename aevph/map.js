var $aevaMap  = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>Alright, we're getting closer. But downton Boston is huge! Anisa could've gone anywhere from here.</div><img src='aeva-smile.png'></div></div>");

var $aevaMapHint = $('<div class="aeva-full"><div class="aeva-message"><div class="aeva-message-text"><p>Do you still have the <a href="./codenames.png" target="blank">invitation</a> from earlier? Remember the answer and see if that helps you here! To find the particular street name, look up "Park Street" on Google Maps and try to line it up with this one!</div><img src="aeva-help.png"></div></div>');


$(document).ready(function() {
    $aevaMap.appendTo('.full');
});

$('.full').on('click', function() {
    if ($aevaMap) {
        $aevaMap.remove();
    }
    if ($aevaMapHint) {
        $aevaMapHint.remove();
    }
});

$('.aeva-button').on('click', function() {
    $aevaMapHint.appendTo('.full');
});
