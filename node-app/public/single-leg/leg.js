var legs = {
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



var activeEditingContainer = null;
var startLeft = 0;
var startTop = 0;
var servoOneAngle = 0;
var angleAll = 0, angle = 0;

document.addEventListener('mousemove', (e) => {
  if (activeEditingContainer == null)
    return;

  var diffX = (e.clientX - startLeft);
  var diffY = (e.clientY - startTop) - 10;

  angle = Math.atan2(diffY, diffX) * 180 / Math.PI;
  if (activeEditingContainer.getAttribute('data-servo') == 'servoTwo') {
    angleAll = angle - servoOneAngle;
  }
  else {
    angleAll = angle;
    servoOneAngle = angle;
  }
  activeEditingContainer.style.transform = `rotate(${angleAll}deg)`;
});


var sceneLeft = document.getElementById("sceneScreenLeft");
var legOne = sceneLeft.querySelector('.legOne')

var servoOne = legOne.querySelector('.servoOne')
var servoTwo = legOne.querySelector('.servoTwo')

function mouseDown(e, servo) {
  if (activeEditingContainer != null)
    return;
  activeEditingContainer = servo;

  if (activeEditingContainer.getAttribute('data-servo') == 'servoTwo') {
    startLeft = 100 * Math.cos(servoOneAngle * (Math.PI / 180));
    startTop = 100 * Math.sin(servoOneAngle * (Math.PI / 180));
  } else {
    startLeft = 0;
    startTop = 0;
  }
  console.log("start:", startLeft, startTop);
}

function mouseUp(e) {
  activeEditingContainer = null;
}

servoOne.addEventListener('mousedown', (e) => {
  mouseDown(e, servoOne);
});


servoTwo.addEventListener('mousedown', (e) => {
  mouseDown(e, servoTwo);
});


document.addEventListener('mouseup', (e) => {
  mouseUp(e);
});

// set up leg
