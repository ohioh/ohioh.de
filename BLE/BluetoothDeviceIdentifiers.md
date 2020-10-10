BluetoothDeviceIdentifiers or short BDI

The OHIOHkey as ServiceData

unique 48-bit MAC address known as BD_ADDR.
Each device has one Public Device Address(mac Adress) and a static Device Address(is generated on each restart)
LE DEvices may have a unique 128-bit Idintify Resolving Key ( IRK) which is sended to trusted devices in the bonding process)
To save the privacy the LE DEvice scan and advertise using an radnom Resolvable or non Resolveable Private Address instead of the static or Public Adress
This can be generated approximately every 15 minutes)
A Resolveable PRivate Adress Resolution Procedure is used  with the bonded device by matching the stored IRKs
Each Device has a huma-readable Bluetooth Device Name. This is not show to be unique.

Identifier for Remote Bluetooth device:
If a website can retrieve any of the persistent device IDs, these can be used, in combination with a large effort to catalog ambient devices, to discover a user’s location. A device ID can also be used to identify that a user who pairs two different websites with the same Bluetooth device is a single user. On the other hand, many GATT services are available that could be used to fingerprint a device, and a device can easily expose a custom GATT service to make this easier.

Bluetooth adress:
This can be sended and listend in the scanning modus.

Exposing Bluetooth avaiblity:
navigator.bluetooth.getAvailability() 
 which returns a promise which can the user ask to what value want to return) in our case the OHIOH unique key and dB ( #dsitance )
 Send and listen should be used in even and odd time interval #two cases
## Device Discovery:

dictionary BluetoothDataFilterInit {
  BufferSource dataPrefix;
  BufferSource mask;
};

dictionary BluetoothLEScanFilterInit {
  sequence<BluetoothServiceUUID> services;
  DOMString name;
  DOMString namePrefix;
  // Maps unsigned shorts to BluetoothDataFilters.
  object manufacturerData;
  // Maps BluetoothServiceUUIDs to BluetoothDataFilters.
  object serviceData;
};

dictionary RequestDeviceOptions {
  sequence<BluetoothLEScanFilterInit> filters;
  sequence<BluetoothServiceUUID> optionalServices = [];
  boolean acceptAllDevices = false;
};

[Exposed=Window, SecureContext]
interface Bluetooth : EventTarget {
  Promise<boolean> getAvailability();
  attribute EventHandler onavailabilitychanged;
  [SameObject]
  readonly attribute BluetoothDevice? referringDevice;
  Promise<sequence<BluetoothDevice>> getDevices();
  Promise<BluetoothDevice> requestDevice(optional RequestDeviceOptions options = {});
};

Bluetooth includes BluetoothDeviceEventHandlers;
Bluetooth includes CharacteristicEventHandlers;
Bluetooth includes ServiceEventHandlers;

# Note: getAvailability() informs the page whether Bluetooth is available at all. An adapter that’s disabled through software should count as available.
referringDevice() gice access to the device from which the user open the page.
navigator.bluetooth.referringDevice()

getDevices()
 enables the page to retrieve Bluetooth devices that the user has granted access to.
 
 requestDevice(options) asks the user to grant this origin access to a device that matches any filter in options.filters. To match a filter, the device has to:

support all the GATT service UUIDs in the services list if that member is present,

have a name equal to name if that member is present,

have a name starting with namePrefix if that member is present,

advertise service data matching all of the key/value pairs in serviceData if that member is present.
advertise manufacturer specific data matching all of the key/value pairs in manufacturerData if that member is present, and
Both Manufacturer Specific Data and Service Data map a key to an array of bytes. BluetoothDataFilterInit filters these arrays. An array matches if it has a prefix such that prefix & mask is equal to dataPrefix & mask.
avoid acceptAllDevices
We do not need to pair if the ServiceInofrmation is stored with time and db
For filter the Services we have do declare it:
A = Yes im am from OHIOH-APP,
B = unique OHIOH Key,
C = dB;
E = ManufactoryData ( Time in milliseconds )
F = Name of the BLE Sensor or MAC

navigator.bluetooth.requestDevice({
  filters: [ {services: [A,B,C]} ],
  optionalService: [E]
});

navigator.bluetooth.requestDevice({
  filters: [ {manufacturerData: {E}} ],
  optionalService: [F]
});

after that we can call :
navigator.bluetooth.getDevices();

To get the idea:
https://webbluetoothcg.github.io/web-bluetooth/ 
And read §3  Device Discovery


Eddystone Format:
Eddystone is an open beacon format developed by Google.Eddystone can be detected by both Android and iOS devices.

Eddystone-UID: A unique, static ID with a 10-byte Namespace component and a 6-byte Instance component.
(!!!)Eddystone-URL: A compressed URL that, once parsed and decompressed, is directly usable by the client.
Eddystone-TLM: Beacon status data that is useful for beacon fleet maintenance, and powers Google Proximity Beacon API's diagnostics endpoint. -TLM should be interleaved with an identifying frame such as Eddystone-UID or Eddystone-EID (for which the encrypted eTLM version preserves security).
Eddystone-EID: A time-varying beacon frame that can be resolved to a stable identifier by a linked resolver, such as Proximity Beacon API.

