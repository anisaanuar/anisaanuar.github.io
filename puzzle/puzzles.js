function goBack() {
    window.history.back();
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
        case ('example'):
            window.location = "example.html";
            break;
        case ('intro'):
            window.location = "intro.html";
            break;
        case('check my socials'):
        case('checkmysocials'):
        	window.location = "jointhehunt.html";
        	break;
        case ('dash'):
            window.location = "teamname.html";
            break;
        case ('crossword'):
            window.location = "crossword.html";
            break;
        case ('wordsearch'):
            window.location = "wordsearch.html";
            break;
        case ('sudoku'):
            window.location = "sudoku.html";
            break;
        case ('cubbies'):
            window.location = "cubbies.html";
            break;
        default:
            alert("Not a valid password.");
            break;
    }
}