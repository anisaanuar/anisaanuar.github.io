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
            let donutNote = confirm("An outlet! You can charge Anisa's phone now. Let's see what we can find.");
            if (donutNote) {
                window.location = "sudoku.html";
            }
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