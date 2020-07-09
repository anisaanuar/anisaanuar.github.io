function goBack() {
    window.open('./lobby.html',"_self");
}

document.getElementById("pswd").addEventListener("keypress", function(e) {
    var key = e.which || e.keyCode || 0;
    if (key === 13) {
        e.preventDefault();
        checkPswd();
    }
});

document.getElementById("submitButton").addEventListener("click", checkPswd);

function checkPswd() {
    var password = document.getElementById("pswd").value.toLowerCase();
    switch (password) {
        case ('aevph'):
            window.location = "welcome.html";
            break;
        case('check my socials'):
        case('checkmysocials'):
        	window.location = "jointhehunt.html";
        	break;
        default:
            alert("Not a valid password.");
            break;
    }
}