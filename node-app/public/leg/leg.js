function legInit(legWrapper) {
  var container = legWrapper.querySelector('.servoOne');
  var containerTwo = legWrapper.querySelector('.servoTwo');

  var activeEditingContainer = null;
  var startX, startY;
  var angle = 0;
  var angleA, angleB;
  var lastAngle = 0;

  var leftPos;
  var topPos;

  function getAngle(servo) {
    return angle;
  }

  container.addEventListener('mousedown', (e) => {
    if (activeEditingContainer != null)
      return;
    lastAngle = 0;
    activeEditingContainer = container;
    startX = e.clientX - activeEditingContainer.offsetLeft;
    startY = e.clientY - activeEditingContainer.offsetTop;
    angleA = angle;

    leftPos = activeEditingContainer.getBoundingClientRect().x;
    topPos = activeEditingContainer.getBoundingClientRect().y;
  });

  containerTwo.addEventListener('mousedown', (e) => {
    if (activeEditingContainer != null)
      return;
    activeEditingContainer = containerTwo;
    startX = e.clientX - activeEditingContainer.offsetLeft;
    startY = e.clientY - activeEditingContainer.offsetTop;

    angleB = angle;
    leftPos = activeEditingContainer.getBoundingClientRect().x;
    topPos = activeEditingContainer.getBoundingClientRect().y;

  });


  document.addEventListener('mouseup', (e) => {
    if (activeEditingContainer?.getAttribute('data-id') == '1')
      lastAngle = angle;
    activeEditingContainer = null;
  });

  document.addEventListener('mousemove', (e) => {
    if (activeEditingContainer == null)
      return;

    var diffX = (e.clientX - leftPos);
    var diffY = (e.clientY - topPos) - 10 // - startY;

    angle = Math.atan2(diffY, diffX) * 180 / Math.PI;
    angle = angle - lastAngle;
    activeEditingContainer.style.transform = `rotate(${angle}deg)`;

    var d = DrawCanvas();
    d.clear();
    d.drawLeg(diffX, diffY, angle);
  });

  return {
    getAngle: () => getAngle(),
  }
}

// RIGHT View
var sceneRight = document.getElementById("sceneScreenRight");

var legWrapperOne = sceneRight.querySelector('.legOne')
var legOne = legInit(legWrapperOne);

var legWrapperTwo = sceneRight.querySelector(".legTwo");
var legYwo = legInit(legWrapperTwo);


// LEFT View

var sceneLeft = document.getElementById("sceneScreenLeft");

var legWrapperThree = sceneLeft.querySelector('.legThree')
legInit(legWrapperThree);


var legWrapperFour = sceneLeft.querySelector(".legFour");
legInit(legWrapperFour);