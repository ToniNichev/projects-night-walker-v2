#include <SoftwareSerial.h>

SoftwareSerial BTserial(3,2); // TX, RX
uint8_t ID;
int count = 0;
int data = 0;

void setup() {
  // HC-05 default serial speed for AT mode is 38400
  BTserial.begin(9600);    
  Serial.begin(9600);
}

void loop() {
  if (BTserial.available()) {
    data = BTserial.read(); 
    Serial.println("DATA");
    char c = static_cast<char>(data);
    Serial.println(c);
  }
}