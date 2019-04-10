$(document).ready(function() {
	$('body').css('display', 'none');
	$('body').fadeIn(750);

	$('.link').click(function(event) {
		event.preventDefault();
		newLocation = this.href;
		$('body').fadeOut(250, newpage);
	});

	function newpage() {
		window.location = newLocation;
	}
});

function toggleMenu() {
  var x = document.getElementById("mobile-links");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

// GALLERY JS

// Open the Modal
function openGallery() {
  document.getElementById('photoGallery').style.display = "block";
}

// Close the Modal
function closeGallery() {
  document.getElementById('photoGallery').style.display = "none";
}

var slideIndex = 1;
showGallery(slideIndex);

// Next/previous controls
function plusBlock(n) {
  showGallery(slideIndex += n);
}

// Thumbnail image controls
function currentBlock(n) {
  showGallery(slideIndex = n);
}

function showGallery(n) {
  var i;
  var slides = document.getElementsByClassName("gallery-block");
  var dots = document.getElementsByClassName("gallery-photo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {
    slideIndex = 1
  } 
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}


function toggleDark(bool) {

  if (bool) {

    document.getElementsByTagName("body")[0].classList.add("dark");
    var all = document.body.getElementsByTagName("*");
    for (i = 0; i < all.length; i++) {
      all[i].classList.add("dark");
    }

    document.getElementsByClassName("light-toggle")[0].style.display = "none";
    document.getElementsByClassName("dark-toggle")[0].style.display = "block";

  } else {
    
    document.getElementsByTagName("body")[0].classList.remove("dark");
    var all = document.body.getElementsByTagName("*");
    for (i = 0; i < all.length; i++) {
      all[i].classList.remove("dark");
    }

    document.getElementsByClassName("light-toggle")[0].style.display = "block";
    document.getElementsByClassName("dark-toggle")[0].style.display = "none";

  }
}