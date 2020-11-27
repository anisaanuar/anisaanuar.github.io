var menu = [{
  label: 'home',
  link: 'index.html'
},
{
  label: 'about',
  link: 'about.html'
},
{
  label: 'resume',
  link: 'resume.html'
},
{
  label: 'contact',
  link: 'contact.html'
}
];

var $header = $('<div class="row no-gutters header"> <div class="header-container"> <a class="col-4 col-lg-2 col-xl-1 logo" href="index.html"></a> <div class="col-8 col-lg-10 col-xl-11"> <div class="menu desktop"> </div> <div class="menu mobile"> <a href="javascript:void(0);" class="icon" onclick="toggleMenu()"> <i class="fa fa-bars"></i> </a> </div> </div> </div> </div> <div id="menuLinks"> <a href="index.html">HOME</a> <a href="about.html">ABOUT</a> <a href="resume.html">RESUME</a> <a href="contact.html">CONTACT</a>');

$(document).ready(function() {
  $('.anim1').delay(0).fadeIn(1200);
  $('.anim2').delay(1200).fadeIn(1200);
  $('.anim3').delay(2400).fadeIn(1200);
  $('.anim4').delay(2800).fadeIn(1200);
  $('.anim5').delay(3200).fadeIn(1200);
  $('.anim6').delay(3600).fadeIn(1200);
  $('.anim7').delay(4000).fadeIn(1200);
  $('.anim8').delay(4400).fadeIn(1200);
  $('.anim9').delay(4800).fadeIn(1200);
  $('.anim10').delay(5200).fadeIn(1200);
  $('.anim11').delay(5600).fadeIn(1200);
  $('.anim12').delay(6000).fadeIn(1200);
  $('.anim13').delay(6400).fadeIn(1200);

    // $('.link').click(function(event) {
    //   event.preventDefault();
    //   newLocation = this.href;
    //   $('body').fadeOut(250, newpage);
    // });

    $header.appendTo('.container-fluid');

    for (i = 0; i < menu.length; i++) {
      var menuItem = $('<a href="' + menu[i].link + '">' + menu[i].label + '</a>');
      menuItem.appendTo('.menu.desktop');
    }

    var url = window.location.href; 
    var desktop = $('.menu a').filter(function() {
      return this.href == url }).addClass('active');
    var mobile = $('#menuLinks a').filter(function() {
      return this.href == url }).addClass('active');
 });

function toggleMenu() {
  var x = document.getElementById("menuLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function goToPage(page) {
    window.location = page;
}