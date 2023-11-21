#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include <SoftwareSerial.h>
#include "servo.h"

#define SERVO_FREQ 50 // Analog servos run at ~50 Hz updates

SoftwareSerial BTserial(3,2); // TX, RX
uint8_t ID;
int count = 0;
Servo servo[8];
Step step[8];

void setup() {
  // HC-05 default serial speed for AT mode is 38400
  BTserial.begin(9600);    
  Serial.begin(9600);

  Serial.println("Servo walker");
  pwm.begin();
  pwm.setOscillatorFrequency(27000000);
  pwm.setPWMFreq(SERVO_FREQ);  // Analog servos run at ~50 Hz updates  
  // float trim[] = {0,0,10,0,0,0,-15,0};
  // legs.init(trim);

  step[0].pos = 0;
  step[1].pos = 0;
  step[2].pos = 0;
  step[3].pos = 0;

  for(int q = 0; q < 4; q++) {
    servo[q].pin = 0;
    servo[q].trim = 0;
    pwm.setPWM(q, 0, 270);
  }

  delay(2000);
  Serial.println("Starting ...");  
}



void loop() {
    servo[0].moveServo(step[0].pos, 1);
  if (BTserial.available()) {
    String dataString = "";
    while (BTserial.available()) {
      char c = BTserial.read();
      dataString += c;
    }
    // Convert data string to float value
    float dataValue = atof(dataString.c_str());
    //step[0].pos = dataValue;
    Serial.println(dataValue);
    Serial.println("--------------------------------");
  }
}