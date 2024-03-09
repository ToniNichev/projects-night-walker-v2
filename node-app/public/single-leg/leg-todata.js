function addLegMovement() {
    var angleA = legs.sceneLeft.legOne.servoOne.angle

    var _scenes = ['sceneLeft', 'sceneRight'];
    var _legs = ['legOne', 'legTwo'];
    var _servos = ['servoOne', 'servoTwo'];

    var dataField = document.getElementById('text-data');
    
    for(s = 0; s < 2; s++) {
        var _scene = _scenes[s];
        for(var i=0;i < 4; i ++) {        
            
            var _leg = _legs[Math.round(i / 4)];
            
            var _servo = _servos[i % 2];

            var angle = legs[_scene][_leg][_servo].angle;

            if(i == 0) {
                console.log(180 - angle * 2);
            } else if (i ==1 ) {
                console.log(180 + angle * 2);
            }
        }
    }
}


document.addEventListener('keydown', function(event) {
    if (event.metaKey || event.ctrlKey) {
        console.log('Command/Control key is down');
        commandDown = true;
    }
});

document.addEventListener('keyup', function(event) {
    if (!event.metaKey && !event.ctrlKey) {
        console.log('Command/Control key is up');
        commandDown = false;
    }
});
