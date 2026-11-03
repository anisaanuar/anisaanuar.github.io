function openImage(url) {
    window.open(url);
}

var $img;
var $igimage;
var $caption;
var $creator;


$('.sm-icon').on('click', function() {
    $url = $(this).attr('id') + '.html';
    window.location = $url;
});