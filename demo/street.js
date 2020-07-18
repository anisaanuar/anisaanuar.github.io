var $street;
var $streetbox;


$('.stings').on('click', function() {
    $street = $(this).attr('id');
    switch ($street) {
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