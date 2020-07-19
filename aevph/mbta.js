var $aevaMbta  = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>Seems like you're getting close to wherever Anisa is. Now to use this 'invitation' to figure out where to go next...</p><p>If you missed the invitation, you can get it by clicking <a href='./codenames.png' target='blank'>here</a>.</div><img src='aeva-smile.png'></div></div>");

var $aevaMbtaHint = $('<div class="aeva-full"><div class="aeva-message"><div class="aeva-message-text"><p>Try using the invitation to figure out which T stop Anisa went to.</p><p>It may help to pull up an MBTA map!</p></div><img src="aeva-help.png"></div></div>');


$(document).ready(function() {
    $aevaMbta.appendTo('.full');
});

$('.full').on('click', function() {
    if ($aevaMbta) {
        $aevaMbta.remove();
    }
    if ($aevaMbtaHint) {
        $aevaMbtaHint.remove();
    }
});

$('.aeva-button').on('click', function() {
    $aevaMbtaHint.appendTo('.full');
});
