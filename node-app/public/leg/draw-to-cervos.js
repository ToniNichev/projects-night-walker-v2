function addLegMovement() {
  // Leg one

  // Servo 2
  var command = legOne.getAngle() * 2;
  command = command.toFixed(0);
  command = 165 -command;
  command = '1,' + command + ",1\n";
  document.getElementById('text-data').value += command;  

  // Servo 2
  var command = legOne.getAngle() * 2;
  command = command.toFixed(0);
  command = 165 -command;
  command = '1,' + command + ",1\n";
  document.getElementById('text-data').value += command;

    // Leg two
}