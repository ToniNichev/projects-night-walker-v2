var activeEditingContainer = null;
var startLeft = 0;
var startTop = 0;
var servoOneAngle = 0;
var angleAll = 0, angle = 0;

document.addEventListener('mousemove', (e) => {
  if (activeEditingContainer == null)
    return;

  var diffX = (e.clientX - startLeft);
  var diffY = (e.clientY - startTop) - 10 // - startY;

  angle = Math.atan2(diffY, diffX) * 180 / Math.PI;
  if(activeEditingContainer.getAttribute('data-servo') == 'servoTwo') {
    angleAll = angle - servoOneAngle;
  }
  else {
    angleAll = angle;
    servoOneAngle = angle;
  }



  activeEditingContainer.style.transform = `rotate(${angleAll}deg)`;
});


var scene = document.getElementById("sceneScreenLeft");
var legOne = scene.querySelector('.legOne')

var servoOne = legOne.querySelector('.servoOne')
var servoTwo = legOne.querySelector('.servoTwo')

function mouseDown(e, servo) {
  // if(angle < 0)
   // lastAngle = lastAngle - angle;

  if (activeEditingContainer != null)
    return;   
    activeEditingContainer = servo;
  
  if(activeEditingContainer.getAttribute('data-servo') == 'servoTwo') {
    startLeft = 100 * Math.cos(servoOneAngle * (Math.PI / 180));
    startTop = 100 * Math.sin(servoOneAngle * (Math.PI / 180));     
  } else {
    startLeft = 0;
    startTop = 0;
  }
  console.log("start:", startLeft, startTop);
}

function mouseUp(e) {
  console.log("Mounse up");
  activeEditingContainer = null;
  //lastAngle = angleAll;
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



// servoOne.style.transform = `rotate(${45}deg)`;