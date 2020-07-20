var $aevaTrivia = $("<div class='aeva-full'><div class='aeva-message'><div class='aeva-message-text'><p>You get to Room 1582A. There's a tablet on the door that reads, \"Authorization needed: To unlock this door, answer the following questions in under two minutes and twenty two seconds.\"</p><p>Good luck!</p></div><img src='aeva-smile.png'></div></div>");

var $aevaTriviaHint = $('<div class="aeva-full"><div class="aeva-message"><div class="aeva-message-text"><p>What are you doing?? You\'re wasting time!</p></div><img src="aeva-help.png"></div></div>');

$(document).ready(function() {
    $aevaTrivia.appendTo('.full');
});

$('.full').on('click', function() {
    if ($aevaTrivia) {
        $aevaTrivia.remove();
        startTimer();
    }
    if ($aevaTriviaHint) {
        $aevaTriviaHint.remove();
    }
});

$('.aeva-button').on('click', function() {
    $aevaTriviaHint.appendTo('.full');
});


var $pswd = document.getElementById("trivia");
var $submitButton = document.getElementById("submitButton");

if ($pswd) {
    $pswd.addEventListener("keypress", function(e) {
        var key = e.which || e.keyCode || 0;
        if (key === 13) {
            e.preventDefault();
            checkTrivia();
        }
    });
}

if ($submitButton) {
    $submitButton.addEventListener("click", checkTrivia);
}

function checkTrivia() {
    password = $pswd.value.toLowerCase().replace(/\s/g, '');
    var $question = document.getElementById("question");
    if ($pswd.id === 'trivia') {
        if (password.includes('anisa')) {
            $question.innerHTML = "2. What does the 'e' in aevph stand for?";
            $pswd.id = 'trivia2';
            $pswd.value = '';
            $pswd = document.getElementById("trivia2");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia2') {
        if (password === 'extraordinary') {
            $question.innerHTML = "3. What kind of donut did Anisa buy from Dunkin Donuts?";
            $pswd.id = 'trivia3';
            $pswd.value = '';
            $pswd = document.getElementById("trivia3");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia3') {
        if (password.includes('strawberry')) {
            $question.innerHTML = "4. What is the Flash's real name?";
            $pswd.id = 'trivia4';
            $pswd.value = '';
            $pswd = document.getElementById("trivia4");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia4') {
        if (password === 'barryallen') {
            $question.innerHTML = "5. What is Anisa's boba order?";
            $pswd.id = 'trivia5';
            $pswd.value = '';
            $pswd = document.getElementById("trivia5");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia5') {
        if (password === 'taromilkgreentealessicewithpuddingandboba') {
            $question.innerHTML = "6. What was the message Anisa was sending with her Instagram captions?";
            $pswd.id = 'trivia6';
            $pswd.value = '';
            $pswd = document.getElementById("trivia6");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia6') {
        if (password === '#justice!') {
            $question.innerHTML = "7. What's the name of the Animal Crossing villager Anisa found and posted on Snapchat?";
            $pswd.id = 'trivia7';
            $pswd.value = '';
            $pswd = document.getElementById("trivia7");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia7') {
        if (password === 'robin') {
            $question.innerHTML = "8. What's the name of the cute lil personal assistant that's been helping you throughout this game?";
            $pswd.id = 'trivia8';
            $pswd.value = '';
            $pswd = document.getElementById("trivia8");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia8') {
        if (password === 'aeva') {
            $question.innerHTML = "9. Which colab did Anisa go to in Snell?";
            $pswd.id = 'trivia9';
            $pswd.value = '';
            $pswd = document.getElementById("trivia9");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia9') {
        if (password === 'colabt' || password === 't') {
            $question.innerHTML = "10. What song is \"In a World of my Own\" from?";
            $pswd.id = 'trivia10';
            $pswd.value = '';
            $pswd = document.getElementById("trivia10");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia10') {
        if (password === 'aliceinwonderland') {
            $question.innerHTML = "11. Who is the person Anisa was texting in WhatsApp?";
            $pswd.id = 'trivia11';
            $pswd.value = '';
            $pswd = document.getElementById("trivia11");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia11') {
        if (password === 'kakak' || password === 'amira' || password === 'sister' || password === 'hersister') {
            $question.innerHTML = "12. What time did Anisa have to push her meetup back to?";
            $pswd.id = 'trivia12';
            $pswd.value = '';
            $pswd = document.getElementById("trivia12");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia12') {
        if (password === '8:30' || password === '830') {
            $question.innerHTML = "13. Which planet should you follow to go left from Park Street?";
            $pswd.id = 'trivia13';
            $pswd.value = '';
            $pswd = document.getElementById("trivia13");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia13') {
        if (password === 'earth') {
            $question.innerHTML = "14. What baked good was Anisa planning to make with all the ingredients she purchased?";
            $pswd.id = 'trivia14';
            $pswd.value = '';
            $pswd = document.getElementById("trivia14");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia14') {
        if (password === 'cinnamonrolls') {
            $question.innerHTML = "15. What is the full address of the place Anisa is in? -- You're in here too. (Just street number and name.)";
            $pswd.id = 'trivia15';
            $pswd.value = '';
            $pswd = document.getElementById("trivia15");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia15') {
        if (password === '215westst' || password === '215weststreet') {
            $question.innerHTML = "16. Which boba place did Anisa go to?";
            $pswd.id = 'trivia16';
            $pswd.value = '';
            $pswd = document.getElementById("trivia16");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia16') {
        if (password === 'kft' || password === 'kungfutea') {
            $question.innerHTML = "17. CODENAMES: 1, Australia.";
            $pswd.id = 'trivia17';
            $pswd.value = '';
            $pswd = document.getElementById("trivia17");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia17') {
        if (password === 'kangaroo') {
            $question.innerHTML = "18. Which Shrek side character (non-main character) wished Anisa a happy birthday?";
            $pswd.id = 'trivia18';
            $pswd.value = '';
            $pswd = document.getElementById("trivia18");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia18') {
        if (password === 'pinocchio') {
            $question.innerHTML = "19a. Where did Anisa go first after packing all her stuff?";
            $pswd.id = 'trivia19a';
            $pswd.value = '';
            $pswd = document.getElementById("trivia19a");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia19a') {
        if (password.includes('snell')) {
            $question.innerHTML = "19b. Where did Anisa go after leaving Snell Library?";
            $pswd.id = 'trivia19b';
            $pswd.value = '';
            $pswd = document.getElementById("trivia19b");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia19b') {
        if (password.includes('dunkin')) {
            $question.innerHTML = "19c. Where did Anisa go after she went to Dunkin Donuts?";
            $pswd.id = 'trivia19c';
            $pswd.value = '';
            $pswd = document.getElementById("trivia19c");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia19c') {
        if (password.includes('climbing')) {
            $question.innerHTML = "19d. Where did Anisa go after she finished climbing?";
            $pswd.id = 'trivia19d';
            $pswd.value = '';
            $pswd = document.getElementById("trivia19d");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia19d') {
        if (password === 'kft' || password === 'kungfutea') {
            $question.innerHTML = "20. What image or icon represented the Northeastern T stop?";
            $pswd.id = 'trivia20';
            $pswd.value = '';
            $pswd = document.getElementById("trivia20");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia20') {
        if (password === 'button' || password === 'abutton') {
            $question.innerHTML = "21. What was the first password needed to unlock the puzzle hunt?";
            $pswd.id = 'trivia21';
            $pswd.value = '';
            $pswd = document.getElementById("trivia21");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'trivia21') {
        if (password === 'aevph') {
            $question.innerHTML = "22. How old did Anisa turn on July 18, 2020?";
            $pswd.id = 'triviaFinal';
            $pswd.value = '';
            $pswd = document.getElementById("triviaFinal");
        } else {
            alert('Wrong.')
        }
    } else if ($pswd.id === 'triviaFinal') {
        if (password === '22') {
            window.location = "outro.html";
        } else {
            alert('Wrong.')
        }
    }
}

// Credit: Mateusz Rybczonec

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
};

const TIME_LIMIT = 142;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

function onTimesUp() {
    clearInterval(timerInterval);
    location.reload();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(
            timeLeft
        );
        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
            onTimesUp();
        }
    }, 1000);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
    }
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}