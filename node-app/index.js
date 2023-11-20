const express = require('express');
const path = require('path');
const { SerialPort } = require('serialport');

const app = express();
const appPort = process.env.PORT || 8080;

// Create a port
const port = new SerialPort({
  path: '/dev/tty.HC-05',
  baudRate: 9600,
});


app.get('/send-data', function(req, res) {
  const data = req.query.data;
  port.write(data, function(err) {
    if (err) {
      return console.log('Error on write: ', err.message)
    }
    console.log('message written');
    //port.close();
  })
  
  // Open errors will be emitted as an error event
  port.on('error', function(err) {
    console.log('Error: ', err.message)
  })  

  res.send("OK");
});

app.get('/', function(req, res) {





    port.write('toni 123', function(err) {
        if (err) {
          return console.log('Error on write: ', err.message)
        }
        console.log('message written');
        //port.close();
      })
      
      // Open errors will be emitted as an error event
      port.on('error', function(err) {
        console.log('Error: ', err.message)
      })

    
    res.sendFile(path.join(__dirname, '/src/index.html'));
});

app.listen(appPort);
console.log('Server started at http://localhost:' + appPort);