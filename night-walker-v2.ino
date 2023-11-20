#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include <SoftwareSerial.h>
#include "servo.h"

#define SERVO_FREQ 50 // Analog servos run at ~50 Hz updates
Legs legs;

SoftwareSerial BTserial(3,2); // TX, RX
uint8_t ID;
int count = 0;

void setup() {
  // HC-05 default serial speed for AT mode is 38400
  BTserial.begin(9600);    
  Serial.begin(9600);

  Serial.println("Servo walker");
  pwm.begin();
  pwm.setOscillatorFrequency(27000000);
  pwm.setPWMFreq(SERVO_FREQ);  // Analog servos run at ~50 Hz updates  
  float trim[] = {0,0,10,0,0,0,-15,0};
  legs.init(trim);
  delay(2000);
  Serial.println("Starting ...");  
}

void loop() {
  if (BTserial.available()) {
    String dataString = "";
    while (BTserial.available()) {
      char c = BTserial.read();
      dataString += c;
    }
    // Convert data string to float value
    float dataValue = atof(dataString.c_str());
    Serial.println(dataValue);
  }
}