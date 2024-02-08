


function sendData(data) {
    data = data.split(' ').join('');
    var url = 'http://localhost:8080/send-data?data=' + data;
    console.log(url);
    fetch(url)
        .then(data => {
            // do something with the data
            console.log("DONE!");
        });
}


var pos = 0;
var sequence;

function loopThroughData() {
    sendData(sequence[pos]);
    if(pos < sequence.length - 1) {
        pos ++;
        setTimeout(() => {
            loopThroughData();
        }, 3000);
    }
}



function executeCommands() {
    pos = 0;
    var data = document.getElementById('text-data').value;
    sequence = data.split("\n");
    loopThroughData();       
}

function centerAll() {
    //document.getElementById('text-data').value = '0,0,1, 1,0,1, 2,0,1, 3,0,1, 4,0,1, 5,0,1, 6,0,1';
    sendData('0,0,1, 1,0,1, 2,0,1, 3,0,1, 4,0,1, 5,0,1, 6,0,1');
}

function upAll() {
    // document.getElementById('text-data').value = '0,100,1, 2,100,1, 4,100,1, 6,100,1';
    sendData('0,100,1, 2,100,1, 4,100,1, 6,100,1');
}


function centerA() {
    sendData([0,0,1]);
}

function centerB() {
    sendData([2,0,1]);
}

function upA() {
    sendData([0,180,1]);
}

function upB() {
    sendData([2,180,1]);
}