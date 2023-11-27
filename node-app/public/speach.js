var availableCommands = {
	standup: ['robot', 'stand', 'up'],    
	liedown: ['robot', 'lie', 'down'],
    liedown: ['robot', 'go', 'to', 'sleep'],
};



var commandsMatch = {}	;

var recognition = new webkitSpeechRecognition();


recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en";


recognition.onresult = function (event) {
    for (var i = event.resultIndex; i < event.results.length; ++i) {
    	console.log(event.results[i][0].transcript);

        if (event.results[i].isFinal) {
            console.log("final: ", event.results[i][0].transcript);
            //recognition.pause();
            analyzeAction(event.results[i][0].transcript);
        }
    }
};


/*
recognition.onend = function() {
	$('#voice_recognition_status').html('stopped');
    setTimeout(function() { recognition.start();$('#voice_recognition_status').html('listening ...'); } , 3000);    
};
*/

function initSpeach() {
	recognition.start(); 
	document.getElementById('voice_recognition_status').innerHTML = 'listening ...';
}



function analyzeAction(speach) {

	var machingResult = {};

	var words = speach.split(" ");


	Object.keys(availableCommands).forEach(function(key) {
		var _commands = availableCommands[key];
		words.forEach(function(word) {

			_commands.forEach(function(command) {
				if(command == word) {
					//console.log(key, _commands, command, word);
					if(machingResult[key])
						machingResult[key] ++;
					else
						machingResult[key] = 1;
				}
			});
		});

	});


	var keysSorted = Object.keys(machingResult).sort(function(a,b){return machingResult[b]-machingResult[a]})

	// find selected command
	var selectedCommand = '';
	var co = 0;
	keysSorted.forEach(function(key) {
		if(co == 0)
			selectedCommand = key;
		co ++;
	});


	// remove the digit to find the true command
	selectedCommand = selectedCommand.replace(/[\d]/g, '')
	

	triggerAction(selectedCommand);
}

function triggerAction(selectedCommand) {

	console.log(">>>> selected command:" + selectedCommand);	

	switch (selectedCommand) {
		case 'standup':
			upAll();
            execute();
			break;
		case 'liedown':
			centerAll();
            execute();
			break;			

		case 'lesslight':
			
			break;
		case 'morelight':
			
			break;

	}

}

function speakText(text) {
   var u = new SpeechSynthesisUtterance('You have reached your destination');
    speechSynthesis.speak(u);	
}

///////////////

//analyzeAction("turn the lights off please");
//analyzeAction("less light on");
