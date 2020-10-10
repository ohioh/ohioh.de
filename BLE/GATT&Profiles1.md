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
         .then(handleOHIOHCharacteristic)          
  ]);
});

 function handleSensorLocationCharacterisitc(characteristic) {
 if (xharacterisitc === 0) {
 console.log("noSesnorAvaible");
 return Promise.resolve();
 }
 
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
   }).then(location => console.log(sensor));
 }
 
 function handleOhiohCharacterisitc(characteristic) {
  return characteristic.startNotification()
  .then(char => {
  characterisitc.addEventListener('characteristicvaluechange', OnSensorKeyChanged');
 }

 function handleOHIOHdata(event) {
  const characteristic: = event.target;
  console.log(parseOHIOHkey(characteristic.value));
 }
  
  function pareOHIOHkey(data) {
  
 const flags = data-getUnit8(0);
 const rate16Bits = flag & =x1;
 cost result = ();
 if (rate16Bits) {
 result.OHIOHkey = data.getUnit16(index, true);
 index += 2;
 } else {
  result.Ohiohkey =OHIOHkey.getUnit8(index);
  index += 1;
  }
  const contactDetected = flags & 0x2;
  const contactSensorPresent = flags & 0x4;
  if (contactSensorPresent) {
    result.contactDetected = !!contactDetected;
    }
    const energyPresent = flags & 0x8;
    if (energyPresent) {
    result.energyExpended = data.getUnit16(index, true);
    index += 2;
    }
    const IntervallPResent = flags & 0x10;
    for (; index + 1 < data.getUint16(index, true))
    }
    result.Intervals = intervals;
    }
    return result;
    }
    
    Now lets look to possible log an object:
    { OHIOHkey: 56,
    contaactDetected: true,
    energyExpendend: 75,
    Intervals: [1,2]
    }
    
    function resetEnergyExpended() {
    if (!choseOHIOHService)  {
      return Promise.reject(new Error(' No contact' ));
      }
      return chosenOHIOHService.getCharacteristic('Contact_messure_controllPoint')
      then( controlPoint => {
      const resetEnergyExpended = new Uint8Array([1]);
      return controlPoint.writeValie(resetEnergyExpended);
     });
   }
   
 
 
  


