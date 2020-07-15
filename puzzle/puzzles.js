/* CROSSWORD */

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
        case ('example'):
            window.location = "example.html";
            break;
        case ('aevph'):
            window.location = "welcome.html";
            break;
        case ('checkmysocials'):
            window.location = "socials.html";
            break;
        case ('cubbies'):
            window.location = "cubbies.html";
            break;
        case ('colabt'):
        case ('gotocolabt'):
            let phoneNote = confirm("You found Anisa's phone! But it's dead. Maybe you'll be able to recharge it along the way. In the meantime, the boba straw probably means Anisa went to KFT next. Let's head there now.");
            if (phoneNote) {
                window.location = "wordsearch.html";
            }
            break;
        case ('taromilkgreentealessicewithpuddingandboba'):
            let chargerNote = confirm("Nice order! You found a charger with a label on it that says 'Property of Anisa'... Wow, she really loses things easily doesn't she? Well, she's not here, so let's check the climbing gym next.");
            if (chargerNote) {
                window.location = "cubbies.html";
            }
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
            let shrekNote = confirm("You found Anisa's cubby - isn't it great? Anyway, there's nothing in it. BUT while figuring out which cubby was hers, you were able to charge her phone. Now to figure out her passcode...");
            if (shrekNote) {
                window.location = "sudoku.html";
            }
            break;
        case ('snelllibrary'):
            let snellNote = confirm('Snell Library it is! Just so you know, if you move forward from this page, you will have to re-enter "checkmysocials" as a password to return to the social media pages.');
            if (snellNote) {
                window.location = "crossword.html";
            }
            break;
        case ('571364464'):
            let passNote = confirm("Nicely done! Now let's see if we can find any clues in Anisa's phone.");
            if (passNote) {
                window.location = "voicemessage.html";
            }
            break;
        default:
            alert("Sorry, that doesn't seem to be a valid password.");
            break;
    }
}

var $fbpw = document.getElementById("fbpw");
var $fbbutton = document.getElementById("fbButton");


if ($fbpw) {
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
    console.log('open');
    window.location = "socials.html";
}

/* VIDEO */

var transcriptShown = false;

var $showTranscriptLink = $('<p id="transcript">Click here to view the transcript</p>').appendTo('.welcome-video');

var $transcriptContent = $("<div class='transcript-content'><br>oh hey! you made it! I was getting a little worried. so this year for my birthday i thought it would be fun to Celebrate witH a sort of homemadE puzzle hunt? basiCally i put together a bunch of my favorite puzzles, shows, games, random trivia, all that Kind of stuff into one big like mmmMmm... it's prettY much juSt like husky hunt if yOu're familiar with it, but, like, the Cheap, budget, made-by-one-person versIon. so yeAh. you've been invited to participate and aLl you've gotta do iS get to the end! i'll see you in the final spot! byeeee</div>");

$('#transcript').on('click', function() {
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

var $fbpw = document.getElementById("fbpw");
var $fbbutton = document.getElementById("fbButton");


if ($fbpw) {
    $fbpw.addEventListener("keypress", function(e) {
        var key = e.which || e.keyCode || 0;
        if (key === 13) {
            e.preventDefault();
            backToSocials();
        }
    });
}


var $pi1 = document.getElementById("pi1")
var $pi2 = document.getElementById("pi2")
var $pi3 = document.getElementById("pi3")

if ($pi1) {
    $pi1.addEventListener("keypress", function(e) {
        var key = e.which || e.keyCode || 0;
        if (key === 13) {
            e.preventDefault();
            checkPISubs();
        }
    });
}

if ($pi2) {
    $pi2.addEventListener("keypress", function(e) {
        var key = e.which || e.keyCode || 0;
        if (key === 13) {
            e.preventDefault();
            checkPISubs();
        }
    });
}

if ($pi3) {
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
    $item1 = document.getElementById("pi1").value.toLowerCase().replace(/\s/g, '');;
    $item2 = document.getElementById("pi2").value.toLowerCase().replace(/\s/g, '');;
    $item3 = document.getElementById("pi3").value.toLowerCase().replace(/\s/g, '');;
    if ($item1 && $item2 && $item3) {
        if (($item1 === 'husky card' || $item1 === 'huskycard') && ($item2 === 'boba straw' || $item2 === 'bobastraw') && ($item3 === 'climbing shoes' || $item3 === 'climbingshoes')) {
            alert("You found them all! Her husky card, a boba straw, and climbing shoes. There aren't many places Anisa would go where she'd need her husky card... Where do you think she went? \n(Hint: beep boop books)");
        } else {
            alert('Sorry, at least one of the items you entered is incorrect.');
        }
    } else {
        alert('Please enter all the items!');
    }
}

/* WHATSAPP */

var $whatsapp746 = $('<img class="wa-746" src="wa746.png"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 377 805"><defs></defs><rect class="wa-underlay" width="377" height="805" /><rect class="wa-message" x="43" y="752.62" width="242" height="26.75" rx="13.37" ry="13.37" /><foreignObject x="43" y="752.62" width="242" height="26.75"> <input placeholder="Message" id="wapp" class="box wa"></foreignObject></svg>').appendTo('.whatsapp');

var $whatsapp747 = $('<img class="wa-747" src="wa747.png"><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 377 805"><defs><style></style></defs><rect class="wa-underlay" width="377" height="805"/><rect class="wa-message" x="17" y="609" width="212" height="128" rx="8.17" ry="8.17" onclick="openCodeNames()"/></svg>');

var $wapp = document.getElementById("wapp");

if ($wapp) {
    $wapp.addEventListener("keypress", function(e) {
        var key = e.which || e.keyCode || 0;
        if (key === 13) {
            e.preventDefault();
            checkWapp();
        }
    });
}

function checkWapp() {
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

function openCodeNames() {
    let codenamesNote = confirm("Seems like you're getting close to wherever Anisa is. Now to use this 'invitation' to figure out where to go next...");
    if (codenamesNote) {
        window.open('./codenames.png');
        window.location = "cubbies.html";
    }
}