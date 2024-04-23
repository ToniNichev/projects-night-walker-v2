function addLegMovement() {
  
// ##########################
// Leg one
// ##########################
  // Servo 1
  
  var command = legOne.getAngleA() * 1.845;
  command = command.toFixed(0);
  command = 165 - command;
  command = '1,' + command + ",1";
  document.getElementById('text-data').value = command;  

  document.getElementById('text-data').value += ', ';
  
  // Servo 2
  
  var command = legOne.getAngleB() * 1.85;
  command = command.toFixed(0);
  command = 165 + command;
  command = ' 0,' + command + ",1";
  document.getElementById('text-data').value += command;
  

  // ##########################
  // Leg two
  // ##########################  
}