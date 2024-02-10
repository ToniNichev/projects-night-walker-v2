var servos = {
    one: 165,
    two: 165,
}


var legs = {
    left: {
        legOne: {
            servoOne: {
                leftPos: 288,
                topPos: 636.875,
                angle: 0,
            },
            servoTwo: {
                leftPos: 388,
                topPos: 636.875,
                angle: 0,
            }
        },
        legTwo: {
            servoOne: {
                leftPos: 288,
                topPos: 636.875,
                angle: 0,
            },
            servoTwo: {
                leftPos: 388,
                topPos: 636.875,
                angle: 0,
            }
        }
    },
    right: {

    }
}

// servoID, angle, speed


function legInit(legWrapper) {
    var containerOne = legWrapper.querySelector('.servoOne');
    var containerTwo = legWrapper.querySelector('.servoTwo');

    var activeEditingContainer = null;
    var startX, startY;
    var angle = 0.0;
    var angleA = 0.0, angleB = 0.0;
    var lastAngle = 0;

    var leftPos = 524;
    var topPos = 636.875;

    function getAngleA(servo) {
        return parseFloat(angleA);
    }

    function getAngleB(servo) {
        return parseFloat(angleB);
    }

    function mounseDown(e) {

        var leg = activeEditingContainer.dataset.leg;
        var servo = activeEditingContainer.dataset.servo;

        //lastAngle = 0;
        leftPos = legs[leg][servo].leftPos;
        topPos = legs[leg][servo].topPos;

        // angleA = angle;

        //console.log("startY :", startY);

        //leftPos = activeEditingContainer.getBoundingClientRect().x;
        //topPos = activeEditingContainer.getBoundingClientRect().y;    

    }

    containerOne.addEventListener('mousedown', (e) => {
        if (activeEditingContainer != null)
            return;
        activeEditingContainer = containerOne;
        mounseDown(e)
    });

    containerTwo.addEventListener('mousedown', (e) => {
        if (activeEditingContainer != null)
            return;
        activeEditingContainer = containerTwo;
        //mounseDown(e)    
        leftPos = containerTwo.getBoundingClientRect().x;
        topPos = containerTwo.getBoundingClientRect().y;
    });


    document.addEventListener('mouseup', (e) => {
        if (activeEditingContainer?.getAttribute('data-id') == '1') {
            //angleA = angle;

            var leg = activeEditingContainer.dataset.leg;
            var servo = activeEditingContainer.dataset.servo;

            legs[leg][servo].angle = angle;
        }
        else {
            angleB = angle;
            lastAngle = 0;
        }
        activeEditingContainer = null;
    });

    document.addEventListener('mousemove', (e) => {
        if (activeEditingContainer == null)
            return;

        var diffX = (e.clientX - leftPos); // - startX;
        var diffY = (e.clientY - topPos) - 5; // - startY;



        angle = Math.atan2(diffY, diffX) * 180 / Math.PI;


        var leg = activeEditingContainer.dataset.leg;
        var servo = activeEditingContainer.dataset.servo;

        if (activeEditingContainer?.getAttribute('data-id') == '2') {
            var lastAngle = legs["legOne"]["servoOne"].angle;
            angle = angle - lastAngle;
        }
        activeEditingContainer.style.transform = `rotate(${angle}deg)`;

        //console.log(leftPos, e.clientX)
        //console.log(diffX, diffY, angle);

        var d = DrawCanvas();
        d.clear();
        d.drawLeg(diffX, diffY, angle);
    });

    return {
        getAngleA: () => getAngleA(),
        getAngleB: () => getAngleB(),
    }
}


function setupViews(scene) {


    var legWrapperOne = scene.querySelector('.legOne');
    var legOne = legInit(legWrapperOne);

    var legWrapperTwo = scene.querySelector(".legTwo");
    var legYwo = legInit(legWrapperTwo);

    // LEG ONE 

    legs["legOne"].servoOne.leftPos = legWrapperOne.getBoundingClientRect().x
    legs["legOne"].servoOne.topPos = legWrapperOne.getBoundingClientRect().y

    legs["legOne"].servoTwo.leftPos = legWrapperOne.getBoundingClientRect().x
    legs["legOne"].servoTwo.topPos = legWrapperOne.getBoundingClientRect().y

    // LEG TWO

    legs["legTwo"].servoOne.leftPos = legWrapperTwo.getBoundingClientRect().x
    legs["legTwo"].servoOne.topPos = legWrapperTwo.getBoundingClientRect().y

    legs["legTwo"].servoTwo.leftPos = legWrapperTwo.getBoundingClientRect().x
    legs["legTwo"].servoTwo.topPos = legWrapperTwo.getBoundingClientRect().y
}







// ############################
// RIGHT View
// ############################

var sceneLeft = document.getElementById("sceneScreenLeft");
// setupViews(sceneLeft);

var sceneRight = document.getElementById("sceneScreenRight");
setupViews(sceneRight);