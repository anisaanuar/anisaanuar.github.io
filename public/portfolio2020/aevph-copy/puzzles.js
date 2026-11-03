/* MAIN */

function goBack() {
    window.open('./lobby.html', "_self");
}

var $pswd = document.getElementById("pswd");
var $submitButton = document.getElementById("submitButton");

if ($pswd) {
    $pswd.addEventListener("keypress", function(e) {
        var key = e.which || e.keyCode || 0;
        if (key === 13) {
            e.preventDefault();
            checkPswd();
        }
    });
}

if ($submitButton) {
    $submitButton.addEventListener("click", checkPswd);
}

function checkPswd() {
    var password = document.getElementById("pswd").value.toLowerCase().replace(/\s/g, '');
    switch (password) {
        case ('aevph'):
            window.location = "welcome.html";
            break;
        case ('checkmysocials'):
            window.location = "jointhehunt.html";
            break;
        default:
            alert("Sorry, that doesn't seem to be a valid password.");
            break;
    }
}

