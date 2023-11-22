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
float floatArray[100];

void setup() {
  // HC-05 default serial speed for AT mode is 38400
  BTserial.begin(9600);    
  Serial.begin(9600);

  pwm.begin();
  pwm.setOscillatorFrequency(27000000);
  pwm.setPWMFreq(SERVO_FREQ);  // Analog servos run at ~50 Hz updates  

  // initialize servos
  for(int q = 0; q < 8; q++) {
    step[q].pos = 0;
    servo[q].pin = q;
    servo[q].trim = 0;
    pwm.setPWM(q, 0, 270);
  }

  delay(2000);
  Serial.println("Starting ...");  
}



void loop() {
  delay(10);

    for(int q = 0; q < 8; q++) {
      servo[q].moveServo(step[q].pos, step[q].speed);
    }

    if (BTserial.available()) {
        // Initialize the array of steps
        for (int i = 0; i < 10; i++) {
          floatArray[i] = 0.0;
        }
      String dataString = BTserial.readStringUntil('\n');

      // Use strtok() to tokenize the "names" string using the comma (',') as the
      // delimiter. This call initializes the strtok() function with the input
      // string and the first token.
      char *token = strtok(dataString.c_str(), ",");

      int count = 0;
      // Enter a loop to process each token until there are no more tokens left.
      while (token != NULL) {
        // Process the current token, which represents a name.
        // Print the name to the serial monitor.        
        floatArray[count] = atof(token);
        count ++;
        // Get the next token in the "names" string.
        // Subsequent calls to strtok() with a NULL pointer continue from where the
        // last token was found.
        token = strtok(NULL, ",");
      }
      Serial.println("==============");
      Serial.println(count);
      Serial.println("--------------");

      // fill out data into a moving array
      for(int i = 0; i < count; i += 3) {
        int port = static_cast<int>(floatArray[i]);
        float angle = floatArray[i + 1];
        float speed = floatArray[i + 2];
        step[port].pos = angle;
        step[port].speed = speed;
        Serial.println(port);
        Serial.println(angle);
        Serial.println(speed);
        Serial.println("--------------");
      }
      Serial.println("==============");      
    }
}