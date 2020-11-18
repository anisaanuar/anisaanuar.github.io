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
  });

function toggleMenu() {
  var x = document.getElementById("menuLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}