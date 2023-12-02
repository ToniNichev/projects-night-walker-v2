function setCodeToDialerMove() {
  const textarea = document.getElementById('text-data');
  const c = getLineNumberAndColumnIndex(textarea);
  let commands = '';
  for(var i = 7; i != -1; i --) {
    const servoId = 7 - i;
    console.log(">####: ",servoId, dialers[7 - servoId].getVal());  
    commands += servoId + ',' + dialers[7 - servoId].getVal() + ',1';
    if(i != 0) {
      commands += ' ,';
    }
  }
  var textLines = textarea.value.substr(0, textarea.selectionStart).split("\n");
  textLines[c.lineNumber - 1] = commands;
  textarea.value = textLines.join("\n");
}


var options = {
    onChangeCallback: function (deviceId, requiredTemperature) {
      console.log("On change:", deviceId, requiredTemperature);
      const servoId = 7 - deviceId;
      const rotate = requiredTemperature;
      setCodeToDialerMove();

    },
    SliderId: 0,
    Min: -100,
    Max: 460,
    Step: 1 ,
    ShowPrecision: 2,
    SetRangeValue: function () {
      console.log("Set SetRangeValue");
    },
    setTempAndHumidity: null,
    onEditingMode: function () {
      console.log("EDITING !!!!!");
    }
  };

  var dialers = [];

  for(var i = 0; i < 8; i ++) {
    if(i % 2 === 1) {
      options.Min = -100;
      options.Max = 460;
    }
    else {
      options.Min = 280;
      options.Max = -280;      
    }

    options.SliderId  = i;
    dialers[i] = Dialer(options);
    //dialers[i].setValue(90);
  }

function getLineNumberAndColumnIndex(textarea){
    var textLines = textarea.value.substr(0, textarea.selectionStart).split("\n");
    var currentLineNumber = textLines.length;
    var currentColumnIndex = textLines[textLines.length-1].length;
    console.log("Current Line Number "+ currentLineNumber+" Current Column Index "+currentColumnIndex );
    return { lineNumber: currentLineNumber, columnIndex: currentColumnIndex};
 }

function readCurentLine() {
    const textarea = document.getElementById('text-data');
    const textAreaPos = getLineNumberAndColumnIndex(textarea); 
    const currentLine = textarea.value.split("\n")[textAreaPos.lineNumber - 1];
    //console.log(currentLine);  
    arrayToDialPosition(currentLine.split(","));  
}

function arrayToDialPosition(currentLine) {
  console.log(">>>>", currentLine[1])
  dialers[7].setValue(currentLine[1]);
}