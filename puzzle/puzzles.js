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

// Add the clues to the page
var $crosswordClues = $('<div class="crossword-clues col-md-4 col-lg-3"><div class="row"></div></div>');
var $acrossClues = $('<div class="across-clues col-sm-6 col-md-12"><p><strong>Across</strong></p><ol></ol></div>');
var $downClues = $('<div class="down-clues col-sm-6 col-md-12"><p><strong>Down</strong></p><ol></ol></div>');
var $solution = $('<div class="solution col-sm-6 col-md-12"><a href="./aipvhniez.png" target="_blank"><p><strong>Nicely done. Click here to find out where to go next!</strong></p></a></div>')
for (i = 0; i < words.length; i++) {
    var $clue = $('<li value="' + words[i].number + '" data-direction="' + words[i].direction + '" data-clue="' + words[i].number + '"><label>' + words[i].clue + ' </label></li>');
    $clue.find('label').attr('for', $('[data-' + words[i].direction + '=' + words[i].number + ']').eq(0).attr('id'));
    $clue.on('click', function() {
        direction = $(this).data('direction');
    })
    if (words[i].hint.length > 0 && words[i].hint != '') {
        $('<a class="hint" href="' + words[i].hint + '" target="_blank" title="Hint for ' + words[i].number + ' ' + words[i].direction + '">(Hint)</a>').appendTo($clue.find('label'));
    }
    if (words[i].direction == 'across') {
        $clue.appendTo($acrossClues.find('ol'));
    } else {
        $clue.appendTo($downClues.find('ol'));
    }
}
$acrossClues.appendTo($crosswordClues.find('.row'));
$downClues.appendTo($crosswordClues.find('.row'));
$crosswordClues.appendTo('.crossword');

// Add the hints, reset, and show answers buttons
var $puzzleButtons = $('<div class="crossword-buttons"></div>');
var $hintsButton = $('<button class="btn btn-default">Show Hints</button>');
$hintsButton.on('click', function(e) {
    e.preventDefault();
    $('.crossword-clues').toggleClass('show-hints');
    $(this).text($(this).text() == 'Show Hints' ? 'Hide Hints' : 'Show Hints');
});
$hintsButton.appendTo($puzzleButtons);
var $resetButton = $('<button class="btn btn-default">Clear Puzzle</button>');
$resetButton.on('click', function(e) {
    e.preventDefault();
    $('input.letter').val('').parent('.grid-square').removeClass('correct-down correct-across');
    $('.crossword-clues li').removeClass('correct');
    markCorrect = true;
});
$resetButton.appendTo($puzzleButtons);
var $solveButton = $('<button class="show-answers btn btn-default">Show Answers</button>');
$solveButton.on('click', function(e) {
    e.preventDefault();
    $('input.letter').each(function() {
        $(this).val($(this).data('letter'));
    });
    markCorrect = false;
});
$solveButton.appendTo($puzzleButtons);
//$puzzleButtons.appendTo('.crossword');

// Add the success modal
// var $modal = $('<div class="modal fade invisible" id="success-modal" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">Congratulations!</h4></div><div class="modal-body"><p>You have finished the puzzle.</p></div></div></div></div>');
// $modal.appendTo('body');

// When a square is focused, highlight the other squares in that word and the clue, and show the tooltip
$('input.letter').on('focus', function() {
    var $current = $(this);
    $current.select();
    $current[0].setSelectionRange(0, 10);
    getDirection($current);
    $('[data-' + direction + '=' + $current.data(direction) + ']').parent('.grid-square').addClass('current-word');
    $('.crossword-clues li').removeClass('active');
    $('.crossword-clues li[data-direction=' + direction + '][data-clue=' + $(this).data(direction) + ']').addClass('active');
    // $clueTooltip.css({'left':tooltipPosition($current).left+'px','top':tooltipPosition($current).top-10+'px'}).removeClass('invisible').find('.clue-tooltip-arrow').css('left',tooltipPosition($current).offset+'px');
})

// When a square is blurred, remove highlight from squares and clue
$('input.letter').on('blur', function() {
    $('.grid-square').removeClass('current-word');
    $('.crossword-clues li').removeClass('active');
    $clueTooltip.addClass('invisible');
})

// handle directional and letter keys in letter inputs
$('input.letter').on('keyup', function(e) {
    var $current = $(this);
    if (e.which == 38) { // up arrow moves to square above if it exists
        direction = 'down';
        if (getPrevLetter($current)) {
            getPrevLetter($current).focus();
        }
    } else if (e.which == 40) { // down arrow moves to square below if it exists
        direction = 'down';
        if (getNextLetter($current)) {
            getNextLetter($current).focus();
        }
    } else if (e.which == 37) { // left arrow moves to square to the left if it exists
        direction = 'across';
        if (getPrevLetter($current)) {
            getPrevLetter($current).focus();
        }
    } else if (e.which == 39) { // right arrow moves to square to the right if it exists
        direction = 'across';
        if (getNextLetter($current)) {
            getNextLetter($current).focus();
        }
    } else {
        e.preventDefault();
    }
    if (markCorrect) {
        checkWord($current);
    };
})

// Tab and Shift/Tab move to next and previous words
$('input.letter').on('keydown', function(e) {
    var $current = $(this);
    if (e.which == 9) { // tab
        e.preventDefault();
        if (e.shiftKey) { // shift/tab
            getPrevWord($current).focus();
        } else {
            getNextWord($current).focus();
        }
    } else if (e.which == 8) { // backspace
        e.preventDefault();
        if ($(this).val().length > 0) {
            $(this).val('');
        } else {
            if (getPrevLetter($current)) {
                getPrevLetter($current).focus().val('');
            }
        }
    } else if ((e.which >= 48 && e.which <= 90) || (e.which >= 96 && e.which <= 111) || (e.which >= 186 && e.which <= 192) || (e.which >= 219 && e.which <= 222)) { // typeable characters move to the next square in the word if it exists
        e.preventDefault();
        $current.val(String.fromCharCode(e.which));
        if (getNextLetter($current)) {
            getNextLetter($current).focus();
        }
    }
    if (markCorrect) {
        checkWord($current);
    };
})

// Check if all letters in selected word are correct
function checkWord($current) {
    var correct;
    var currentWord;
    if ($current.is('[data-across]')) {
        correct = 0;
        currentWord = $current.data('across');
        $('[data-across=' + currentWord + ']').each(function() {
            if ($(this).val().toLowerCase() == $(this).data('letter').toLowerCase()) {
                correct += 1;
            }
        })
        if (correct == $('[data-across=' + currentWord + ']').length) {
            $('[data-across=' + currentWord + ']').parent('.grid-square').addClass('correct-across');
            $('.crossword-clues li[data-direction=across][data-clue=' + currentWord + ']').addClass('correct');
        } else {
            $('[data-across=' + currentWord + ']').parent('.grid-square').removeClass('correct-across');
            $('.crossword-clues li[data-direction=across][data-clue=' + currentWord + ']').removeClass('correct');
        }
    }
    if ($current.is('[data-down]')) {
        correct = 0;
        currentWord = $current.data('down');
        $('[data-down=' + currentWord + ']').each(function() {
            if ($(this).val().toLowerCase() == $(this).data('letter').toLowerCase()) {
                correct += 1;
            }
        })
        if (correct == $('[data-down=' + currentWord + ']').length) {
            $('[data-down=' + currentWord + ']').parent('.grid-square').addClass('correct-down');
            $('.crossword-clues li[data-direction=down][data-clue=' + currentWord + ']').addClass('correct');
        } else {
            $('[data-down=' + currentWord + ']').parent('.grid-square').removeClass('correct-down');
            $('.crossword-clues li[data-direction=down][data-clue=' + currentWord + ']').removeClass('correct');
        }
    }
    if ($('.grid-square.active:not([class*=correct])').length == 0 && !successShown) {
        $solution.appendTo($crosswordClues.find('.row'));
        // $('#success-modal').modal();
        successShown = true;
    }
}

// Return the input of the first letter of the next word in the clues list
function getNextWord($current) {
    var length = $('.crossword-clues li').length;
    var index = $('.crossword-clues li').index($('.crossword-clues li.active'));
    var nextWord;
    if (index < length - 1) {
        $nextWord = $('.crossword-clues li').eq(index + 1);
    } else {
        $nextWord = $('.crossword-clues li').eq(0);
    }
    direction = $nextWord.data('direction');
    return $('[data-' + $nextWord.data('direction') + '=' + $nextWord.data('clue') + ']').eq(0);
}

// Return the input of the first letter of the previous word in the clues list
function getPrevWord($current) {
    var length = $('.crossword-clues li').length;
    var index = $('.crossword-clues li').index($('.crossword-clues li.active'));
    var prevWord;
    if (index > 0) {
        $prevWord = $('.crossword-clues li').eq(index - 1);
    } else {
        $prevWord = $('.crossword-clues li').eq(length - 1);
    }
    direction = $prevWord.data('direction');
    return $('[data-' + $prevWord.data('direction') + '=' + $prevWord.data('clue') + ']').eq(0);
}

// If there is a letter square before or after the current letter in the current direction, keep global direction the same, otherwise switch global direction
function getDirection($current) {
    if (getPrevLetter($current) || getNextLetter($current)) {
        direction = direction;
    } else {
        direction = (direction == 'across') ? 'down' : 'across';
    }
}

// Return the input of the previous letter in the current word if it exists, otherwise return false
function getPrevLetter($current) {
    var index = $('[data-' + direction + '=' + $current.data(direction) + ']').index($current);
    if (index > 0) {
        return $('[data-' + direction + '=' + $current.data(direction) + ']').eq(index - 1);
    } else {
        return false;
    }
}

// Return the input of the next letter in the current word if it exists, otherwise return false
function getNextLetter($current) {
    var length = $('[data-' + direction + '=' + $current.data(direction) + ']').length;
    var index = $('[data-' + direction + '=' + $current.data(direction) + ']').index($current);
    if (index < length - 1) {
        return $('[data-' + direction + '=' + $current.data(direction) + ']').eq(index + 1);
    } else {
        return false;
    }
}

// Return the top, left, and offset positions for tooltip placement
function tooltipPosition($current) {
    var left = $('[data-' + direction + '=' + $current.data(direction) + ']').eq(0).offset().left - $('.crossword').offset().left;
    var top = $('[data-' + direction + '=' + $current.data(direction) + ']').eq(0).offset().top - $('.crossword').offset().top;
    $clueTooltip.find('.clue-tooltip-text').text($current.data(direction + '-clue'));
    var right = left + $clueTooltip.outerWidth();
    var offset = right - $('.crossword-puzzle').outerWidth();
    offset = offset > 0 ? offset : 0;
    left = left - offset;
    return { 'left': left, 'top': top, 'offset': offset };
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
    var password = document.getElementById("pswd").value.toLowerCase();
    switch (password) {
        case ('example'):
            window.location = "example.html";
            break;
        case ('aevph'):
            window.location = "welcome.html";
            break;
        case ('check my socials'):
        case ('checkmysocials'):
            window.location = "socials.html";
            break;
        case ('cubbies'):
            window.location = "cubbies.html";
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
            alert('nice');
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
        case ('pam'):
            let cont = confirm('Great! Just so you know, if you move forward from this page, you will have to re-enter "checkmysocials" as a password to return to the social media pages.');
            if (cont) {
                window.location = "sudoku.html";
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

/* WORD SEARCH */

function getRandomLetter() {
    let nextLetter;
    if (letNum < str.length) {
        nextLetter = str.charAt(letNum);
        console.log(nextLetter);
        letNum++;
        return nextLetter;
    }
    return letters[Math.floor(Math.random() * letters.length)];
}

function displayWord(w) {
    for (var j = 0; j < w.word.length; j++) {
        if (w.direction == "N") {
            $(".letters").find("." + w.end).text(w.word[j]);
            if (j + 1 != w.word.length) w.end -= 18;
        }
        if (w.direction == "NE") {
            $(".letters").find("." + w.end).text(w.word[j]);
            if (j + 1 != w.word.length) w.end -= 17;
        }
        if (w.direction == "E") {
            $(".letters").find("." + w.end).text(w.word[j]);
            if (j + 1 != w.word.length) w.end += 1;
        }
        if (w.direction == "SE") {
            $(".letters").find("." + w.end).text(w.word[j]);
            if (j + 1 != w.word.length) w.end += 19;
        }
        if (w.direction == "S") {
            $(".letters").find("." + w.end).text(w.word[j]);
            if (j + 1 != w.word.length) w.end += 18;
        }
        if (w.direction == "SW") {
            $(".letters").find("." + w.end).text(w.word[j]);
            if (j + 1 != w.word.length) w.end += 17;
        }
        if (w.direction == "W") {
            $(".letters").find("." + w.end).text(w.word[j]);
            if (j + 1 != w.word.length) w.end -= 1;
        }
        if (w.direction == "NW") {
            $(".letters").find("." + w.end).text(w.word[j]);
            if (j + 1 != w.word.length) w.end -= 19;
        }
    }
}

// This function is called when lines need to be drawn on the game
function draw(f) {
    // used to draw an arc.  takes in two numbers that represent the beginning
    // and end of the arc
    function drawArc(xArc, yArc, num1, num2) {
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(xArc, yArc, r, num1 * Math.PI, num2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = strokeColor;
        ctx.fill();
    }

    // used to draw the two lines around letters
    function drawLines(mX1, mY1, lX1, lY1, mX2, mY2, lX2, lY2) {
        ctx.beginPath();
        // ctx.moveTo(mX1, mY1);
        // ctx.lineTo(lX1, lY2);
        // ctx.lineTo(lX2, lY1);
        // ctx.lineTo(lX2, lY2);
        ctx.moveTo(mX1, mY1);
        ctx.lineTo(lX1, lY1);
        ctx.lineTo(lX2, lY2);
        ctx.lineTo(mX2, mY2);
        ctx.closePath();
        ctx.fillStyle = strokeColor;
        ctx.fill();
    }
    // Check and see what event occured and create the action that belongs to that 
    // event.
    if (f == "mousedown") {
        ctx.clearRect(0, 0, width, height);
        drawArc(sX, sY, 0, 2);
    } else if (f == "mousemove" || f == "mouseup") {
        /* 
        This is to show the rise over run I used to get the limits for 
        all eight directions.  This tells the conditionals when to activiate
        the lines and in which direction.
        rise = (sY - eY) * Math.sqrt(6);
        run = sX - eX;
        */
        limit = ((sY - eY) * Math.sqrt(6)) / (sX - eX);
        // UP
        if ((limit > 6 || limit < -6) && eY < sY) {
            // clear the canvas
            if (f == "mousemove") ctx.clearRect(0, 0, width, height);
            drawArc(sX, sY, 0, 1); // draw bottom arc
            drawArc(sX, eY, 1, 2); // draw top arc

            // draw the two lines that connect the bottom and the top arcs
            drawLines(sX + r, sY, sX + r, eY, sX - r, sY, sX - r, eY);

            // if the player is selecting this as the last letter set its position 
            // for wordcheck
            if (f == "mouseup") setPos(sX, eY, "end");
        }
        // DOWN
        if ((limit < -6 || limit > 6) && eY > sY) {
            // clear the canvas
            if (f == "mousemove") ctx.clearRect(0, 0, width, height);
            drawArc(sX, sY, 1, 2);
            drawArc(sX, eY, 0, 1);
            drawLines(sX + r, sY, sX + r, eY, sX - r, sY, sX - r, eY);
            if (f == "mouseup") setPos(sX, eY, "end");
        }
        // LEFT
        if ((limit < 1 && limit > -1) && eX < sX) {
            if (f == "mousemove") ctx.clearRect(0, 0, width, height);
            drawArc(sX, sY, 1.5, 0.5);
            drawArc(eX, sY, 0.5, 1.5);
            drawLines(sX, sY - r, eX, sY - r, sX, sY + r, eX, sY + r);
            if (f == "mouseup") setPos(eX, sY, "end");
        }
        // RIGHT
        if ((limit < 1 && limit > -1) && eX > sX) {
            if (f == "mousemove") ctx.clearRect(0, 0, width, height);
            drawArc(sX, sY, 0.5, 1.5);
            drawArc(eX, sY, 1.5, 0.5);
            drawLines(sX, sY - r, eX, sY - r, sX, sY + r, eX, sY + r);
            if (f == "mouseup") setPos(eX, sY, "end");
        }
        /* 
        This is for the NW diagonal lines it requires a special number 
        n that is the adjacent lengths of a 45-45-90 triangle needed to draw these
        lines.  It also creates a diff for the difference between the 
        start and the end of the arcs 
        */
        // NW
        if ((limit > 1 && limit < 6) && (eX < sX && eY < sY)) {
            if (f == "mousemove") ctx.clearRect(0, 0, width, height);
            diff = sX - eX;
            drawArc(sX, sY, 1.75, 0.75);
            drawArc(sX - diff, sY - diff, 0.75, 1.75);
            drawLines(sX + n, sY - n, sX + n - diff, sY - n - diff,
                sX - n, sY + n, sX - n - diff, sY + n - diff);
            if (f == "mouseup") setPos(sX - diff, sY - diff, "end");
        }

        // NE
        if ((limit < -1 && limit > -6) && (eX > sX && eY < sY)) {
            if (f == "mousemove") ctx.clearRect(0, 0, width, height);
            diff = sX - eX;
            drawArc(sX, sY, 0.25, 1.25);
            drawArc(sX - diff, sY + diff, 1.25, 0.25);
            drawLines(sX + n, sY + n, sX + n - diff, sY + n + diff,
                sX - n, sY - n, sX - n - diff, sY - n + diff);
            if (f == "mouseup") setPos(sX - diff, sY + diff, "end");
        }
        // SW
        if ((limit < -1 && limit > -6) && (eX < sX && eY > sY)) {
            if (f == "mousemove") ctx.clearRect(0, 0, width, height);
            diff = sX - eX;
            drawArc(sX, sY, 1.25, 0.25);
            drawArc(sX - diff, sY + diff, 0.25, 1.25);
            drawLines(sX + n, sY + n, sX + n - diff, sY + n + diff,
                sX - n, sY - n, sX - n - diff, sY - n + diff);
            if (f == "mouseup") setPos(sX - diff, sY + diff, "end");
        }
        // SE
        if ((limit > 1 && limit < 6) && (eX > sX && eY > sY)) {
            if (f == "mousemove") ctx.clearRect(0, 0, width, height);
            diff = sX - eX;
            drawArc(sX, sY, 0.75, 1.75);
            drawArc(sX - diff, sY - diff, 1.75, 0.75);
            drawLines(sX + n, sY - n, sX + n - diff, sY - n - diff,
                sX - n, sY + n, sX - n - diff, sY + n - diff);
            if (f == "mouseup") setPos(sX - diff, sY - diff, "end");
        }
    } else if (f == "mouseleave") {
        setCanvas("c");
        ctx.clearRect(0, 0, width, height);
    }
}


// change the canvas between the bottom and top layer
function setCanvas(id) {
    canvas = document.getElementById(id);
    ctx = canvas.getContext("2d");
    width = canvas.width;
    height = canvas.height;
}


// set the offsets to numbers that match the class names of each letter
function setPos(x, y, loc) {
    tX = Math.floor((x / 8) / 5) + 1;
    tY = Math.floor((y / 8) / 5) + 1;
    if (loc == "start") click.startPos = (tY - 1) * 18 + tX;
    else click.endPos = (tY - 1) * 18 + tX;
}


// verify if the word chosen is the correct one. If a player decides
// to highlight a word starting from last letter to first this function
// will also support that ability
function checkWord() {
    // clears the pos array so that a player cannot highlight the same word twice
    function clearPos(p) {
        p.start = p.end = 0;
        return true;
    }
    // user highlights from first letter to last
    if (pos.some(function(o) {
            return o.start === click.startPos &&
                o.end === click.endPos && clearPos(o);
        })) {
        return true;
    }
    // if user highlights from last letter to first
    else if (pos.some(function(o) {
            return o.start === click.endPos &&
                o.end === click.startPos && clearPos(o);
        })) {
        return true;
    } else return false;
}

// scratch the word on the right out when the word is found on the left
function scratchWord() {
    for (var i = 0; i < words.length; i++) {
        if ((click.startPos === words[i].start && click.endPos === words[i].end) ||
            (click.startPos === words[i].end && click.endPos === words[i].start)) {
            // little hack here
            $(".words").find("." + i).addClass("strike");
        }
    }
    // check if the game is over

}

function isEndOfGame() {
    return pos.every(function(o) { return o.start === 0 && o.end === 0; });
}

/* SNAPCHAT */

document.getElementById("pi1").addEventListener("keypress", function(e) {
    var key = e.which || e.keyCode || 0;
    if (key === 13) {
        e.preventDefault();
        checkPISubs();
    }
});

document.getElementById("pi2").addEventListener("keypress", function(e) {
    var key = e.which || e.keyCode || 0;
    if (key === 13) {
        e.preventDefault();
        checkPISubs();
    }
});

document.getElementById("pi3").addEventListener("keypress", function(e) {
    var key = e.which || e.keyCode || 0;
    if (key === 13) {
        e.preventDefault();
        checkPISubs();
    }
});

document.getElementById("checkPackedItems").addEventListener("click", checkPISubs);

var item1;
var item2;
var item3;

function checkPISubs() {
    console.log('got');
    $item1 = document.getElementById("pi1").value.toLowerCase();
    $item2 = document.getElementById("pi2").value.toLowerCase();
    $item3 = document.getElementById("pi3").value.toLowerCase();
    if ($item1 && $item2 && $item3) {
        if (($item1 === 'husky card' || $item1 === 'huskycard') && ($item2 === 'boba straw' || $item2 === 'bobastraw') && ($item3 === 'climbing shoes' || $item3 === 'climbingshoes')) {
            alert('Nice job! The code is pam');
        } else {
            alert('Sorry, at least one of the items you entered is incorrect.');
        }
    } else {
        alert('Please enter all the items!');
    }
}