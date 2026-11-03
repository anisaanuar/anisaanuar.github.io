var transcriptShown = false;

var $showTranscriptLink = $('<p id="transcript">Click here to view the transcript</p>').appendTo('.message-container');

var $transcriptContent = $("<div class='transcript-content'><br>oh hey! you made it! I was getting a little worried. so this year for my birthday i thought it would be fun to Celebrate witH a sort of homemadE puzzle hunt? basiCally i put together a bunch of my favorite puzzles, shows, games, random trivia, all that Kind of stuff into one big like mmmMmm... it's prettY much juSt like husky hunt if yOu're familiar with it, but, like, the Cheap, budget, made-by-one-person versIon. so yeAh. you've been invited to participate and aLl you've gotta do iS get to the end! i'll see you in the final spot! byeeee</div>");

$('#transcript').on('click', function() {
    if (!transcriptShown) {
    	$showTranscriptLink.html('<p id="transcript">Click here to hide the transcript</p>');
        $transcriptContent.appendTo('.message-container');
        transcriptShown = true;
    } else {
    	$showTranscriptLink.html('<p id="transcript">Click here to show the transcript</p>');
    	$transcriptContent.remove();
    	transcriptShown = false;
    }
});