Following conent is copied from https://webbluetoothcg.github.io/web-bluetooth/scanning.html
all rights are at w3c

This is for the Boradcast concept with an observer ( example smartphone and beacon )

To discover what iBeacons are nearby and measure their distance, a website could use code like the following:

function recordNearbyBeacon(major, minor, pathLossVs1m) { ... }
navigator.bluetooth.requestLEScan({
  filters: [{manufacturerData: {0x004C: {dataPrefix: new Uint8Array([
    0x02, 0x15, // iBeacon identifier.
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15  // My beacon UUID.
  ])}}}],
  keepRepeatedDevices: true
}).then(() => {
  navigator.bluetooth.addEventListener('advertisementreceived', event => {
    let appleData = event.manufacturerData.get(0x004C);
    if (appleData.byteLength != 23) {
      // Isn’t an iBeacon.
      return;
    }
    let major = appleData.getUint16(18, false);
    let minor = appleData.getUint16(20, false);
    let txPowerAt1m = -appleData.getInt8(22);
    let pathLossVs1m = txPowerAt1m - event.rssi;

    recordNearbyBeacon(major, minor, pathLossVs1m);
  });
})

## Scanning for BLE Advertisments:

dictionary BluetoothLEScanOptions {
  sequence<BluetoothLEScanFilterInit> filters;
  boolean keepRepeatedDevices = false;
  boolean acceptAllAdvertisements = false;
};

partial interface Bluetooth {
  [SecureContext]
  Promise<BluetoothLEScan> requestLEScan(optional BluetoothLEScanOptions options);
};
NOTE: requestLEScan() SUMMARY
navigator.bluetooth.requestLEScan(options) starts scanning for BLE advertisements, asking the user for permission if they haven’t yet granted it.

Because this could show a prompt, it requires a secure context. Additionally, UAs are likely to require a transient user activation on its relevant global object when requestLEScan is called.

Advertising events that match a BluetoothLEScanFilter in an active BluetoothLEScan cause advertisementreceived events to be dispatched to the sending BluetoothDevice. A filter matches if the advertisement includes data equal to each present member. Usually, you’ll only include one member in each filter.

Normally scans will discard the second and subsequent advertisements from a single device to save power. If you need to receive them, set keepRepeatedDevices to true. Note that setting keepRepeatedDevices to false doesn’t guarantee you won’t get redundant events; it just allows the UA to save power by omitting them.

In the rare case that you want to receive every advertisement without filtering them, use the acceptAllAdvertisements field.

## Controll and stop Scan:

interface BluetoothDataFilter {
  constructor(optional BluetoothDataFilterInit init);
  readonly attribute ArrayBuffer dataPrefix;
  readonly attribute ArrayBuffer mask;
};

interface BluetoothManufacturerDataFilter {
  constructor(optional object init);
  readonly maplike<unsigned short, BluetoothDataFilter>;
};

interface BluetoothServiceDataFilter {
  constructor(optional object init);
  readonly maplike<UUID, BluetoothDataFilter>;
};

interface BluetoothLEScanFilter {
  constructor(optional BluetoothLEScanFilterInit init);
  readonly attribute DOMString? name;
  readonly attribute DOMString? namePrefix;
  readonly attribute FrozenArray<UUID>? services;
  readonly attribute BluetoothManufacturerDataFilter manufacturerData;
  readonly attribute BluetoothServiceDataFilter serviceData;
};

interface BluetoothLEScan {
  readonly attribute FrozenArray<BluetoothLEScanFilter> filters;
  readonly attribute boolean keepRepeatedDevices;
  readonly attribute boolean acceptAllAdvertisements;

  readonly attribute boolean active;

  void stop();
};
NOTE: BluetoothLEScan MEMBERS
BluetoothLEScan.stop() stops a previously-requested scan. Sites should do this as soon as possible to avoid wasting power.

## Permisssion to scan :
dictionary BluetoothLEScanPermissionDescriptor : PermissionDescriptor {
  // These match BluetoothLEScanOptions.
  sequence<BluetoothLEScanFilterInit> filters;
  boolean keepRepeatedDevices = false;
  boolean acceptAllAdvertisements = false;
};

reulst type:
interface BluetoothLEScanPermissionResult : PermissionStatus {
  attribute FrozenArray<BluetoothLEScan> scans;
};

## Event Handling

Responding to advertising events
When the UA receives an advertising event event (consisting of an advertising packet and an optional scan response), it MUST run the following steps:

Let device be the Bluetooth device that sent the advertising event.
For each Bluetooth instance bluetooth in the UA, queue a task on bluetooth’s relevant settings object’s responsible event loop to do the following sub-steps:
Let scans be the set of BluetoothLEScans in bluetooth.[[activeScans]] that match event.
If scans is empty, abort these sub-steps.
Note: the user’s permission to scan likely indicates that they intend newly-discovered devices to appear in "bluetooth"'s extra permission data, but possibly with mayUseGATT set to false.
Get the BluetoothDevice representing device inside bluetooth, and let deviceObj be the result.
Add each BluetoothLEScan in scans to deviceObj.[[returnedFromScans]].
Fire an advertisementreceived event for event at deviceObj.
An advertising event event matches a BluetoothLEScan scan if the following steps return match:

scan.acceptAllAdvertisements is false and event doesn’t match any filter in scan.filters, return no match.
If scan.keepRepeatedDevices is false, there is a BluetoothDevice device that represents the same Bluetooth device as the one that sent event, and device.[[returnedFromScans]] includes scan, the UA MAY return no match.
Return match.
An advertising event event matches a BluetoothLEScanFilter filter if all of the following conditions hold:

If filter.name is non-null, event has a Local Name equal to filter.name.
Note: A Shortened Local Name can match a name filter.

If filter.namePrefix is non-null, event has a Local Name, and filter.namePrefix is a prefix of it.
For each uuid in filter.services, some Service UUID in event is equal to uuid.
For each (id, filter) in filter.manufacturerData’s map entries, some Manufacturer Specific Data in event has a Company Identifier Code of id, and whose array of bytes matches filter.
For each (uuid, filter) in filter.serviceData’s map entries, some Service Data in event has a UUID whose 128-bit representation is uuid, and whose array of bytes matches filter.
