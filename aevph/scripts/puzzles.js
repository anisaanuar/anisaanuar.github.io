/* CROSSWORD */
/* CREDIT TO https://codepen.io/dtted/pen/GRgmmVO */

var words = [
{ number: 1, direction: 'down', row: 1, column: 14, clue: 'His name is Barry Allen, and he&#8217;s the fastest man alive', answer: 'flash', hint: '' },
{ number: 2, direction: 'down', row: 2, column: 10, clue: 'Period', answer: 'era', hint: '' },
{ number: 3, direction: 'across', row: 3, column: 9, clue: 'Named similarly to a filter but is surprisingly unfiltered', answer: 'britta', hint: '' },
{ number: 4, direction: 'down', row: 3, column: 12, clue: 'Small laugh, also an outro', answer: 'teehee', hint: '' },
{ number: 5, direction: 'down', row: 6, column: 8, clue: '"Watch his stream on Twitch.tv/FikriAnuar"', answer: 'promo', hint: '' },
{ number: 5, direction: 'across', row: 6, column: 8, clue: 'The Shadow Queen&#8217;s princess', answer: 'peach', hint: '' },
{ number: 6, direction: 'down', row: 6, column: 15, clue: 'Iconic tea party setting', answer: 'boston', hint: '' },
{ number: 7, direction: 'across', row: 8, column: 7, clue: 'Period', answer: 'dot', hint: '' },
{ number: 8, direction: 'across', row: 8, column: 12, clue: 'Sponge cake ingredients', answer: 'eggs', hint: '' },
{ number: 9, direction: 'down', row: 9, column: 11, clue: 'It dies so that bread can live', answer: 'yeast', hint: '' },
{ number: 10, direction: 'down', row: 10, column: 6, clue: 'Mythical being with the catchphrase "Objection!"', answer: 'phoenix', hint: '' },
{ number: 10, direction: 'across', row: 10, column: 6, clue: 'Princess Consuela Banana-Hammock', answer: 'phoebe', hint: '' },
{ number: 11, direction: 'across', row: 11, column: 13, clue: 'A shameless gay Jesus', answer: 'ian', hint: '' },
{ number: 12, direction: 'down', row: 11, column: 17, clue: 'Stardew Valley godfather and uncle', answer: 'shane', hint: '' },
{ number: 13, direction: 'across', row: 12, column: 5, clue: 'Tom, Tommy, and Timmy', answer: 'nook', hint: '' },
{ number: 14, direction: 'across', row: 13, column: 11, clue: 'It&#8217;s "free! Free! Freefreefreefree&#8212;"', answer: 'turbotax', hint: '' },
{ number: 15, direction: 'across', row: 14, column: 1, clue: '(Spoiler alert) The instrument that causes the apocalypse', answer: 'violin', hint: '' },
{ number: 16, direction: 'across', row: 15, column: 14, clue: '"The _____ of Dunshire"', answer: 'cones', hint: '' },
{ number: 17, direction: 'down', row: 15, column: 15, clue: 'Adjective on many Whole Foods labels', answer: 'organic', hint: '' },
{ number: 18, direction: 'across', row: 17, column: 13, clue: 'A large handhold, or a large milk hold', answer: 'jug', hint: '' },
{ number: 19, direction: 'across', row: 19, column: 8, clue: 'Spiky fruit', answer: 'rambutan', hint: '' },
{ number: 20, direction: 'down', row: 19, column: 9, clue: 'Wows', answer: 'awes', hint: '' },
];

// Set global variables
var gridSize = [18, 22]; // number of squares wide, number of squares tall
var direction = 'across'; // set initial direction to 'across'
var markCorrect = true; // indicates ability for answers to be marked correct. will be set to false if "show answers" is clicked
var successShown = false; // indicates whether the success modal has been shown
var $clueTooltip = $('<div class="clue-tooltip invisible"><div class="clue-tooltip-arrow"></div><div class="clue-tooltip-text"></div></div>').appendTo('.crossword');

// set up the base grid
var $crosswordPuzzle = $('<div class="crossword-puzzle col-md-8 col-lg-9"></div>');
var $table = $('<table class="crossword-grid"></table>');
for (i = 0; i < gridSize[1]; i++) {
    var $row = $('<tr class="grid-row"></tr>');
    for (j = 0; j < gridSize[0]; j++) {
        $square = $('<td class="grid-square"></td>');
        $square.appendTo($row);
    }
    $row.appendTo($table);
    $table.appendTo($crosswordPuzzle);
    $crosswordPuzzle.appendTo('.crossword');
}

// Add the fields to the grid
for (i = 0; i < words.length; i++) {
    var row = words[i].row;
    var column = words[i].column;
    for (j = 0; j < words[i].answer.length; j++) {
        var $square = $('.grid-row').eq(row - 1).find('.grid-square').eq(column - 1);
        var title = words[i].clue + ', letter ' + (j + 1) + ' of ' + words[i].answer.length;
        var id = (words[i].direction == 'across' ? 'a' : 'd') + '-' + words[i].number + '-' + (j + 1);
        if (j == 0 && $square.find('.word-label').length == 0) {
            $('<span class="word-label">' + words[i].number + '</span>').appendTo($square);
        }
        if ($square.find('input').length == 0) {
            var $input = $('<input type="text" class="letter" title="' + title + '" id="' + id + '" maxlength="1" />');
            if (words[i].direction == 'across') {
                $input.attr('data-across', words[i].number);
                $input.attr('data-across-clue', words[i].clue);
            } else {
                $input.attr('data-down', words[i].number);
                $input.attr('data-down-clue', words[i].clue);
            }
            $input.data('letter', words[i].answer[j]);
            $input.appendTo($square);
            $square.addClass('active');
        } else {
            var $input = $square.find('input');
            $input.attr('title', $input.attr('title') + '; ' + title);
            $input.attr('id', $input.attr('id') + '+' + id);
            if (words[i].direction == 'across') {
                $input.attr('data-across', words[i].number);
                $input.attr('data-across-clue', words[i].clue);
            } else {
                $input.attr('data-down', words[i].number);
                $input.attr('data-down-clue', words[i].clue);
            }
        }
        if (words[i].direction == 'down') {
            row++;
        } else {
            column++;
        }
    }
}


/* MAIN */

function openPuzzle(puzzleLocation) {
    // opens specified puzzle
    window.location = puzzleLocation;
}

function goBack() {
    // takes user back to lobby
    window.open('./lobby.html', "_self");
}

var $pswd = document.getElementById("pswd");
var $submitButton = document.getElementById("submitButton");

if ($pswd) {
    // checks what the password is once user presses enter
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

function checkPswd(currentPuzzle) {
    // TODO: password check should be specific to current page
    var password = document.getElementById("pswd").value.toLowerCase().replace(/\s/g, '');
    switch (password) {
        case ('example'):
        window.location = "example.html";
        break;
        case ('aevph'):
        window.location = "welcome.html";
        break;
        case ('checkmysocials'):
        window.location = "socials.html";
        break;
        case ('colabt'):
        case ('gotocolabt'):
        window.location = "wordsearch.html";
        break;
        case ('taromilkgreentealessicewithpuddingandboba'):
        window.location = "cubbies.html";
        break;
        case ('#justice!'):
        let igNote = confirm("Nice job! So this means you read through every caption right? You're aware that Black lives matter and that wearing a mask is important, right? If so, then great. Let's move forward.");
        if (igNote) {
            window.location = "socials.html";
        }
        break;
        case ('instagram'):
        window.location = "instagram.html";
        break;
        case ('facebook'):
        window.location = "facebook.html";
        break;
        case ('snapchat'):
        window.location = "snapchat.html";
        break;
        case ('shrek'):
        case ('shrek2'):
        case ('shrek3'):
        case ('shrek4'):
        window.location = "inside.html";
        break;
        case ('59min'):
        case ('59'):
        case ('59minutes'):
        case ('fiftynine'):
        case ('fiftyninemin'):
        case ('fiftynineminutes'):
        window.location = "ddwifi.html";
        break;
        case ('youcompleteme'):
        case ('youmakemewhole'):
        case ('youmakemecomplete'):
        window.location = "whatsapp.html";
        break;
        case ('snell'):
        case ('snelllibrary'):
        let snellNote = confirm('Snell Library it is! Just so you know, if you move forward from this page, you will have to re-enter "checkmysocials" as a password to return to the social media pages.');
        if (snellNote) {
            window.location = "crossword.html";
        }
        break;
        case ('571364464'):
        window.location = "voicemessage.html";
        break;
        case ('dunkin'):
        case ('dunkindonuts'):
        window.location = "dunkinside.html";
        break;
        case ('park'):
        case ('parkst'):
        case ('parkstreet'):
        window.location = "signs.html";
        break;
        case ('down'):
        case ('godown'):
        window.location = "map.html";
        break;
        case ('west'):
        case ('westst'):
        case ('weststreet'):
        window.location = "street.html";
        break;
        case ('1582a'):
        window.location = "trivia.html";
        break;
        default:
        alert("Sorry, that doesn't seem to be a valid password.");
        break;
    }
}

/* FACEBOOK */

var $fbpw = document.getElementById("fbpw");
var $fbbutton = document.getElementById("fbButton");


if ($fbpw) {
    // checking to see if any value is passed (facebook doesn't have a set password)
    $fbpw.addEventListener("keypress", function(e) {
        var key = e.which || e.keyCode || 0;
        if (key === 13) {
            e.preventDefault();
            backToSocials();
        }
    });
}

if ($fbbutton) {
    $fbbutton.addEventListener("click", backToSocials);
}

function backToSocials() {
    // takes user back to the socials overview screen
    console.log('open');
    window.location = "socials.html";
}

function askForPass() {
    // if someone tries to open outro from puzzle overview, I ask for password so people can't skip trivia c:
    var person = prompt("What is the answer to the last question of the trivia puzzle?", "");
    if (person === '22') {
        window.location = "outro.html";
    } else {
        alert('Sorry, you need to complete the trivia puzzle in order to unlock this page.')
    }
} 

/* VIDEO */

var transcriptShown = false;

var $showTranscriptLink = $('<p id="transcript">Click here to view the transcript</p>').appendTo('.welcome-video');

var $transcriptContent = $("<div class='transcript-content'><br>oh hey! you made it! I was getting a little worried. so this year for my birthday i thought it would be fun to Celebrate witH a sort of homemadE puzzle hunt? basiCally i put together a bunch of my favorite puzzles, shows, games, random trivia, all that Kind of stuff into one big like mmmMmm... it's prettY much juSt like husky hunt if yOu're familiar with it, but, like, the Cheap, budget, made-by-one-person versIon. so yeAh. you've been invited to participate and aLl you've gotta do iS get to the end! i'll see you in the final spot! byeeee</div>");

$('#transcript').on('click', function() {
    // toggles whether or not the transcript is shown below the video
    if (!transcriptShown) {
        $showTranscriptLink.html('<p id="transcript">Click here to hide the transcript</p>');
        $transcriptContent.appendTo('.welcome-video');
        transcriptShown = true;
    } else {
        $showTranscriptLink.html('<p id="transcript">Click here to show the transcript</p>');
        $transcriptContent.remove();
        transcriptShown = false;
    }
});

/* SNAPCHAT */

var $pi1 = document.getElementById("pi1")
var $pi2 = document.getElementById("pi2")
var $pi3 = document.getElementById("pi3")

if ($pi1) {
    // pi being "packed item", checks what packed item is being submitted
    $pi1.addEventListener("keypress", function(e) {
        var key = e.which || e.keyCode || 0;
        if (key === 13) {
            e.preventDefault();
            checkPISubs();
        }
    });
}

if ($pi2) {
    // pi being "packed item", checks what packed item is being submitted
    $pi2.addEventListener("keypress", function(e) {
        var key = e.which || e.keyCode || 0;
        if (key === 13) {
            e.preventDefault();
            checkPISubs();
        }
    });
}

if ($pi3) {
    // pi being "packed item", checks what packed item is being submitted
    $pi3.addEventListener("keypress", function(e) {
        var key = e.which || e.keyCode || 0;
        if (key === 13) {
            e.preventDefault();
            checkPISubs();
        }
    });
}

var $packed = document.getElementById("checkPackedItems")

if ($packed) {
    $packed.addEventListener("click", checkPISubs);
}

var item1;
var item2;
var item3;

function checkPISubs() {
    // this function checks all the snapchat guesses
    // note to future self: include checkers that highlight correct answers (users often get confused on which of the three they have right so far)
    $item1 = document.getElementById("pi1").value.toLowerCase().replace(/\s/g, '');
    $item2 = document.getElementById("pi2").value.toLowerCase().replace(/\s/g, '');
    $item3 = document.getElementById("pi3").value.toLowerCase().replace(/\s/g, '');
    if ($item1 && $item2 && $item3) {
        if (($item1 === 'huskycard') && ($item2 === 'bobastraw') && ($item3 === 'climbingshoes')) {
            alert("You found them all! Her husky card, a boba straw, and climbing shoes. There aren't many places Anisa would go where she'd need her husky card... Where do you think she went? \n(Hint: beep boop books)");
        } else {
            alert('Sorry, at least one of the items you entered is incorrect.');
        }
    } else {
        alert('Please enter all the items!');
    }
}

/* FLOOR FINDER */

function checkFF() {
    // this function check each word in the floor finder puzzle
    let $ffword1 = document.getElementById("ffword1").value;
    let $ffword2 = document.getElementById("ffword2").value;
    let $ffword3 = document.getElementById("ffword3").value;
    let $ffword4 = document.getElementById("ffword4").value;
    let $ffword5 = document.getElementById("ffword5").value;
    let $ffword6 = document.getElementById("ffword6").value;
    let $ffword7 = document.getElementById("ffword7").value;
    let $ffword8 = document.getElementById("ffword8").value;
    let phrase = ($ffword1 + $ffword2 + $ffword3 + $ffword4 + $ffword5 + $ffword6 + $ffword7 + $ffword8).toLowerCase().replace(/\s/g, '');
    console.log(phrase);
    if (phrase === 'anisaisupsomewhereonthefifteenthfloor') {
        window.location = "maze.html";
    } else {
        alert("That doesn't seem to be the correct answer. Try again.");
    }
}
/* WHATSAPP */

var $whatsapp746 = $('<img class="wa-746" src="./assets/whatsapp/wa746.png"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 377 805"><defs></defs><rect class="wa-underlay" width="377" height="805" /><rect class="wa-message" x="43" y="752.62" width="242" height="26.75" rx="13.37" ry="13.37" /><foreignObject x="43" y="752.62" width="242" height="26.75"> <input placeholder="Message" id="wapp" class="box wa"></foreignObject></svg>').appendTo('.whatsapp');

var $whatsapp747 = $('<img class="wa-747" src="./assets/whatsapp/wa747.png"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 377 805"><defs><style></style></defs><rect class="wa-underlay" width="377" height="805"/><rect class="wa-message" x="17" y="609" width="212" height="128" rx="8.17" ry="8.17" onclick="openCodeNames()"/></svg>');

var $wapp = document.getElementById("wapp");

if ($wapp) {
    // this event listener checks to see if the enter key is pressed on whatsapp
    $wapp.addEventListener("keypress", function(e) {
        var key = e.which || e.keyCode || 0;
        if (key === 13) {
            e.preventDefault();
            checkWapp();
        }
    });
}

function checkWapp() {
    // this function checks if the whatsapp message sent is correct
    var password = document.getElementById("wapp").value.toLowerCase().replace(/\s/g, '');
    switch (password) {
        case ('hantarinvitesklilagi'):
        $whatsapp747.appendTo('.whatsapp');
        $whatsapp746.remove();
        break;
        default:
        alert("I don't think that's the message you should be sending.");
        break;
    }
}

/* CODENAMES */

function openCodeNames() {
    // this function opens the codenames image
    window.open('./assets/codenames.png');
    window.location = "mbta.html";
}