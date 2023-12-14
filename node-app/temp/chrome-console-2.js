var container = document.querySelector('.legOne');
var containerTwo = document.querySelector('.legTwo');

var activeEditingContainer = null;
var startX, startY;
var angle = 0;
var lastAngle = 0;

var leftPos;
var topPos;

container.addEventListener('mousedown', (e)=>{
    if (activeEditingContainer != null)
        return;
    activeEditingContainer = container;
    startX = e.clientX - activeEditingContainer.offsetLeft;
    startY = e.clientY - activeEditingContainer.offsetTop;
    // console.log(e.clientY, activeEditingContainer.offsetTop, "=", startY);

    leftPos = activeEditingContainer.getBoundingClientRect().x;
    topPos = activeEditingContainer.getBoundingClientRect().y;    
});

containerTwo.addEventListener('mousedown', (e)=>{
    if (activeEditingContainer != null)
        return;
    activeEditingContainer = containerTwo;
    startX = e.clientX - activeEditingContainer.offsetLeft;
    startY = e.clientY - activeEditingContainer.offsetTop;

    leftPos = activeEditingContainer.getBoundingClientRect().x;
    topPos = activeEditingContainer.getBoundingClientRect().y;    
    
});


document.addEventListener('mouseup', (e)=>{
    activeEditingContainer = null;
    //lastAngle = c - angle;
    console.log(angle);
}
);

document.addEventListener('mousemove', (e)=>{
    if (activeEditingContainer == null)
        return;

    // var left = activeEditingContainer.getBoundingClientRect().x;
    // var top = activeEditingContainer.getBoundingClientRect().y;
    var diffX = (e.clientX - leftPos);
    var diffY = (e.clientY - topPos) - 15 // - startY;

    angle = Math.atan2(diffY, diffX) * 180 / Math.PI;
    angle = angle - lastAngle;
    activeEditingContainer.style.transform = `rotate(${angle}deg)`;

    var d = DrawCanvas();
    d.clear();
    d.drawLeg(diffX, diffY, angle);
}
);
