var servos = {
  one: 165,
  two: 165,
}


var legs = {
    legOne: {
        servoOne: {
            leftPos: 0,
            topPos: 0,
            angle: 0,
        },
        servoTwo: {
            leftPos: 0,
            topPos: 0,            
            angle: 0,
        }
    },
    legTwo: {
        servoOne: {
            leftPos: 0,
            topPos: 0,
            angle: 0,
        },
        servoTwo: {
            leftPos: 0,
            topPos: 0,            
            angle: 0,
        }        
    }
}

// servoID, angle, speed


function legInit(leg) {
  var containerOne = leg.querySelector('.servoOne');
  var containerTwo = leg.querySelector('.servoTwo');

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

  function mouseDown(e) {

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
    mouseDown(e)
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





// ############################
// RIGHT View
// ############################

var sceneRight = document.getElementById("sceneScreenRight");
var legOne = sceneRight.querySelector('.legOne');
var legTwo = sceneRight.querySelector('.legTwo');

var legOneServoOne = legOne.querySelector(".servoOne");
var legOneServoTwo = legOne.querySelector(".servoTwo");

var legTwoServoOne = legTwo.querySelector(".servoOne");
var legTwoServoTwo = legTwo.querySelector(".servoTwo");
legInit(legOne);

var legTwo = sceneRight.querySelector(".legTwo");
legInit(legTwo);

// LEG ONE 

legs["legOne"].servoOne.leftPos = legOneServoOne.getBoundingClientRect().x
legs["legOne"].servoOne.topPos = legOneServoOne.getBoundingClientRect().y

legs["legOne"].servoTwo.leftPos = legOneServoTwo.getBoundingClientRect().x
legs["legOne"].servoTwo.topPos = legOneServoTwo.getBoundingClientRect().y

// LEG TWO

legs["legTwo"].servoOne.leftPos = legTwoServoOne.getBoundingClientRect().x
legs["legTwo"].servoOne.topPos = legTwoServoOne.getBoundingClientRect().y

legs["legTwo"].servoTwo.leftPos = legTwoServoTwo.getBoundingClientRect().x
legs["legTwo"].servoTwo.topPos = legTwoServoTwo.getBoundingClientRect().y
