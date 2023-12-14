function legInit(legWrapper) {
    var container = legWrapper.querySelector('.servoOne');
    var containerTwo = legWrapper.querySelector('.servoTwo');
    
    var activeEditingContainer = null;
    var startX, startY;
    var angle = 0;
    var lastAngle = 0;
    
    var leftPos;
    var topPos;
    
    container.addEventListener('mousedown', (e)=> {
        if (activeEditingContainer != null)
            return;
        lastAngle = 0;    
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
    
    
    document.addEventListener('mouseup', (e)=> {
        if (activeEditingContainer?.getAttribute('data-id') == '1')
            lastAngle = angle;    
        activeEditingContainer = null;    
    });
    
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
}


var legWrapperOne = document.getElementById("legOne");
legInit(legWrapperOne);

var legWrapperTwo = document.getElementById("legTwo");
legInit(legWrapperTwo);