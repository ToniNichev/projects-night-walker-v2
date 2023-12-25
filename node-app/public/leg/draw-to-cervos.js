function addLegMovement() {
  // Leg one

  // Servo 2
  var command = legOne.getAngleA() * 2;
  command = command.toFixed(0);
  command = 165 -command;
  command = '0,' + command + ",";
  document.getElementById('text-data').value += command;  

  // Servo 2
  var command = legOne.getAngleB() * 2;
  command = command.toFixed(0);
  command = 165 -command;
  command = '1,' + command + ",1\n";
  document.getElementById('text-data').value += command;

    // Leg two
}