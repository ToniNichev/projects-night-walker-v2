var legs = {
  sceneLeft:
    {
      legOne: {
        servoOne: {
          leftPos: 100,
          topPos: 100,
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
          leftPos: 300,
          topPos: 100,
          angle: 0,
        },
        servoTwo: {
          leftPos: 0,
          topPos: 0,
          angle: 0,
        }
      }
    },

    sceneRight:
    {
      legOne: {
        servoOne: {
          leftPos: 100,
          topPos: 400,
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
          leftPos: 300,
          topPos: 400,
          angle: 0,
        },
        servoTwo: {
          leftPos: 0,
          topPos: 0,
          angle: 0,
        }
      }
    },    
}

function legInit(sceneName, leg, servoOne, servoTwo) {
  var activeSceneName = '';
  var legName = servoOne.getAttribute('data-leg');

  var left = legs[sceneName][legName]['servoOne'].leftPos;
  var top = legs[sceneName][legName]['servoOne'].topPos;
  leg.style.left = `${left}px`;
  leg.style.top = `${top}px`;


  servoOne.addEventListener('mousedown', (e) => {
    mouseDown(e, sceneName, servoOne);
  });


  servoTwo.addEventListener('mousedown', (e) => {
    mouseDown(e, sceneName, servoTwo);
  });

}

var activeEditingContainer = null;
var startLeft = 0;
var startTop = 0;
// var servoOneAngle = 0;
var angleAll = 0, angle = 0;

document.addEventListener('mousemove', (e) => {
  if (activeEditingContainer == null)
    return;

  var legName = activeEditingContainer.getAttribute('data-leg');

  var diffX = (e.clientX - startLeft);
  var diffY = (e.clientY - startTop) - 10;
  var servoOneAngle = legs[activeSceneName][legName].servoOne.angle;

  angle = Math.atan2(diffY, diffX) * 180 / Math.PI;
  if (activeEditingContainer.getAttribute('data-servo') == 'servoTwo') {
    angleAll = angle - servoOneAngle;
    legs[activeSceneName][legName].servoTwo.angle = angleAll;
  }
  else {
    angleAll = angle;

    legs[activeSceneName][legName].servoOne.angle = angle;
  }
  activeEditingContainer.style.transform = `rotate(${angleAll}deg)`;
});

function mouseDown(e, sceneName, servo) {
  if (activeEditingContainer != null)
    return;
  activeSceneName = sceneName;
  activeEditingContainer = servo;
  var legName = servo.getAttribute('data-leg');
  var left = legs[sceneName][legName].servoOne.leftPos;
  var top = legs[sceneName][legName].servoOne.topPos;
  var servoOneAngle = legs[sceneName][legName].servoOne.angle;

  if (activeEditingContainer.getAttribute('data-servo') == 'servoTwo') {
    startLeft = 100 * Math.cos(servoOneAngle * (Math.PI / 180)) + left;
    startTop = 100 * Math.sin(servoOneAngle * (Math.PI / 180)) + top;
  } else {
    startLeft = left;
    startTop = top;
  }
}


document.addEventListener('mouseup', (e) => {
  activeEditingContainer = null;
});

// set up legs on scene left

var sceneLeft = document.getElementById("sceneScreenLeft");
var legOne = sceneLeft.querySelector('.legOne')
var legTwo = sceneLeft.querySelector('.legTwo')

var legOneServoOne = legOne.querySelector('.servoOne');
var legOneServoTwo = legOne.querySelector('.servoTwo');

legInit("sceneLeft", legOne, legOneServoOne, legOneServoTwo);

var legTwoServoOne = legTwo.querySelector('.servoOne');
var legTwoServoTwo = legTwo.querySelector('.servoTwo');

legInit("sceneLeft", legTwo, legTwoServoOne, legTwoServoTwo);


// set up legs on scene left

var sceneRight = document.getElementById("sceneScreenRight");
var legOne = sceneRight.querySelector('.legOne')
var legTwo = sceneRight.querySelector('.legTwo')

var legOneServoOne = legOne.querySelector('.servoOne');
var legOneServoTwo = legOne.querySelector('.servoTwo');

legInit("sceneRight", legOne, legOneServoOne, legOneServoTwo);

var legTwoServoOne = legTwo.querySelector('.servoOne');
var legTwoServoTwo = legTwo.querySelector('.servoTwo');

legInit("sceneRight", legTwo, legTwoServoOne, legTwoServoTwo);