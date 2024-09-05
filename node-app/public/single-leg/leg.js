var commandDown = false;
var activeLeg = null;
var activeSpeed = 1;

var legs = {
  sceneLeft:
  {
    legOne: {
      servoOne: {
        leftPos: 100,
        topPos: 100,
        active: false,
        servoAngle: 0,
        speed: 1,
        angle: 0,
      },
      servoTwo: {
        leftPos: 0,
        topPos: 0,
        active: false,
        servoAngle: 0,
        speed: 1,
        angle: 0,
      }
    },
    legTwo: {
      servoOne: {
        leftPos: 300,
        topPos: 100,
        active: false,
        servoAngle: 0,
        speed: 1,
        angle: 0,
      },
      servoTwo: {
        leftPos: 0,
        topPos: 0,
        active: false,
        servoAngle: 0,
        speed: 1,
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
        active: false,
        speed: 1,
        angle: 0,
      },
      servoTwo: {
        leftPos: 0,
        topPos: 0,
        active: false,
        speed: 1,
        angle: 0,
      }
    },
    legTwo: {
      servoOne: {
        leftPos: 300,
        topPos: 400,
        active: false,
        speed: 1,
        angle: 0,
      },
      servoTwo: {
        leftPos: 0,
        topPos: 0,
        active: false,
        speed: 1,
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

  servoOne.addEventListener('dblclick', (e) => {
    mouseDoubleClick(e, sceneName, servoOne);
  });

  servoTwo.addEventListener('dblclick', (e) => {
    mouseDoubleClick(e, sceneName, servoTwo);
  });

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
  if (commandDown === true) {
    document.getElementById('speedBar').style.width = e.clientX + 'px';
    activeSpeed = parseInt(e.clientX / 90);
    activeSpeed = activeSpeed === 0 ? 1 : activeSpeed;
    console.log(activeSpeed);
    return;
  }

  if (activeEditingContainer == null) return;

  var legName = activeEditingContainer.getAttribute('data-leg');

  // Adjust for scroll position
  const scrollX = window.scrollX || window.pageXOffset;
  const scrollY = window.scrollY || window.pageYOffset;

  // Calculate the difference in position considering scroll offset
  var diffX = (e.clientX + scrollX - startLeft);
  var diffY = (e.clientY + scrollY - startTop) - 10; // Adjust for some constant offset if necessary
  var servoOneAngle = legs[activeSceneName][legName].servoOne.angle;

  angle = Math.atan2(diffY, diffX) * 180 / Math.PI;
  if (activeEditingContainer.getAttribute('data-servo') == 'servoTwo') {
    angleAll = angle - servoOneAngle;
    legs[activeSceneName][legName].servoTwo.angle = angleAll;
  } else {
    angleAll = angle;
    legs[activeSceneName][legName].servoOne.angle = angle;
  }
  activeEditingContainer.style.transform = `rotate(${angleAll}deg)`;
});


function mouseDoubleClick(e, sceneName, servo) {
  if (servo.classList.contains("notActive")) {
    servo.classList.remove("notActive")
  } else {
    servo.classList.add("notActive")
  }

  var legName = servo.getAttribute('data-leg');
  var servoName = servo.getAttribute('data-servo');
  legs[sceneName][legName][servoName].active = legs[sceneName][legName][servoName].active ? false : true;


}

function mouseDown(e, sceneName, servo) {
  if (activeEditingContainer != null)
    return;
  activeSceneName = sceneName;
  activeEditingContainer = servo;
  var legName = servo.getAttribute('data-leg');
  var servoName = servo.getAttribute('data-servo');
  var left = legs[sceneName][legName].servoOne.leftPos;
  var top = legs[sceneName][legName].servoOne.topPos;
  var servoOneAngle = legs[sceneName][legName].servoOne.angle;
  activeLeg = legs[sceneName][legName][servoName];

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


// Manipulating legs in the scene

function legToAngle(selector, angleDegree) {
  
  legSelector = selector.split('sceneScreenLeft').join('sceneLeft');
  legSelector = legSelector.split('sceneScreenRight').join('sceneRight');
  legSelector = legSelector.split('#').join('');
  legSelector = legSelector.split('>').join('');
  legSelector = legSelector.split('.');
  
  selectedLeg = legs[legSelector[0].trim()][legSelector[1].trim()][legSelector[2].trim()];
  
  // example selector: '#sceneScreenLeft > .legTwo > .servoOne'
  let angle;
  let servoAngle;
  if (selector.includes('servoTwo')) {
    angle = (- 180 - angleDegree) / 2;
    
  }
  else {
    angle = (180 - angleDegree) / 2;
    servoAngle = 180 - angleDegree;
  }
  selectedLeg.angle = angle;
  document.querySelector(selector).style.transform = `rotate(${angle}deg)`;
}