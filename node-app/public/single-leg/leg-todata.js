var executionList = [];

function calculateLegMovement() {
    //var angleA = legs.sceneLeft.legOne.servoOne.angle

    var _scenes = ['sceneLeft', 'sceneRight'];
    var _legs = ['legOne', 'legTwo'];
    var _servos = ['servoOne', 'servoTwo',];
    //slots:        0, 1, 2 ,3, 4, 5, 6, 7 
    var servoIds = [5, 4, 1, 0, 7, 6, 3, 2];
    var servoCount = 0;
    var servoNewData = [];

    var dataField = document.getElementById('text-data');

    for (s = 0; s < 2; s++) {
        var _scene = _scenes[s];
        for (var i = 0; i < 4; i++) {

            var _leg = _legs[Math.round(i / 4)];

            var _servo = _servos[i % 2];

            var angle = legs[_scene][_leg][_servo].angle;
            var speed = 1;

            var calculatedAngle;
            switch (i) {
                case 0:
                    calculatedAngle = 180 - angle * 2;
                    break;
                case 1:
                    calculatedAngle = 180 + angle * 2;
                    break;
                case 2:
                    calculatedAngle = 180 - angle * 2;
                    break;
                case 3:
                    calculatedAngle = 180 + angle * 2;
                    break;
            }
            calculatedAngle = Math.round(calculatedAngle * 100) / 100;
            // console.log(servoCount + " : " + servoIds[servoCount] + " : " + calculatedAngle);
            legs[_scene][_leg][_servo].servoAngle = calculatedAngle;
            legs[_scene][_leg][_servo].speed = activeSpeed;
            servoNewData.push(`${servoIds[servoCount]},${calculatedAngle},${activeSpeed}`)
            servoCount++;
        }
    }
    return servoNewData;
}

function addLegMovement() {
    const servoNewData = calculateLegMovement();
    consoleLogForArduinoSkitch();
    executionList.push(servoNewData.join(',  '));
    rebuildExecutionListUI();
}

function consoleLogForArduinoSkitch() {
    
    console.log(`
    {
        {
            // front right leg
            ${legs.sceneLeft.legTwo.servoTwo.servoAngle},
            ${legs.sceneLeft.legTwo.servoOne.servoAngle},
            // front left leg
            ${legs.sceneRight.legTwo.servoTwo.servoAngle},
            ${legs.sceneRight.legTwo.servoOne.servoAngle},
            // rear right leg   
            ${legs.sceneLeft.legOne.servoTwo.servoAngle},
            ${legs.sceneLeft.legOne.servoOne.servoAngle},             
            // rear left leg   
            ${legs.sceneRight.legOne.servoTwo.servoAngle},
            ${legs.sceneRight.legOne.servoOne.servoAngle},                     
        },
        1
    },
    `);
}


document.addEventListener('keydown', function (event) {
    if (event.metaKey || event.ctrlKey) {
        console.log('Command/Control key is down');
        commandDown = true;
    }
});

document.addEventListener('keyup', function (event) {
    if (!event.metaKey && !event.ctrlKey) {
        console.log('Command/Control key is up');
        commandDown = false;
    }
});


function dataToLegs(data) {
    var _scenes = ['sceneScreenLeft', 'sceneScreenRight'];
    var _legs = ['legOne', 'legTwo'];
    var _servos = ['servoOne', 'servoTwo',];
    //slots:        0, 1, 2 ,3, 4, 5, 6, 7 
    var servoIds = [5, 4, 1, 0, 7, 6, 3, 2];
    var servoCount = 0;
    var servoNewData = [];

    for (s = 0; s < 2; s++) {
        var _scene = _scenes[s];
        for (var i = 0; i < 4; i++) {            
            const greater = _servos[i % 2] === 'servoOne' ? '>' : '';
            const servoSelector = `#${_scene} > .${_legs[Math.round(i / 4)]} ${greater} .${_servos[i % 2]}`;
            let angle =  parseFloat(data[3 * servoCount + 1]);
            angle = _servos[i % 2] === 'servoOne' ? angle : -angle;
            legToAngle(servoSelector, angle);
            servoCount++;
        }
    }

}

/* ########################################
    EXECUTION LIST 
   ######################################## */

function rebuildExecutionListUI() {
    var parentDiv = document.querySelector('#execution-list');
    parentDiv.innerHTML = '';    
    executionList.map((element, index) => {

        //if (!parentDiv.querySelector(`[data-id="${index}"]`)) {
            var newDiv = document.createElement('div');
            newDiv.setAttribute('data-id', index);            
            // Set textarea
            var newInputText = document.createElement('input');
            newInputText.setAttribute('type', 'text');
            newInputText.value =  `${index} -  ${element}`;
            newDiv.appendChild(newInputText);
            // Button - legs to data
            var setServoButton = document.createElement('button');
            setServoButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
            setServoButton.addEventListener('click', (e) => {
                var servoData = element.split(',');
                dataToLegs(servoData)
            });
            newDiv.appendChild(setServoButton);

            // Button - Data to legs
            var setServoButton = document.createElement('button');
            setServoButton.innerHTML = '<i class="fas fa-arrow-down"></i>';
            setServoButton.addEventListener('click', (e) => {
                const index = e.target.parentElement.parentElement.getAttribute('data-id');
                const servoNewData = calculateLegMovement();
                executionList[index] = `${servoNewData.join(',  ')}`;
                rebuildExecutionListUI();
            });
            newDiv.appendChild(setServoButton);    

            // Button - Delete row
            var setServoButton = document.createElement('button');
            setServoButton.innerHTML = '<i class="fas fa-trash"></i>';
            setServoButton.addEventListener('click', (e) => {
                const index = e.target.parentElement.parentElement.getAttribute('data-id');
                executionList.splice(index, 1);
                rebuildExecutionListUI();
            });
            newDiv.appendChild(setServoButton);                    
            // Append the new div to the parent div
            parentDiv.appendChild(newDiv);
        //}
    });
}

function executeCommands() {
    pos = 0;
    loopThroughData();   
}

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

function loopThroughData() {
    sendData(executionList[pos]);
    if(pos < executionList.length - 1) {
        pos ++;
        setTimeout(() => {
            loopThroughData();
        }, 3000);
    }
}
