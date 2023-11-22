var availableCommands = {
	lightson: ['lights', 'on'],
	lightson2: ['turn', 'on', 'the', 'lights', 'light'],
	lightson3: ['lights', 'please'],


	lightsoff: ['lights', 'off'],
	lightsoff2:['turn', 'off', 'the', 'lights'],	
	lightsoff3:['shut', 'down', 'the', 'lights'],	

	lesslight: [ 'apply', 'less', 'light', 'lights'],	
	lesslight1: [ 'dim', 'lights', 'light', 'the'],	

	morelight: [ 'apply', 'more', 'light', 'lights'],

};



var commandsMatch = {}	;

var recognition = new webkitSpeechRecognition();

var hueController = new hue_controller();

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

$( document ).ready(function() {
	recognition.start(); 
	$('#voice_recognition_status').html('listening ...');
});


//////////////////////////////////

var hueController = new hue_controller();


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
		case 'lightson':
			hueController.allLightsToggle(true);
			break;
		case 'lightsoff':
			hueController.allLightsToggle(false	);
			break;			

		case 'lesslight':
			hueController.allLightsBri(100);
			break;
		case 'morelight':
			hueController.allLightsBri(200);
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
