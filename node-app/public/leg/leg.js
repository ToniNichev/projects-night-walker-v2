
const mainScreen = document.getElementById('mainScreen');
const containers = document.querySelectorAll('.legContainer');

var activeEditingContainer = null;
var start = [];
var angle = [];

var startX = [];
var startY = [];


containers.forEach((container) => {
  container.addEventListener('mousedown', (e) => {
    activeEditingContainer = e.target;
    const id = activeEditingContainer.getAttribute('data-id');

    /*
    startX[id] = e.clientX - activeEditingContainer.offsetLeft;
    if(start[id] == 1)
      return;
    start[id] = 1;
    startY[id] = e.clientY - activeEditingContainer.offsetTop;
    */
  });
});

document.addEventListener('mousemove', (e) => {
  if (activeEditingContainer == null)
    return;
  const id = activeEditingContainer.getAttribute('data-id');     
  const r = activeEditingContainer.getBoundingClientRect();
  //console.log(r);

  const xDiff = (e.clientX - r.x); // - startX[id];
  const yDiff = (e.clientY - r.y); //    - startY[id];
  console.log(xDiff, yDiff);


  angle[id] = Math.atan2(yDiff, xDiff) * 180 / Math.PI;
  //console.log(xDiff, yDiff, angle[id].toFixed(1));
  activeEditingContainer.style.transform = `rotate(${angle[id]}deg)`;
  // console.log("angle: ", angle[id].toFixed(2));

  const dc = DrawCanvas();
  dc.clear();
  dc.drawLeg(xDiff, yDiff);

});


document.addEventListener('mouseup', (e) => {
  activeEditingContainer = null;
});