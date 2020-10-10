GATT ( Generic Attribute Profile)

Option 1: Observer and Broadcaster
Option 2: Peripheral ( maybe with Central Switch Profile) 
Peripheral or Central role can host a GATT Server.
Peripheral can recieve connections, central role can connet to peripheral.

let chosenOHIOHService = null;

navigator.bluetooth.requestDevice({
  filters: [{
    services: ['OHIOH_key'],
  }]
  
}).then( device=>device.gatt.connect())
.then(server => server.getPrimaryService('OHIOH_key')
-then(service => {
  ohiohdata = service;
    return Promise.all([    
      service-getCharacteristic('user_key')
        .then(handleOHIOHdata),
      service.getCharacterisitc('keyTrafficData')
         .then(handleOHIOHinformations)          
  ]);
});
          
function characteristic.readValue()
  .then(sensorLocationData => {
  const sensorLocation = sensorLocationData.getUnit8(0);
    switch (sensorLocation) {
    case 0: return 'Bluetooth';
    case 1: return 'GPS';
    case 2: return 'WIFI';
    case 3: return 'Spot';
    case 3: retunr 'NFC';
    }
   }).then(location => console.log(location));
 }
 
 function handleOHIOHdata(event) {
  const characteristic: = event.target;
  console.log(parseOHIOHkey(characteristic.value));
 }
  Note parseOHIOHkey is not avaible yet. It will be created in the Api for the "broadcastin"-API
 DataView:  https://tc39.es/ecma262/#sec-dataview-constructor
 
 https://github.com/tc39/ecma262
