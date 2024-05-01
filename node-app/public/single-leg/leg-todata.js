var executionList = [];

function addLegMovement() {
    var angleA = legs.sceneLeft.legOne.servoOne.angle

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
            console.log(servoCount + " : " + servoIds[servoCount] + " : " + calculatedAngle);
            servoNewData.push(`${servoIds[servoCount]},${calculatedAngle},1  `)
            servoCount++;
        }
    }
    console.log(servoNewData.join(','));
    executionList.push(servoNewData.join(','));
    rebuildExecutionListUI();

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

/* ########################################

    EXWCUTION LIST 

   ######################################## */

function rebuildExecutionListUI() {
    executionList.map((element, index) => {
        var parentDiv = document.querySelector('#execution-list');

        if (!parentDiv.querySelector(`[data-id="${index}"]`)) {
            var newDiv = document.createElement('div');
            newDiv.setAttribute('data-id', index);
            newDiv.textContent =  `${index} -  ${element}`;
            // Append the new div to the parent div
            parentDiv.appendChild(newDiv);
        }
    });
}