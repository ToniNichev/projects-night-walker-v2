Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

struct Step {
  float pos;
  float speed;
};


class Servo {
  public:
    int pin = 0;
    float pos = 0;
    int move = 1;
    float trim;

    bool moveServo(int newPos, float speed) {
      if(newPos > pos) { 
        if(pos + speed > newPos)
          pos = newPos;
        else
          pos = pos + speed;
      }
      else if(newPos < pos) {
        if(pos - speed < newPos)
          pos = newPos;
        else
          pos = pos - speed;
      }
      else if(newPos == pos) {
        return true; // reached the new position
      }
      int s = (pin == 2 || pin == 3 || pin > 5) ? 1 : -1;
      float val = 270 + ((pos + trim) * s);
      pwm.setPWM(0, 0, val);
      return false;
    }
};