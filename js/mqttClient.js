var mqttHost = 'test.mosquitto.org';
var mqttPort = 8080;
var mqttTopic = '724cb57fb81b463980ac71543012d9cd/sensors/#';

// Create a client instance
client = new Paho.MQTT.Client('test.mosquitto.org', 8080, "rabbitpi-web-ui");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe(mqttTopic);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  try {
    updateSensor(JSON.parse(message.payloadString));
  }
  catch (error) {
    console.log('MQTT message error: ' + err.message);
  }
}
