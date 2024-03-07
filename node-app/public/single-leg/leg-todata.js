function addLegMovement() {
    var angleA = legs.sceneLeft.legOne.servoOne.angle

    var _scenes = ['sceneLeft', 'sceneRight'];
    var _legs = ['legOne', 'legTwo'];
    var _servos = ['servoOne', 'servoTwo'];
    
    for(s = 0; s < 2; s++) {
        var _scene = _scenes[s];
        for(var i=0;i < 4; i ++) {        
            
            var _leg = _legs[Math.round(i / 4)];
            
            var _servo = _servos[i % 2];

            var angle = legs[_scene][_leg][_servo].angle;
            console.log(angle);
        }
    }
}