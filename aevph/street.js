var $street;
var $streetbox;


$('.stings').on('click', function() {
    $street = $(this).attr('id');
    switch ($street) {
        case('rest'):
            alert("Doesn't look like there's anything here. Maybe try somewhere else?");
            break;
        case ('213'):
            alert("I love a good ice cream cone on a warm summer day, too. Unfortunately, no sign of Anisa anywhere here.");
            break;
        case ('215'):
            let justiceNote = confirm("The sign outside looks familiar, doesn't it? Seems like Anisa may be around here somewhere.");
            if (justiceNote) {
                window.location = "floorfinder.html";
            }
            break;
        case ('217'):
            alert("You can get your hair done later! There are more important things to worry about right now.");
            break;
        case ('221'):
            alert("It's always good to stop and smell the roses! Now that that's done, get back to the search!!");
            break;
        default:
            alert("Sorry, you can't go there.");
            break;
    }
});

var $aevaStreet  = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>Alright, so this is where we ended up. But there's just a bunch of buildings. How are you supposed to know where to go from here? Anything look familiar?</p></div><img src='aeva-smile.png'></div></div>");

var $aevaStreetHint = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>The hint for this one relates to an earlier puzzle - the Instagram page. If you don't remember or didn't solve for the earlier hint, you could also just look everywhere and hope you end up in the right place!</p></div><img src='aeva-help.png'></div></div>");


$(document).ready(function() {
    $aevaStreet.appendTo('.full');
});

$('.full').on('click', function() {
    if ($aevaStreet) {
        $aevaStreet.remove();
    }
    if ($aevaStreetHint) {
        $aevaStreetHint.remove();
    }
});

$('.aeva-button').on('click', function() {
    $aevaStreetHint.appendTo('.full');
});