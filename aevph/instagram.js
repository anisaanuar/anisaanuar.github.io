function openImage(url) {
    window.open(url);
}

var $img;
var $igimage;
var $caption;
var $creator;


$('.ig-sq').on('click', function() {
    $img = $(this).attr('id');
    $caption = $(this).attr('caption');
    $creator = $(this).attr('creator');
    $igimage = $('<div class="full-screen"><div id="ig" class="ig-post"><img class="propic" src="./img/anisa.jpg"><p><strong> chocolatechipsmiles</strong></p> <img class="feature" src="./img/' + $img + '.jpg"><p><strong>chocolatechipsmiles</strong>&nbsp;' + $caption + '<br>Original post by <a href="https://instagram.com/' + $creator + '"" target="_blank">@' + $creator + '</a></p></div>');
    $igimage.appendTo('.full');
});

var $aevaIGHint = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>Try taking a look at the first character of each caption.</p></div><img src='aeva-help.png'></div></div>");

$('.full').on('click', function() {
    if ($igimage) {
        $igimage.remove();
    }
    if ($aevaIGHint) {
        $aevaIGHint.remove();
    }
});

$('.aeva-button').on('click', function() {
    $aevaIGHint.appendTo('.full');
});