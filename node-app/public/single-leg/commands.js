
document.querySelector('.commands > .moveServosToZero').addEventListener('click', (e) => {
    // --=== sceneScreenLeft ==-- 
    // legOne
    legToAngle('#sceneScreenLeft > .legOne > .servoOne', 0);
    legToAngle('#sceneScreenLeft > .legOne .servoTwo', 0);    
    // legTwo
    legToAngle('#sceneScreenLeft > .legTwo > .servoOne', 0);
    legToAngle('#sceneScreenLeft > .legTwo .servoTwo', 0);

    // --=== sceneScreenRight ==-- 
    // legOne
    legToAngle('#sceneScreenRight > .legOne > .servoOne', 0);
    legToAngle('#sceneScreenRight > .legOne .servoTwo', 0);    
    // legTwo
    legToAngle('#sceneScreenRight > .legTwo > .servoOne', 0);
    legToAngle('#sceneScreenRight > .legTwo .servoTwo', 0);
    
});

document.querySelector('.commands > .moveServosToDefaultWalkStart').addEventListener('click', (e) => {
    // --=== sceneScreenLeft ==-- 
    // legOne
    legToAngle('#sceneScreenLeft > .legOne > .servoOne', -80);
    legToAngle('#sceneScreenLeft > .legOne .servoTwo', 10);    
    // legTwo
    legToAngle('#sceneScreenLeft > .legTwo > .servoOne', -80);
    legToAngle('#sceneScreenLeft > .legTwo .servoTwo', 10);

    // --=== sceneScreenRight ==-- 
    // legOne
    legToAngle('#sceneScreenRight > .legOne > .servoOne', -80);
    legToAngle('#sceneScreenRight > .legOne .servoTwo', 10);    
    // legTwo
    legToAngle('#sceneScreenRight > .legTwo > .servoOne', -80);
    legToAngle('#sceneScreenRight > .legTwo .servoTwo', 10);
    
});