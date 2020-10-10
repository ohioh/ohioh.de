For earlier versions of Windows and Linux, you still have to go to chrome://flags/#enable-experimental-web-platform-features, enable the highlighted flag, and restart Chrome for now.


button.addEventListener('pointerup', function(event) {
  // Call navigator.bluetooth.requestDevice
});

navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
.then(device => { /* ... */ })
.catch(error => { console.log(error); });

navigator.bluetooth.requestDevice({
  filters: [{
    services: [0x1234, 0x12345678, '99999999-0000-1000-8000-00805f9b34fb']
  }]
})
.then(device => { /* ... */ })
.catch(error => { console.log(error); });

navigator.bluetooth.requestDevice({
  acceptAllDevices: true,
  optionalServices: ['battery_service']
})
.then(device => { /* ... */ })
.catch(error => { console.log(error); });

navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
.then(device => {
  // Human-readable name of the device.
  console.log(device.name);

  // Attempts to connect to remote GATT Server.
  return device.gatt.connect();
})
.then(server => { /* ... */ })
.catch(error => { console.log(error); });

navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
.then(device => device.gatt.connect())
.then(server => {
  // Getting Battery Service...
  return server.getPrimaryService('battery_service');
})
.then(service => {
  // Getting Battery Level Characteristic...
  return service.getCharacteristic('battery_level');
})
.then(characteristic => {
  // Reading Battery Level...
  return characteristic.readValue();
})
.then(value => {
  console.log('Battery percentage is ' + value.getUint8(0));
})
.catch(error => { console.log(error); });

## write a characteristic

navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] })
.then(device => device.gatt.connect())
.then(server => server.getPrimaryService('heart_rate'))
.then(service => service.getCharacteristic('heart_rate_control_point'))
.then(characteristic => {
  // Writing 1 is the signal to reset energy expended.
  var resetEnergyExpended = Uint8Array.of(1);
  return characteristic.writeValue(resetEnergyExpended);
})
.then(_ => {
  console.log('Energy expended has been reset.');
})
.catch(error => { console.log(error); });

## Recive GATT notification_:

navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] })
.then(device => device.gatt.connect())
.then(server => server.getPrimaryService('heart_rate'))
.then(service => service.getCharacteristic('heart_rate_measurement'))
.then(characteristic => characteristic.startNotifications())
.then(characteristic => {
  characteristic.addEventListener('characteristicvaluechanged',
                                  handleCharacteristicValueChanged);
  console.log('Notifications have been started.');
})
.catch(error => { console.log(error); });

function handleCharacteristicValueChanged(event) {
  var value = event.target.value;
  console.log('Received ' + value);
  // TODO: Parse Heart Rate Measurement value.
  // See https://github.com/WebBluetoothCG/demos/blob/gh-pages/heart-rate-sensor/heartRateSensor.js
}

navigator.bluetooth.requestDevice({ filters: [{ name: 'Francois robot' }] })
.then(device => {
  // Set up event listener for when device gets disconnected.
  device.addEventListener('gattserverdisconnected', onDisconnected);

  // Attempts to connect to remote GATT Server.
  return device.gatt.connect();
})
.then(server => { /* ... */ })
.catch(error => { console.log(error); });

function onDisconnected(event) {
  let device = event.target;
  console.log('Device ' + device.name + ' is disconnected.');
}

---------------------------------------------------------------------

USE The BLE Peripheral Simulator Android APP 

https://play.google.com/store/apps/details?id=io.github.webbluetoothcg.bletestperipheral
https://github.com/sibu-github/ble-peripheral-simulator
https://github.com/himelbrand/react-native-ble-peripheral
