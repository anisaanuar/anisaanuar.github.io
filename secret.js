function toggleMenu() {

  var icon = document.getElementsByClassName("icon")[0];
  var ul = document.getElementsByTagName("ul")[0];
  var nav = document.getElementsByTagName("nav")[0];
  if (icon.style.right === "0px") {
  	icon.style.right = "300px";
  } else {
  	icon.style.right = "0px";
  }
  if (ul.style.right === "-300px") {
  	ul.style.right = "0px";
  } else {
  	ul.style.right = "-300px";
  }
  if (nav.style.right === "-300px") {
  	nav.style.right = "0px";
  } else {
  	nav.style.right = "-300px";
  }
}