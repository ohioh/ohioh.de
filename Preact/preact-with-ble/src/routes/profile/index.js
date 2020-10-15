import React, { useState, useEffect } from 'react';


function App() {
  var deviceName = 'Palm'

  function isWebBluetoothEnabled() {
    if (!navigator.bluetooth) {
      console.log('Web Bluetooth API is not available in this browser!')
      return false
    }

    return true
  }

  function getDeviceInfo() {
    let options = {
     acceptAllDevices: true ,// Option to accept all devices
     
    }

    console.log('Requesting Bluetooth Device...')
    navigator.bluetooth.requestDevice(options).then(device => {
      console.log('> Name: ' + device.name)
    }).catch(error => {
      console.log('Argh! ' + error)
    })
  }

  

  return (
    <div className="App">
      <h1>Ami keno Gadha</h1>
      <button onclick={getDeviceInfo}>Connect with BLE device</button>
    </div>
  );
}

export default App;