var $ddarea;

$('.ddclick').on('click', function() {
    $ddarea = $(this).attr('id');
    switch ($ddarea) {
        case ('ddmenu'):
            alert("Yeah, Dunkin's just not as affordable as it once was, amirite? Almost ten dollars for twelve donuts?? A total ripoff.");
            break;
        case ('ddsign'):
            alert("Yes, Dunkin Donuts is where we are.");
            break;
        case ('dddrink'):
            alert("Make sure to keep hydrated! Unfortunately, this drink cooler isn't real, and neither are any of the drinks inside of it.");
            break;
        case ('ddoutlet1'):
        case ('ddoutlet2'):
            window.location = "sudoku.html";
            break;
        case ('dddonuts1'):
        case ('dddonuts2'):
            alert("Donuts! DON(u)T they look so good???");
            break;
        default:
            alert("Just clicking randomly won't get you anywhere!");
            break;
    }
});

var $aevaDunkinDonuts = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>Of course Anisa went to Dunkin. What else did you expect? Maybe there's something there that can help us.</p></div><img src='./assets/aeva/aeva-smile.png'></div></div>");

var $aevaDunkinDonutsHint = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>Think about what we have so far. We have Anisa's phone... but it's dead. :( But we have a charger! :0</p></div><img src='./assets/aeva/aeva-help.png'></div></div>");


$(document).ready(function() {
    $aevaDunkinDonuts.appendTo('.full');
});

$('.full').on('click', function() {
    if ($aevaDunkinDonuts) {
        $aevaDunkinDonuts.remove();
    }
    if ($aevaDunkinDonutsHint) {
        $aevaDunkinDonutsHint.remove();
    }
});

$('.aeva-button').on('click', function() {
    $aevaDunkinDonutsHint.appendTo('.full');
});