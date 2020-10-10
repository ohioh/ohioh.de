BluetoothDeviceIdentifiers or short BDI
We have to creata a user Agent for watch advetisment mangment
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

# The getDevice() method:

To getDevices() method, when invoked and given a BluetoothPermissionStorage storage, MUST return a new promise promise and run the following steps in parallel:
Let devices be a new empty Array.

For each allowedDevice in storage.allowedDevices, add the BluetoothDevice object representing allowedDevice@[[device]] to devices.

Resolve promise with devices.

Note: The BluetoothDevices in devices may not be in range of the Bluetooth radio. For a given device in devices, the watchAdvertisements() method can be used to observe when device is in range and broadcasting advertisement packets. When an advertisementreceived event event is fired on a device, it may indicate that it is close enough for a connection to be established by calling event.device.gatt.connect().


# Filter and use option:
The requestDevice(options) method, when invoked, MUST return a new promise promise and run the following steps in parallel:
If options.filters is present and options.acceptAllDevices is true, or if options.filters is not present and options.acceptAllDevices is false, reject promise with a TypeError and abort these steps.

Note: This enforces that exactly one of filters or acceptAllDevices:true is present.
Request Bluetooth devices, passing options.filters if options.acceptAllDevices is false or null otherwise, and passing options.optionalServices, and let devices be the result.

If the previous step threw an exception, reject promise with that exception and abort these steps.

If devices is an empty sequence, reject promise with a NotFoundError and abort these steps.

Resolve promise with devices[0].

# Request devices by BluetoothPermissionstorage:
To request Bluetooth devices, given a BluetoothPermissionStorage storage and a sequence of BluetoothLEScanFilterInits, filters, which can be null to represent that all devices can match, and a sequence of BluetoothServiceUUIDs, optionalServices, the UA MUST run the following steps:
Note: These steps can block, so uses of this algorithm must be in parallel.
Note: Calls to this algorithm will eventually be able to request multiple devices, but for now it only ever returns a single one.
Check that the algorithm is triggered while its relevant global object has a transient activation, otherwise throw a SecurityError and abort these steps.

In order to convert the arguments from service names and aliases to just UUIDs, do the following sub-steps:

If filters !== null && filters.length === 0, throw a TypeError and abort these steps.

Let uuidFilters be a new Array and requiredServiceUUIDs be a new Set.

If filters is null, then set requiredServiceUUIDs to the set of all UUIDs.

If filters isn’t null, then for each filter in filters, do the following steps:

Let canonicalFilter be the result of canonicalizing filter.

Append canonicalFilter to uuidFilters.

Add the contents of canonicalFilter.services to requiredServiceUUIDs.

Let optionalServiceUUIDs be Array.prototype.map.call(optionalServices, BluetoothUUID.getService).

If any of the BluetoothUUID.getService() calls threw an exception, throw that exception and abort these steps.

Remove from optionalServiceUUIDs any UUIDs that are blocklisted.

Let descriptor be

{
  name: "bluetooth",
  filters: uuidFilters
  optionalServices: optionalServiceUUIDs,
  acceptAllDevices: filters !== null,
}
Let state be descriptor’s permission state.

Note: state will be "denied" in non-secure contexts because "bluetooth" doesn’t set the allowed in non-secure contexts flag.
If state is "denied", return [] and abort these steps.

If the UA can prove that no devices could possibly be found in the next step, for example because there is no Bluetooth adapter with which to scan, or because the filters can’t be matched by any possible advertising packet, the UA MAY return [] and abort these steps.

Scan for devices with requiredServiceUUIDs as the set of Service UUIDs, and let scanResult be the result.

If filters isn’t null, remove devices from scanResult if they do not match a filter in uuidFilters.

Even if scanResult is empty, prompt the user to choose one of the devices in scanResult, associated with descriptor, and let device be the result.

The UA MAY allow the user to select a nearby device that does not match uuidFilters.

Note: The UA should show the user the human-readable name of each device. If this name is not available because, for example, the UA’s Bluetooth system doesn’t support privacy-enabled scans, the UA should allow the user to indicate interest and then perform a privacy-disabled scan to retrieve the name.
The UA MAY add device to storage.

Note: Choosing a device probably indicates that the user intends that device to appear in the allowedDevices list of "bluetooth"'s extra permission data for at least the current settings object, for its mayUseGATT field to be true, and for all the services in the union of requiredServiceUUIDs and optionalServiceUUIDs to appear in its allowedServices list, in addition to any services that were already there.
If device is "denied", return [] and abort these steps.

The UA MAY populate the Bluetooth cache with all Services inside device. Ignore any errors from this step.

Get the BluetoothDevice representing device inside the context object, propagating any exception, and let deviceObj be the result.

Return [deviceObj].

# scan for devices has a lots of issues:

We can go away from this prob by having a seperate Array Check Function withour rremmbering the BLe for other devices(background sort and check) this way with remembering the devices coudl get a fuuu long list
 For nearbyDevices
For each Bluetooth device device in nearbyDevices, do the following sub-steps:

If device’s supported physical transports include LE and its Bluetooth Device Name is partial or absent, the UA SHOULD perform the Name Discovery Procedure to acquire a complete name.

If device’s advertised Service UUIDs have a non-empty intersection with the set of Service UUIDs, add device to result and abort these sub-steps.

Note: For BR/EDR devices, there is no way to distinguish GATT from non-GATT services in the Extended Inquiry Response. If a site filters to the UUID of a non-GATT service, the user may be able to select a device for the result of requestDevice that this API provides no way to interact with.
The UA MAY connect to device and populate the Bluetooth cache with all Services whose UUIDs are in the set of Service UUIDs. If device’s supported physical transports include BR/EDR, then in addition to the standard GATT procedures, the UA MAY use the Service Discovery Protocol (Searching for Services) when populating the cache.

Note: Connecting to every nearby device to discover services costs power and can slow down other use of the Bluetooth radio. UAs should only discover extra services on a device if they have some reason to expect that device to be interesting.
UAs should also help developers avoid relying on this extra discovery behavior. For example, say a developer has previously connected to a device, so the UA knows the device’s full set of supported services. If this developer then filters using a non-advertised UUID, the dialog they see may include this device, even if the filter would likely exclude the device on users' machines. The UA could provide a developer option to warn when this happens or to include only advertised services in matching filters.

If the Bluetooth cache contains known-present Services inside device with UUIDs in the set of Service UUIDs, the UA MAY add device to result.

Return result from the scan.

# To add an allowed BLE device 
Let grantedServiceUUIDs be a new Set.

Add the contents of requiredServiceUUIDs to grantedServiceUUIDs.

Add the contents of optionalServiceUUIDs to grantedServiceUUIDs.

Search for an element allowedDevice in storage.allowedDevices where device is equal to allowedDevice@[[device]]. If one is found, perform the following sub-steps:

Add the contents of allowedDevice.allowedServices to grantedServiceUUIDs.

If one is not found, perform the following sub-steps:

Let allowedDevice.deviceId be a unique ID to the extent that the UA can determine that two Bluetooth connections are the same device and to the extent that the user wants to expose that fact to script.

Set allowedDevice.allowedServices to grantedServiceUUIDs.

Set allowedDevice.mayUseGATT to true.

# Only for overall bluetooth avaiblitiy:
const bluetoothUI = document.querySelector('#bluetoothUI');
navigator.bluetooth.getAvailability().then(isAvailable => {
  bluetoothUI.hidden = !isAvailable;
});
navigator.bluetooth.addEventListener('availabilitychanged', e => {
  bluetoothUI.hidden = !e.value;
});
Note: If the Web Bluetooth permission has been blocked by the user, the UA may resolve promise with false.
Note: The promise is resolved in parallel to let the UA call out to other systems to determine whether Bluetooth is available.

# Use BLE when active:
function checkAvailability() {
  const bluetoothUI = document.querySelector('#bluetoothUI');
  navigator.bluetooth.getAvailability().then(isAvailable => {
    bluetoothUI.hidden = !isAvailable;
  });
}

navigator.permissions.query({name: "bluetooth"}).then(status => {
  if (status.state !== 'denied') checkAvailability();

  // Bluetooth is blocked, listen for change in PermissionStatus.
  status.onchange = () => {
    if (this.state !== 'denied') checkAvailability();
  };
});

# 'PArticular BLE isntance or REALM:

[Exposed=Window, SecureContext]
interface BluetoothDevice : EventTarget {
  readonly attribute DOMString id;
  readonly attribute DOMString? name;
  readonly attribute BluetoothRemoteGATTServer? gatt;

  Promise<void> watchAdvertisements(
      optional WatchAdvertisementsOptions options = {});
  readonly attribute boolean watchingAdvertisements;
};
BluetoothDevice includes BluetoothDeviceEventHandlers;
BluetoothDevice includes CharacteristicEventHandlers;
BluetoothDevice includes ServiceEventHandlers;

dictionary WatchAdvertisementsOptions {
  AbortSignal signal;
};

## NOTE IMPROTANT for Instances

NOTE: BluetoothDevice ATTRIBUTES
id uniquely identifies a device to the extent that the UA can determine that two Bluetooth connections are to the same device and to the extent that the user wants to expose that fact to script.
name is the human-readable name of the device.

gatt provides a way to interact with this device’s GATT server if the site has permission to do so.

watchingAdvertisements is true if the UA is currently scanning for advertisements from this device and firing events for them.

Instances of BluetoothDevice are created with the internal slots described in the following table:

[[context]]  [[gatt]] [[allowedServices]] [[watchAdvertisementsState]] -> pending watch and  watch 
	An string enumeration describing the current state of a watchAdvertisements() operation. The possible enumeration values are:
'not-watching'

'pending-watch'

'watching'

## GATT

Getting the gatt attribute MUST perform the following steps:
If "bluetooth"'s extra permission data for this's relevant settings object has an AllowedBluetoothDevice allowedDevice in its allowedDevices list with allowedDevice.[[device]] the same device as this.[[representedDevice]] and allowedDevice.mayUseGATT equal to true, return this.[[gatt]].

Otherwise, return null.


## User Agent
A user agent has an associated watch advertisements manager which is the result of starting a new parallel queue.

The watchAdvertisements(options) method, when invoked, MUST return a new promise promise and run the following steps:
If options.signal is present, then perform the following sub-steps:

If options.signal’s aborted flag is set, then abort watchAdvertisements with this and abort these steps.

Add the following abort steps to options.signal:

Abort watchAdvertisements with this.

Reject promise with AbortError

If this.[[watchAdvertisementsState]] is:

'not-watching'
Set this.[[watchAdvertisementsState]] to 'pending-watch'.

Enqueue the following steps to the watch advertisements manager, but abort when this.[[watchAdvertisementsState]] becomes not-watching:

Ensure that the UA is scanning for this device’s advertisements. The UA SHOULD NOT filter out "duplicate" advertisements for the same device.

If the UA fails to enable scanning, queue a task to perform the following steps, and abort these steps:

Set this.[[watchAdvertisementsState]] to 'not-watching'.

Reject promise with one of the following errors:

The UA doesn’t support scanning for advertisements
NotSupportedError

Bluetooth is turned off
InvalidStateError

Other reasons
UnknownError

Queue a task to perform the following steps, but abort when this.[[watchAdvertisementsState]] becomes not-watching:

Set this.[[watchAdvertisementsState]] to watching.

Set this.watchingAdvertisements to true.

Resolve promise with undefined.

'pending-watch'
Reject promise with InvalidStateError.

'watching'
Resolve promise with undefined.

If aborted, reject promise with

AbortError.

Note: Scanning costs power, so websites should avoid watching for advertisements unnecessarily, and should use their AbortController to stop using power as soon as possible.

## To Stop watchAdvertisements 
To abort watchAdvertisements for a BluetoothDevice device, run these steps:
Set this.[[watchAdvertisementsState]] to 'not-watching'.

Set device.watchingAdvertisements to false.

Enqueue the following steps to watch advertisements manager:

If no more BluetoothDevices in the whole UA have watchingAdvertisements set to true, the UA SHOULD stop scanning for advertisements. Otherwise, if no more BluetoothDevices representing the same device as this have watchingAdvertisements set to true, the UA SHOULD reconfigure the scan to avoid receiving reports for this device.

To abort all active watchAdvertisements operations, run these steps:
For each device in Bluetooth.[[deviceInstanceMap]], perform the following steps:

If device.[[watchAdvertisementsState]] is pending-watch or watching, run abort watchAdvertisements with device.

## Visibiltiy Change 

visiblity state has to be "visible"

## 4.2.3. Responding to Advertising Events ( not stable )

When an advertising event arrives for a BluetoothDevice with watchingAdvertisements set, the UA delivers an "advertisementreceived" event.

[Exposed=Window, SecureContext]
interface BluetoothManufacturerDataMap {
  readonly maplike<unsigned short, DataView>;
};
[Exposed=Window, SecureContext]
interface BluetoothServiceDataMap {
  readonly maplike<UUID, DataView>;
};
[
  Exposed=Window,
  SecureContext
]
interface BluetoothAdvertisingEvent : Event {
  constructor(DOMString type, BluetoothAdvertisingEventInit init);
  [SameObject]
  readonly attribute BluetoothDevice device;
  readonly attribute FrozenArray<UUID> uuids;
  readonly attribute DOMString? name;
  readonly attribute unsigned short? appearance;
  readonly attribute byte? txPower;
  readonly attribute byte? rssi;
  [SameObject]
  readonly attribute BluetoothManufacturerDataMap manufacturerData;
  [SameObject]
  readonly attribute BluetoothServiceDataMap serviceData;
};
dictionary BluetoothAdvertisingEventInit : EventInit {
  required BluetoothDevice device;
  sequence<(DOMString or unsigned long)> uuids;
  DOMString name;
  unsigned short appearance;
  byte txPower;
  byte rssi;
  BluetoothManufacturerDataMap manufacturerData;
  BluetoothServiceDataMap serviceData;
};
 
 NOTE: BluetoothAdvertisingEvent ATTRIBUTES
device is the BluetoothDevice that sent this advertisement.
uuids lists the Service UUIDs that this advertisement says device's GATT server supports.

name is device's local name, or a prefix of it.

appearance is an Appearance, one of the values defined by the org.bluetooth.characteristic.gap.appearance characteristic.

txPower is the transmission power at which the device is broadcasting, measured in dBm. This is used to compute the path loss as this.txPower - this.rssi.

rssi is the power at which the advertisement was received, measured in dBm. This is used to compute the path loss as this.txPower - this.rssi.

manufacturerData maps unsigned short Company Identifier Codes to DataViews.

serviceData maps UUIDs to DataViews.

## Advertising event:

Let device be the Bluetooth device that sent the advertising event.

For each BluetoothDevice deviceObj in the UA such that device is the same device as deviceObj.[[representedDevice]], queue a task on deviceObj’s relevant settings object’s responsible event loop to do the following sub-steps:

If deviceObj.watchingAdvertisements is false, abort these sub-steps.

Fire an advertisementreceived event for the advertising event at deviceObj.

o fire an advertisementreceived event for an advertising event adv at a BluetoothDevice deviceObj, the UA MUST perform the following steps:
Let event be

{
  bubbles: true,
  device: deviceObj,
  uuids: [],
  manufacturerData: new Map(),
  serviceData: new Map()
}
If the received signal strength is available for any packet in adv, set event.rssi to this signal strength in dBm.

For each AD structure in adv’s advertising packet and scan response, select from the following steps depending on the AD type:

 Incomplete List of 16-bit Service UUIDs
 Complete List of 16-bit Service UUIDs
 Incomplete List of 32-bit Service UUIDs
 Complete List of 32-bit Service UUIDs
 Incomplete List of 128-bit Service UUIDs
 Complete List of 128-bit Service UUIDs
Append the listed UUIDs to event.uuids.
Shortened Local Name
Complete Local Name
UTF-8 decode without BOM the AD data and set event.name to the result.
Note: We don’t expose whether the name is complete because existing APIs require reading the raw advertisement to get this information, and we want more evidence that it’s useful before adding a field to the API.
Manufacturer Specific Data
Add to event.manufacturerData a mapping from the 16-bit Company Identifier Code to an ArrayBuffer containing the manufacturer-specific data.
TX Power Level
Set event.txPower to the AD data.
Service Data - 16 bit UUID
Service Data - 32 bit UUID
Service Data - 128 bit UUID
Add to event.serviceData a mapping from the UUID to an ArrayBuffer containing the service data.
Appearance
Set event.appearance to the AD data.
Otherwise
Skip to the next AD structure.
Fire an event initialized as new BluetoothAdvertisingEvent("advertisementreceived", event), with its isTrusted attribute initialized to true, at deviceObj.

All fields in BluetoothAdvertisingEvent return the last value they were initialized or set to.

## 4.2.3.2. BluetoothServiceDataMap
Instances of BluetoothServiceDataMap have a [[BackingMap]] slot because they are maplike, which maps service UUIDs to the service’s data, converted to DataViews.

## BluetoothCache

5.1.2. The Bluetooth cache
The UA MUST maintain a Bluetooth cache of the hierarchy of Services, Characteristics, and Descriptors it has discovered on a device. The UA MAY share this cache between multiple origins accessing the same device. Each potential entry in the cache is either known-present, known-absent, or unknown. The cache MUST NOT contain two entries that are for the same attribute. Each known-present entry in the cache is associated with an optional Promise<BluetoothRemoteGATTService>, Promise<BluetoothRemoteGATTCharacteristic>, or Promise<BluetoothRemoteGATTDescriptor> instance for each Bluetooth instance.

Note: For example, if a user calls the serviceA.getCharacteristic(uuid1) function with an initially empty Bluetooth cache, the UA uses the Discover Characteristics by UUID procedure to fill the needed cache entries, and the UA ends the procedure early because it only needs one Characteristic to fulfil the returned Promise, then the first Characteristic with UUID uuid1 inside serviceA is known-present, and any subsequent Characteristics with that UUID remain unknown. If the user later calls serviceA.getCharacteristics(uuid1), the UA needs to resume or restart the Discover Characteristics by UUID procedure. If it turns out that serviceA only has one Characteristic with UUID uuid1, then the subsequent Characteristics become known-absent.
The known-present entries in the Bluetooth cache are ordered: Primary Services appear in a particular order within a device, Included Services and Characteristics appear in a particular order within Services, and Descriptors appear in a particular order within Characteristics. The order SHOULD match the order of Attribute Handles on the device, but UAs MAY use another order if the device’s order isn’t available.

To populate the Bluetooth cache with entries matching some description, the UA MUST run the following steps.
Note: These steps can block, so uses of this algorithm must be in parallel.
Attempt to make all matching entries in the cache either known-present or known-absent, using any sequence of GATT procedures that [BLUETOOTH42] specifies will return enough information. Handle errors as described in § 5.7 Error handling.

If the previous step returns an error, return that error from this algorithm.

To query the Bluetooth cache in a BluetoothDevice instance deviceObj for entries matching some description, the UA MUST return a deviceObj.gatt-connection-checking wrapper around a new promise promise and run the following steps in parallel:
Populate the Bluetooth cache with entries matching the description.

If the previous step returns an error, reject promise with that error and abort these steps.

Let entries be the sequence of known-present cache entries matching the description.

Let context be deviceObj.[[context]].

Let result be a new sequence.

For each entry in entries:

If entry has no associated Promise<BluetoothGATT*> instance in context.[[attributeInstanceMap]], create a BluetoothRemoteGATTService representing entry, create a BluetoothRemoteGATTCharacteristic representing entry, or create a BluetoothRemoteGATTDescriptor representing entry, depending on whether entry is a Service, Characteristic, or Descriptor, and add a mapping from entry to the resulting Promise in context.[[attributeInstanceMap]].

Append to result the Promise<BluetoothGATT*> instance associated with entry in context.[[attributeInstanceMap]].

Resolve promise with the result of waiting for all elements of result.

Represented(obj: Device or GATT Attribute) returns, depending on the type of obj:
BluetoothDevice
obj.[[representedDevice]]
BluetoothRemoteGATTService
obj.[[representedService]]
BluetoothRemoteGATTCharacteristic
obj.[[representedCharacteristic]]
BluetoothRemoteGATTDescriptor
obj.[[representedDescriptor]]

## Permanent other BluetoothRemoteGATTServer
BluetoothRemoteGATTServer represents a GATT Server on a remote device.

[Exposed=Window, SecureContext]
interface BluetoothRemoteGATTServer {
  [SameObject]
  readonly attribute BluetoothDevice device;
  readonly attribute boolean connected;
  Promise<BluetoothRemoteGATTServer> connect();
  void disconnect();
  Promise<BluetoothRemoteGATTService> getPrimaryService(BluetoothServiceUUID service);
  Promise<sequence<BluetoothRemoteGATTService>>
    getPrimaryServices(optional BluetoothServiceUUID service);
};
 
 ## permanent own GATTService:
 [Exposed=Window, SecureContext]
interface BluetoothRemoteGATTService : EventTarget {
  [SameObject]
  readonly attribute BluetoothDevice device;
  readonly attribute UUID uuid;
  readonly attribute boolean isPrimary;
  Promise<BluetoothRemoteGATTCharacteristic>
    getCharacteristic(BluetoothCharacteristicUUID characteristic);
  Promise<sequence<BluetoothRemoteGATTCharacteristic>>
    getCharacteristics(optional BluetoothCharacteristicUUID characteristic);
  Promise<BluetoothRemoteGATTService>
    getIncludedService(BluetoothServiceUUID service);
  Promise<sequence<BluetoothRemoteGATTService>>
    getIncludedServices(optional BluetoothServiceUUID service);
};
BluetoothRemoteGATTService includes CharacteristicEventHandlers;
BluetoothRemoteGATTService includes ServiceEventHandlers;
 
 NOTE: BluetoothRemoteGATTService ATTRIBUTES
device is the BluetoothDevice representing the remote peripheral that the GATT service belongs to.
uuid is the UUID of the service, e.g. '0000180d-0000-1000-8000-00805f9b34fb' for the Heart Rate service.

isPrimary indicates whether the type of this service is primary or secondary.

To create a BluetoothRemoteGATTService representing a Service service, the UA must return a new promise promise and run the following steps in parallel.
Let result be a new instance of BluetoothRemoteGATTService with its [[representedService]] slot initialized to service.

Get the BluetoothDevice representing the device in which service appears, and let device be the result.

If the previous step threw an error, reject promise with that error and abort these steps.

Initialize result.device from device.

Initialize result.uuid from the UUID of service.

If service is a Primary Service, initialize result.isPrimary to true. Otherwise initialize result.isPrimary to false.

Resolve promise with result.

The getCharacteristic(characteristic) method retrieves a Characteristic inside this Service. When invoked, it MUST return
GetGATTChildren(attribute=this,
single=true,
uuidCanonicalizer=BluetoothUUID.getCharacteristic,
uuid=characteristic,
allowedUuids=undefined,
child type="GATT Characteristic")

## Here is the Important part:

.4. BluetoothRemoteGATTCharacteristic
BluetoothRemoteGATTCharacteristic represents a GATT Characteristic, which is a basic data element that provides further information about a peripheral’s service.

[Exposed=Window, SecureContext]
interface BluetoothRemoteGATTCharacteristic : EventTarget {
  [SameObject]
  readonly attribute BluetoothRemoteGATTService service;
  readonly attribute UUID uuid;
  readonly attribute BluetoothCharacteristicProperties properties;
  readonly attribute DataView? value;
  Promise<BluetoothRemoteGATTDescriptor> getDescriptor(BluetoothDescriptorUUID descriptor);
  Promise<sequence<BluetoothRemoteGATTDescriptor>>
    getDescriptors(optional BluetoothDescriptorUUID descriptor);
  Promise<DataView> readValue();
  Promise<void> writeValue(BufferSource value);
  Promise<void> writeValueWithResponse(BufferSource value);
  Promise<void> writeValueWithoutResponse(BufferSource value);
  Promise<BluetoothRemoteGATTCharacteristic> startNotifications();
  Promise<BluetoothRemoteGATTCharacteristic> stopNotifications();
};
BluetoothRemoteGATTCharacteristic includes CharacteristicEventHandlers;
NOTE: BluetoothRemoteGATTCharacteristic ATTRIBUTES
service is the GATT service this characteristic belongs to.
uuid is the UUID of the characteristic, e.g. '00002a37-0000-1000-8000-00805f9b34fb' for the Heart Rate Measurement characteristic.

properties holds the properties of this characteristic.

value is the currently cached characteristic value. This value gets updated when the value of the characteristic is read or updated via a notification or indication.

Instances of BluetoothRemoteGATTCharacteristic are created with the internal slots described in the following table:

Internal Slot	Initial Value	Description (non-normative)
[[representedCharacteristic]]	<always set in prose>	The Characteristic this object represents, or null if the Characteristic has been removed or otherwise invalidated.
To create a BluetoothRemoteGATTCharacteristic representing a Characteristic characteristic, the UA must return a new promise promise and run the following steps in parallel.
Let result be a new instance of BluetoothRemoteGATTCharacteristic with its [[representedCharacteristic]] slot initialized to characteristic.

Initialize result.service from the BluetoothRemoteGATTService instance representing the Service in which characteristic appears.

Initialize result.uuid from the UUID of characteristic.

Create a BluetoothCharacteristicProperties instance from the Characteristic characteristic, and let propertiesPromise be the result.

Wait for propertiesPromise to settle.

If propertiesPromise was rejected, resolve promise with propertiesPromise and abort these steps.

Initialize result.properties from the value propertiesPromise was fulfilled with.

Initialize result.value to null. The UA MAY initialize result.value to a new DataView wrapping a new ArrayBuffer containing the most recently read value from characteristic if this value is available.

Resolve promise with result.

The getDescriptor(descriptor) method retrieves a Descriptor inside this Characteristic. When invoked, it MUST return
GetGATTChildren(attribute=this,
single=true,
uuidCanonicalizer=BluetoothUUID.getDescriptor,
uuid=descriptor,
allowedUuids=undefined,
child type="GATT Descriptor")

The getDescriptors(descriptor) method retrieves a list of Descriptors inside this Characteristic. When invoked, it MUST return
GetGATTChildren(attribute=this,
single=false,
uuidCanonicalizer=BluetoothUUID.getDescriptor,
uuid=descriptor,
allowedUuids=undefined,
child type="GATT Descriptor")

The readValue() method, when invoked, MUST run the following steps:
If this.uuid is blocklisted for reads, return a promise rejected with a SecurityError and abort these steps.

If this.service.device.gatt.connected is false, return a promise rejected with a NetworkError and abort these steps.

Let characteristic be this.[[representedCharacteristic]].

If characteristic is null, return a promise rejected with an InvalidStateError and abort these steps.

Return a this.service.device.gatt-connection-checking wrapper around a new promise promise and run the following steps in parallel:

If the Read bit is not set in characteristic’s properties, reject promise with a NotSupportedError and abort these steps.

If the UA is currently using the Bluetooth system, it MAY reject promise with a NetworkError and abort these steps.

 Implementations may be able to avoid this NetworkError, but for now sites need to serialize their use of this API and/or give the user a way to retry failed operations. <https://github.com/WebBluetoothCG/web-bluetooth/issues/188>

Use any combination of the sub-procedures in the Characteristic Value Read procedure to retrieve the value of characteristic. Handle errors as described in § 5.7 Error handling.

If the previous step returned an error, reject promise with that error and abort these steps.

Queue a task to perform the following steps:

If promise is not in this.service.device.gatt.[[activeAlgorithms]], reject promise with a NetworkError and abort these steps.

Let buffer be an ArrayBuffer holding the retrieved value, and assign new DataView(buffer) to this.value.

Fire an event named characteristicvaluechanged with its bubbles attribute initialized to true at this.

Resolve promise with this.value.

## Start and STop Notification:

The startNotifications() method, when invoked, MUST return a new promise promise and run the following steps in parallel. See § 5.6.4 Responding to Notifications and Indications for details of receiving notifications.
If this.uuid is blocklisted for reads, reject promise with a SecurityError and abort these steps.

If this.service.device.gatt.connected is false, reject promise with a NetworkError and abort these steps.

Let characteristic be this.[[representedCharacteristic]].

If characteristic is null, return a promise rejected with an InvalidStateError and abort these steps.

If neither of the Notify or Indicate bits are set in characteristic’s properties, reject promise with a NotSupportedError and abort these steps.

If characteristic’s active notification context set contains navigator.bluetooth, resolve promise with this and abort these steps.

If the UA is currently using the Bluetooth system, it MAY reject promise with a NetworkError and abort these steps.

 Implementations may be able to avoid this NetworkError, but for now sites need to serialize their use of this API and/or give the user a way to retry failed operations. <https://github.com/WebBluetoothCG/web-bluetooth/issues/188>

If the characteristic has a Client Characteristic Configuration descriptor, use any of the Characteristic Descriptors procedures to ensure that one of the Notification or Indication bits in characteristic’s Client Characteristic Configuration descriptor is set, matching the constraints in characteristic’s properties. The UA SHOULD avoid setting both bits, and MUST deduplicate value-change events if both bits are set. Handle errors as described in § 5.7 Error handling.

Note: Some devices have characteristics whose properties include the Notify or Indicate bit but that don’t have a Client Characteristic Configuration descriptor. These non-standard-compliant characteristics tend to send notifications or indications unconditionally, so this specification allows applications to simply subscribe to their messages.
If the previous step returned an error, reject promise with that error and abort these steps.

Add navigator.bluetooth to characteristic’s active notification context set.

Resolve promise with this.

Note: After notifications are enabled, the resulting value-change events won’t be delivered until after the current microtask checkpoint. This allows a developer to set up handlers in the .then handler of the result promise.
The stopNotifications() method, when invoked, MUST return a new promise promise and run the following steps in parallel:
Let characteristic be this.[[representedCharacteristic]].

If characteristic is null, return a promise rejected with an InvalidStateError and abort these steps.

If characteristic’s active notification context set contains navigator.bluetooth, remove it.

If characteristic’s active notification context set became empty and the characteristic has a Client Characteristic Configuration descriptor, the UA SHOULD use any of the Characteristic Descriptors procedures to clear the Notification and Indication bits in characteristic’s Client Characteristic Configuration descriptor.

Queue a task to resolve promise with this.

Note: Queuing a task to resolve the promise ensures that no value change events due to notifications arrive after the promise resolves.

## 5.4.1. BluetoothCharacteristicProperties

Each BluetoothRemoteGATTCharacteristic exposes its characteristic properties through a BluetoothCharacteristicProperties object. These properties express what operations are valid on the characteristic.

[Exposed=Window, SecureContext]
interface BluetoothCharacteristicProperties {
  readonly attribute boolean broadcast;
  readonly attribute boolean read;
  readonly attribute boolean writeWithoutResponse;
  readonly attribute boolean write;
  readonly attribute boolean notify;
  readonly attribute boolean indicate;
  readonly attribute boolean authenticatedSignedWrites;
  readonly attribute boolean reliableWrite;
  readonly attribute boolean writableAuxiliaries;
};
To create a BluetoothCharacteristicProperties instance from the Characteristic characteristic, the UA MUST return a new promise promise and run the following steps in parallel:
Let propertiesObj be a new instance of BluetoothCharacteristicProperties.

Let properties be the characteristic properties of characteristic.

Initialize the attributes of propertiesObj from the corresponding bits in properties:

Attribute	Bit
broadcast	Broadcast
read	Read
writeWithoutResponse	Write Without Response
write	Write
notify	Notify
indicate	Indicate
authenticatedSignedWrites	Authenticated Signed Writes
If the Extended Properties bit of the characteristic properties is not set, initialize propertiesObj.reliableWrite and propertiesObj.writableAuxiliaries to false. Otherwise, run the following steps:

Discover the Characteristic Extended Properties descriptor for characteristic and read its value into extendedProperties. Handle errors as described in § 5.7 Error handling.

 Characteristic Extended Properties isn’t clear whether the extended properties are immutable for a given Characteristic. If they are, the UA should be allowed to cache them.

If the previous step returned an error, reject promise with that error and abort these steps.

Initialize propertiesObj.reliableWrite from the Reliable Write bit of extendedProperties.

Initialize propertiesObj.writableAuxiliaries from the Writable Auxiliaries bit of extendedProperties.

Resolve promise with propertiesObj.

5.5. BluetoothRemoteGATTDescriptor
BluetoothRemoteGATTDescriptor represents a GATT Descriptor, which provides further information about a Characteristic’s value.

[Exposed=Window, SecureContext]
interface BluetoothRemoteGATTDescriptor {
  [SameObject]
  readonly attribute BluetoothRemoteGATTCharacteristic characteristic;
  readonly attribute UUID uuid;
  readonly attribute DataView? value;
  Promise<DataView> readValue();
  Promise<void> writeValue(BufferSource value);
};
NOTE: BluetoothRemoteGATTDescriptor ATTRIBUTES
characteristic is the GATT characteristic this descriptor belongs to.
uuid is the UUID of the characteristic descriptor, e.g. '00002902-0000-1000-8000-00805f9b34fb' for the Client Characteristic Configuration descriptor.

value is the currently cached descriptor value. This value gets updated when the value of the descriptor is read.

Instances of BluetoothRemoteGATTDescriptor are created with the internal slots described in the following table:

Internal Slot	Initial Value	Description (non-normative)
[[representedDescriptor]]	<always set in prose>	The Descriptor this object represents, or null if the Descriptor has been removed or otherwise invalidated.
To create a BluetoothRemoteGATTDescriptor representing a Descriptor descriptor, the UA must return a new promise promise and run the following steps in parallel.
Let result be a new instance of BluetoothRemoteGATTDescriptor with its [[representedDescriptor]] slot initialized to descriptor.

Initialize result.characteristic from the BluetoothRemoteGATTCharacteristic instance representing the Characteristic in which descriptor appears.

Initialize result.uuid from the UUID of descriptor.

Initialize result.value to null. The UA MAY initialize result.value to a new DataView wrapping a new ArrayBuffer containing the most recently read value from descriptor if this value is available.

Resolve promise with result.

The readValue() method, when invoked, MUST run the following steps:
If this.uuid is blocklisted for reads, return a promise rejected with a SecurityError and abort these steps.

If this.characteristic.service.device.gatt.connected is false, return a promise rejected with a NetworkError and abort these steps.

Let descriptor be this.[[representedDescriptor]].

If descriptor is null, return a promise rejected with an InvalidStateError and abort these steps.

Return a this.characteristic.service.device.gatt- connection-checking wrapper around a new promise promise and run the following steps in parallel:

If the UA is currently using the Bluetooth system, it MAY reject promise with a NetworkError and abort these steps.

 Implementations may be able to avoid this NetworkError, but for now sites need to serialize their use of this API and/or give the user a way to retry failed operations. <https://github.com/WebBluetoothCG/web-bluetooth/issues/188>

Use either the Read Characteristic Descriptors or the Read Long Characteristic Descriptors sub-procedure to retrieve the value of descriptor. Handle errors as described in § 5.7 Error handling.

If the previous step returned an error, reject promise with that error and abort these steps.

Queue a task to perform the following steps:

If promise is not in this.characteristic.service.device.gatt.[[activeAlgorithms]], reject promise with a NetworkError and abort these steps.

Let buffer be an ArrayBuffer holding the retrieved value, and assign new DataView(buffer) to this.value.

Resolve promise with this.value.


## The Bluetooth Tree 

1. navigator.bluetooth
2 BluetoothDevice, BleutoothRemoteGATTService, BluetoothRemoteGATTCharacterisitic or BluetoothDescriptor


## BLE Events:

# advertisementreceived
Fired on a BluetoothDevice when an advertising event is received from that device.

# availabilitychanged
Fired on navigator.bluetooth when the Bluetooth system as a whole becomes available or unavailable to the UA.

# characteristicvaluechanged
Fired on a BluetoothRemoteGATTCharacteristic when its value changes, either as a result of a read request , or a value change notification/indication.

# gattserverdisconnected
Fired on a BluetoothDevice when an active GATT connection is lost.

# serviceadded
Fired on a new BluetoothRemoteGATTService when it has been discovered on a remote device, just after it is added to the Bluetooth tree.

# servicechanged
Fired on a BluetoothRemoteGATTService when its state changes. This involves any characteristics and/or descriptors that get added or removed from the service, as well as Service Changed indications from the remote device.

# serviceremoved
Fired on a BluetoothRemoteGATTService when it has been removed from its device, just before it is removed from the Bluetooth tree.

## UUID:
typedef DOMString UUID;
A UUID string represents a 128-bit [RFC4122] UUID. A valid UUID is a string that matches the [ECMAScript] regexp /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/. That is, a valid UUID is lower-case and does not use the 16- or 32-bit abbreviations defined by the Bluetooth standard. All UUIDs returned from functions and attributes in this specification MUST be valid UUIDs. If a function in this specification takes a parameter whose type is UUID or a dictionary including a UUID attribute, and the argument passed in any UUID slot is not a valid UUID, the function MUST return a promise rejected with a TypeError and abort its other steps.

Note: This standard provides the BluetoothUUID.canonicalUUID(alias) function to map a 16- or 32-bit Bluetooth UUID alias to its 128-bit form.
Note: Bluetooth devices are required to convert 16- and 32-bit UUIDs to 128-bit UUIDs before comparing them (as described in Attribute Type), but not all devices do so. To interoperate with these devices, if the UA has received a UUID from the device in one form (16-, 32-, or 128-bit), it should send other aliases of that UUID back to the device in the same form.

## Standardized UUIDs
The Bluetooth SIG maintains a registry at [BLUETOOTH-ASSIGNED] of UUIDs that identify services, characteristics, descriptors, and other entities. This section provides a way for script to look up those UUIDs by name so they don’t need to be replicated in each application.

[Exposed=Window]
interface BluetoothUUID {
  static UUID getService((DOMString or unsigned long) name);
  static UUID getCharacteristic((DOMString or unsigned long) name);
  static UUID getDescriptor((DOMString or unsigned long) name);

  static UUID canonicalUUID([EnforceRange] unsigned long alias);
};

typedef (DOMString or unsigned long) BluetoothServiceUUID;
typedef (DOMString or unsigned long) BluetoothCharacteristicUUID;
typedef (DOMString or unsigned long) BluetoothDescriptorUUID;

## Extensions to the Navigator Interface
[SecureContext]
partial interface Navigator {
  [SameObject]
  readonly attribute Bluetooth bluetooth;
};

## IDL Index

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

dictionary BluetoothPermissionDescriptor : PermissionDescriptor {
  DOMString deviceId;
  // These match RequestDeviceOptions.
  sequence<BluetoothLEScanFilterInit> filters;
  sequence<BluetoothServiceUUID> optionalServices = [];
  boolean acceptAllDevices = false;
};

dictionary AllowedBluetoothDevice {
  required DOMString deviceId;
  required boolean mayUseGATT;
  // An allowedServices of "all" means all services are allowed.
  required (DOMString or sequence<UUID>) allowedServices;
};
dictionary BluetoothPermissionStorage {
  required sequence<AllowedBluetoothDevice> allowedDevices;
};

[Exposed=Window]
interface BluetoothPermissionResult : PermissionStatus {
  attribute FrozenArray<BluetoothDevice> devices;
};

[
  Exposed=Window,
  SecureContext
]
interface ValueEvent : Event {
  constructor(DOMString type, optional ValueEventInit initDict = {});
  readonly attribute any value;
};

dictionary ValueEventInit : EventInit {
  any value = null;
};

[Exposed=Window, SecureContext]
interface BluetoothDevice : EventTarget {
  readonly attribute DOMString id;
  readonly attribute DOMString? name;
  readonly attribute BluetoothRemoteGATTServer? gatt;

  Promise<void> watchAdvertisements(
      optional WatchAdvertisementsOptions options = {});
  readonly attribute boolean watchingAdvertisements;
};
BluetoothDevice includes BluetoothDeviceEventHandlers;
BluetoothDevice includes CharacteristicEventHandlers;
BluetoothDevice includes ServiceEventHandlers;

dictionary WatchAdvertisementsOptions {
  AbortSignal signal;
};

[Exposed=Window, SecureContext]
interface BluetoothManufacturerDataMap {
  readonly maplike<unsigned short, DataView>;
};
[Exposed=Window, SecureContext]
interface BluetoothServiceDataMap {
  readonly maplike<UUID, DataView>;
};
[
  Exposed=Window,
  SecureContext
]
interface BluetoothAdvertisingEvent : Event {
  constructor(DOMString type, BluetoothAdvertisingEventInit init);
  [SameObject]
  readonly attribute BluetoothDevice device;
  readonly attribute FrozenArray<UUID> uuids;
  readonly attribute DOMString? name;
  readonly attribute unsigned short? appearance;
  readonly attribute byte? txPower;
  readonly attribute byte? rssi;
  [SameObject]
  readonly attribute BluetoothManufacturerDataMap manufacturerData;
  [SameObject]
  readonly attribute BluetoothServiceDataMap serviceData;
};
dictionary BluetoothAdvertisingEventInit : EventInit {
  required BluetoothDevice device;
  sequence<(DOMString or unsigned long)> uuids;
  DOMString name;
  unsigned short appearance;
  byte txPower;
  byte rssi;
  BluetoothManufacturerDataMap manufacturerData;
  BluetoothServiceDataMap serviceData;
};

[Exposed=Window, SecureContext]
interface BluetoothRemoteGATTServer {
  [SameObject]
  readonly attribute BluetoothDevice device;
  readonly attribute boolean connected;
  Promise<BluetoothRemoteGATTServer> connect();
  void disconnect();
  Promise<BluetoothRemoteGATTService> getPrimaryService(BluetoothServiceUUID service);
  Promise<sequence<BluetoothRemoteGATTService>>
    getPrimaryServices(optional BluetoothServiceUUID service);
};

[Exposed=Window, SecureContext]
interface BluetoothRemoteGATTService : EventTarget {
  [SameObject]
  readonly attribute BluetoothDevice device;
  readonly attribute UUID uuid;
  readonly attribute boolean isPrimary;
  Promise<BluetoothRemoteGATTCharacteristic>
    getCharacteristic(BluetoothCharacteristicUUID characteristic);
  Promise<sequence<BluetoothRemoteGATTCharacteristic>>
    getCharacteristics(optional BluetoothCharacteristicUUID characteristic);
  Promise<BluetoothRemoteGATTService>
    getIncludedService(BluetoothServiceUUID service);
  Promise<sequence<BluetoothRemoteGATTService>>
    getIncludedServices(optional BluetoothServiceUUID service);
};
BluetoothRemoteGATTService includes CharacteristicEventHandlers;
BluetoothRemoteGATTService includes ServiceEventHandlers;

[Exposed=Window, SecureContext]
interface BluetoothRemoteGATTCharacteristic : EventTarget {
  [SameObject]
  readonly attribute BluetoothRemoteGATTService service;
  readonly attribute UUID uuid;
  readonly attribute BluetoothCharacteristicProperties properties;
  readonly attribute DataView? value;
  Promise<BluetoothRemoteGATTDescriptor> getDescriptor(BluetoothDescriptorUUID descriptor);
  Promise<sequence<BluetoothRemoteGATTDescriptor>>
    getDescriptors(optional BluetoothDescriptorUUID descriptor);
  Promise<DataView> readValue();
  Promise<void> writeValue(BufferSource value);
  Promise<void> writeValueWithResponse(BufferSource value);
  Promise<void> writeValueWithoutResponse(BufferSource value);
  Promise<BluetoothRemoteGATTCharacteristic> startNotifications();
  Promise<BluetoothRemoteGATTCharacteristic> stopNotifications();
};
BluetoothRemoteGATTCharacteristic includes CharacteristicEventHandlers;

[Exposed=Window, SecureContext]
interface BluetoothCharacteristicProperties {
  readonly attribute boolean broadcast;
  readonly attribute boolean read;
  readonly attribute boolean writeWithoutResponse;
  readonly attribute boolean write;
  readonly attribute boolean notify;
  readonly attribute boolean indicate;
  readonly attribute boolean authenticatedSignedWrites;
  readonly attribute boolean reliableWrite;
  readonly attribute boolean writableAuxiliaries;
};

[Exposed=Window, SecureContext]
interface BluetoothRemoteGATTDescriptor {
  [SameObject]
  readonly attribute BluetoothRemoteGATTCharacteristic characteristic;
  readonly attribute UUID uuid;
  readonly attribute DataView? value;
  Promise<DataView> readValue();
  Promise<void> writeValue(BufferSource value);
};

[SecureContext]
interface mixin CharacteristicEventHandlers {
  attribute EventHandler oncharacteristicvaluechanged;
};

[SecureContext]
interface mixin BluetoothDeviceEventHandlers {
  attribute EventHandler onadvertisementreceived;
  attribute EventHandler ongattserverdisconnected;
};

[SecureContext]
interface mixin ServiceEventHandlers {
  attribute EventHandler onserviceadded;
  attribute EventHandler onservicechanged;
  attribute EventHandler onserviceremoved;
};

typedef DOMString UUID;

[Exposed=Window]
interface BluetoothUUID {
  static UUID getService((DOMString or unsigned long) name);
  static UUID getCharacteristic((DOMString or unsigned long) name);
  static UUID getDescriptor((DOMString or unsigned long) name);

  static UUID canonicalUUID([EnforceRange] unsigned long alias);
};

typedef (DOMString or unsigned long) BluetoothServiceUUID;
typedef (DOMString or unsigned long) BluetoothCharacteristicUUID;
typedef (DOMString or unsigned long) BluetoothDescriptorUUID;

[SecureContext]
partial interface Navigator {
  [SameObject]
  readonly attribute Bluetooth bluetooth;
};
