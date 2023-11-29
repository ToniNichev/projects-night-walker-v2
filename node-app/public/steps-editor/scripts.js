var options = {
    onChangeCallback: function (deviceId, requiredTemperature) {
      console.log("On change:", deviceId, requiredTemperature);
    },
    SliderId: 0,
    Min: 0,
    Max: 200,
    Step: 1,
    ShowPrecision: 2,
    SetRangeValue: function () {
      console.log("Set SetRangeValue");
    },
    setTempAndHumidity: function () {

    },
    onEditingMode: function () {
      console.log("EDITING !!!!!");
    }
  };

  // right side
  Dialer(options);
  options.SliderId = 1;
  Dialer(options);
  options.SliderId = 2;
  Dialer(options);
  options.SliderId = 3;
  Dialer(options);  

  // left side  
  options.SliderId = 4;  
  Dialer(options);
  options.SliderId = 5;
  Dialer(options);
  options.SliderId = 6;
  Dialer(options);
  options.SliderId = 7;
  Dialer(options);  
