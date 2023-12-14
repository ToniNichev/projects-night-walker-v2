var container = document.querySelector('.legOne');
var containerTwo = document.querySelector('.legTwo');

var activeEditingContainer = null;
var startX, startY;
var angle = 0;
var lastAngle = 0;

container.addEventListener('mousedown', (e)=>{
    if (activeEditingContainer != null)
        return;
    activeEditingContainer = container;
    startX = e.clientX - activeEditingContainer.offsetLeft;
    startY = e.clientY - activeEditingContainer.offsetTop;
    console.log(e.clientY, activeEditingContainer.offsetTop, "=", startY);
});

containerTwo.addEventListener('mousedown', (e)=>{
    //angle = 0;
    activeEditingContainer = containerTwo;
    startX = e.clientX - activeEditingContainer.offsetLeft;
    startY = e.clientY - activeEditingContainer.offsetTop;
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

    var diffX = (e.clientX - activeEditingContainer.offsetLeft);
    var diffY;
    if (activeEditingContainer.getAttribute('data-id') == '1')
        diffY = (e.clientY - activeEditingContainer.offsetTop) - 15 // - startY;
    else {
        var r = activeEditingContainer.getBoundingClientRect();
        diffY = (e.clientY - r.y) - startY;
    }

    angle = Math.atan2(diffY, diffX) * 180 / Math.PI;
    angle = angle - lastAngle;
    activeEditingContainer.style.transform = `rotate(${angle}deg)`;

    var d = DrawCanvas();
    d.clear();
    d.drawLeg(diffX, diffY, angle);
}
);
