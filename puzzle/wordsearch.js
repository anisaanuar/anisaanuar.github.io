var pos = [];
var click = {
    "startPos": "",
    "endPos": ""
};
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];
var str = "TAROMILKGREENTEALESSICEWITHPUDDINGANDBOBA";
var letNum = 0;

var words = [{ "word": "ALMOND", "direction": "SE", "start": 24 },
    { "word": "ALOE", "direction": "SE", "start": 19 },
    { "word": "BLACKTEA", "direction": "S", "start": 14 },
    { "word": "BROWNSUGAR", "direction": "NW", "start": 266 },
    { "word": "BUBBLES", "direction": "NW", "start": 118 },
    { "word": "CHAI", "direction": "SE", "start": 3 },
    { "word": "COCONUT", "direction": "N", "start": 197 },
    { "word": "COFFEE", "direction": "W", "start": 151 },
    { "word": "FIGJELLY", "direction": "NW", "start": 135 },
    { "word": "GINGER", "direction": "E", "start": 271 },
    { "word": "GRAPEFRUIT", "direction": "S", "start": 16 },
    { "word": "GRASSJELLY", "direction": "E", "start": 168 },
    { "word": "GREENTEA", "direction": "E", "start": 217 },
    { "word": "HONEY", "direction": "S", "start": 216 },
    { "word": "HOT", "direction": "SE", "start": 37 },
    { "word": "ICED", "direction": "E", "start": 127 },
    { "word": "LARGE", "direction": "W", "start": 11 },
    { "word": "LEMONADE", "direction": "SW", "start": 28 },
    { "word": "LYCHEE", "direction": "N", "start": 305 },
    { "word": "MANGO", "direction": "SE", "start": 74 },
    { "word": "MATCHA", "direction": "E", "start": 312 },
    { "word": "MEDIUM", "direction": "NW", "start": 320 },
    { "word": "MILKCAP", "direction": "E", "start": 253 },
    { "word": "NATADECOCO", "direction": "N", "start": 180 },
    { "word": "OOLONG", "direction": "NE", "start": 311 },
    { "word": "ORANGE", "direction": "W", "start": 294 },
    { "word": "OREO", "direction": "NW", "start": 284 },
    { "word": "PASSIONFRUIT", "direction": "NW", "start": 210 },
    { "word": "PEACH", "direction": "S", "start": 13 },
    { "word": "PEARLS", "direction": "N", "start": 105 },
    { "word": "PINEAPPLE", "direction": "W", "start": 189 },
    { "word": "REDBEAN", "direction": "SE", "start": 98 },
    { "word": "ROSEHIP", "direction": "S", "start": 213 },
    { "word": "SESAME", "direction": "W", "start": 302 },
    { "word": "SMALL", "direction": "W", "start": 167 },
    { "word": "STRAW", "direction": "NW", "start": 103 },
    { "word": "STRAWBERRY", "direction": "SE", "start": 6 },
    { "word": "SUNSHINE", "direction": "E", "start": 235 },
    { "word": "SWEETNESS", "direction": "N", "start": 156 },
    { "word": "TAPIOCA", "direction": "E", "start": 192 },
    { "word": "THAI", "direction": "S", "start": 17 },
    { "word": "WINTERMELON", "direction": "W", "start": 209 },
    { "word": "WOW", "direction": "NE", "start": 295 },
    { "word": "YAKULT", "direction": "S", "start": 232 },
];

// Prepare the wordsearch with random letters and word layout
$(document).ready(function() {
    // grab the size of the grid.  I used this method in case I need to 
    // scale this word search in the future
    var size = 324; //($(".left").css("width").slice(0, 3) - 20) / 2 ;

    // put random letters on the board
    for (var i = 0; i < size; i++) {
        $(".letters").append("<span class='" + (i + 1) + "'>" +
            "0" + "</span>");
    }

    // insert the words onto the board
    for (var i = 0; i < words.length; i++) {
        words[i].end = words[i].start;
        displayWord(words[i]);
        // save the start and end of each word for word checking later
        pos[i] = { "start": words[i].start, "end": words[i].end };
        $(".words").append("<span class='" + (i) + "'>" +
            words[i].word + "</span>");
    }

    $(".letters span").each(function() {
        if ($(this).text() === "0") {
            $(this).text(getRandomLetter());
        }
    });

    $("#menu").on("mouseup", function() {
        $(this).css({ "display": "none" })
        $("#main").slideDown("slow", function() {})
    });
})


// start of x & y, end of x & y.  
var sX, sY, eX, eY, canvas, ctx, height, width, diff;
var r = 14;
var n = Math.sqrt((r * r) / 2);
var strokeColor = "rgba(171, 139, 99, 0.5)";
var isMouseDown = false;
var mouseMoved = false;

$(document).ready(function() {
    $("#c").on("mousedown mouseup mousemove mouseleave", function(e) {
        e.preventDefault();
        //console.log(e);
        if (e.type == "mousedown") {
            setCanvas("c");
            isMouseDown = true;

            // Used for Firefox
            sX = e.offsetX || e.clientX - $(e.target).offset().left;
            sY = e.offsetY || e.clientY - $(e.target).offset().top;
            // adjust the center of the arc 
            sX -= (sX % 20);
            sY -= (sY % 20);
            if (!(sX % 40)) sX += 20;
            if (!(sY % 40)) sY += 20;

            setPos(sX, sY, "start");
            draw(e.type);
        } else if (e.type == "mousemove") {
            if (isMouseDown) {
                mouseMoved = true;
                eX = e.offsetX || e.clientX - $(e.target).offset().left;
                eY = e.offsetY || e.clientY - $(e.target).offset().top;
                draw(e.type);
            }
        } else if (e.type == "mouseup") {
            isMouseDown = false;
            ctx.clearRect(0, 0, width, height);
            if (mouseMoved) {
                mouseMoved = false;

                eX -= eX % 20;
                eY -= eY % 20;
                if (!(eX % 40)) eX += 20;
                if (!(eY % 40)) eY += 20;

                // draw the last line and clear the canvas to check and see if its the 
                // correct word
                draw(e.type);
                ctx.clearRect(0, 0, width, height);
                // if a correct word has been highlighted change the canvas to 
                // the permanent one and redraw the arcs and lines.  Then scratch the 
                // word on the right.
                if (checkWord()) {
                    setCanvas("a");
                    draw(e.type);
                    scratchWord();
                    // Check if the game is over
                    if (isEndOfGame()) {
                        alert("Good job!");
                    }
                }

            }
        } else if (e.type == "mouseleave") {
            isMouseDown = false;
            draw(e.type);
        }

    });
})