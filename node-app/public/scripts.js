
function sendData(data) {
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
    pos = 0;
    sendData(sequence[pos]);
    pos ++;
    if(pos < sequence.length) {
        setTimeout(() => {
            var data = sequence[pos];
            sendData(data);
        }, 1040);
    }
}


function execute() {
    var data = document.querySelector('body > main > textarea').value;
    sequence = data.split("\n");
    loopThroughData();       
}

function centerAll() {
    sendData([0,0,1]);
    setTimeout(() => {sendData([2,0,1]);}, 1070);
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