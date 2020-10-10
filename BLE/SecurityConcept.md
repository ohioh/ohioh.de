https://medium.com/@jyasskin/the-web-bluetooth-security-model-666b4e7eed2

2. Security and privacy considerations
2.1. Device access is powerful
When a website requests access to devices using requestDevice(), it gets the ability to access all GATT services mentioned in the call. The UA MUST inform the user what capabilities these services give the website before asking which devices to entrust to it. If any services in the list aren’t known to the UA, the UA MUST assume they give the site complete control over the device and inform the user of this risk. The UA MUST also allow the user to inspect what sites have access to what devices and revoke these pairings.

The UA MUST NOT allow the user to pair entire classes of devices with a website. It is possible to construct a class of devices for which each individual device sends the same Bluetooth-level identifying information. UAs are not required to attempt to detect this sort of forgery and MAY let a user pair this pseudo-device with a website.

To help ensure that only the entity the user approved for access actually has access, this specification requires that only secure contexts can access Bluetooth devices.

2.2. Trusted servers can serve malicious code
This section is non-normative.

Even if the user trusts an origin, that origin’s servers or developers could be compromised, or the origin’s site could be vulnerable to XSS attacks. Either could lead to users granting malicious code access to valuable devices. Origins should define a Content Security Policy ([CSP3]) to reduce the risk of XSS attacks, but this doesn’t help with compromised servers or developers.

The ability to retrieve granted devices after a page reload, provided by § 3.1 Permission API Integration, makes this risk worse. Instead of having to get the user to grant access while the site is compromised, the attacker can take advantage of previously-granted devices if the user simply visits while the site is compromised. On the other hand, when sites can keep access to devices across page reloads, they don’t have to show as many permission prompts overall, making it more likely that users will pay attention to the prompts they do see.

2.3. Attacks on devices
This section is non-normative.

Communication from websites can break the security model of some devices, which assume they only receive messages from the trusted operating system of a remote device. Human Interface Devices are a prominent example, where allowing a website to communicate would allow that site to log keystrokes. This specification includes a GATT blocklist of such vulnerable services, characteristics, and descriptors to prevent websites from taking advantage of them.

We expect that many devices are vulnerable to unexpected data delivered to their radio. In the past, these devices had to be exploited one-by-one, but this API makes it plausible to conduct large-scale attacks. This specification takes several approaches to make such attacks more difficult:

Pairing individual devices instead of device classes requires at least a user action before a device can be exploited.

Constraining access to GATT, as opposed to generic byte-stream access, denies malicious websites access to most parsers on the device.

On the other hand, GATT’s Characteristic and Descriptor values are still byte arrays, which may be set to lengths and formats the device doesn’t expect. UAs are encouraged to validate these values when they can.

This API never exposes Bluetooth addressing, data signing or encryption keys (Definition of Keys and Values) to websites. This makes it more difficult for a website to predict the bits that will be sent over the radio, which blocks packet-in-packet injection attacks. Unfortunately, this only works over encrypted links, which not all BLE devices are required to support.

UAs can also take further steps to protect their users:

A web service may collect lists of malicious websites and vulnerable devices. UAs can deny malicious websites access to any device and any website access to vulnerable devices.

2.4. Bluetooth device identifiers
This section is non-normative.

Each Bluetooth BR/EDR device has a unique 48-bit MAC address known as the BD_ADDR. Each Bluetooth LE device has at least one of a Public Device Address and a Static Device Address. The Public Device Address is a MAC address. The Static Device Address may be regenerated on each restart. A BR/EDR/LE device will use the same value for the BD_ADDR and the Public Device Address (specified in the Read BD_ADDR Command).

An LE device may also have a unique, 128-bit Identity Resolving Key, which is sent to trusted devices during the bonding process. To avoid leaking a persistent identifier, an LE device may scan and advertise using a random Resolvable or Non-Resolvable Private Address instead of its Static or Public Address. These are regenerated periodically (approximately every 15 minutes), but a bonded device can check whether one of its stored IRKs matches any given Resolvable Private Address using the Resolvable Private Address Resolution Procedure.

Each Bluetooth device also has a human-readable Bluetooth Device Name. These aren’t guaranteed to be unique, but may well be, depending on the device type.

2.4.1. Identifiers for remote Bluetooth devices
This section is non-normative.

If a website can retrieve any of the persistent device IDs, these can be used, in combination with a large effort to catalog ambient devices, to discover a user’s location. A device ID can also be used to identify that a user who pairs two different websites with the same Bluetooth device is a single user. On the other hand, many GATT services are available that could be used to fingerprint a device, and a device can easily expose a custom GATT service to make this easier.

This specification suggests that the UA use different device IDs for a single device when its user doesn’t intend scripts to learn that it’s a single device, which makes it difficult for websites to abuse the device address like this. Device makers can still design their devices to help track users, but it takes work.

2.4.2. The UA’s Bluetooth address
This section is non-normative.

In BR/EDR mode, or in LE mode during active scanning without the Privacy Feature, the UA broadcasts its persistent ID to any nearby Bluetooth radio. This makes it easy to scatter hostile devices in an area and track the UA. As of 2014-08, few or no platforms document that they implement the Privacy Feature, so despite this spec recommending it, few UAs are likely to use it. This spec does require a user gesture for a website to trigger a scan, which reduces the frequency of scans some, but it would still be better for more platforms to expose the Privacy Feature.

2.5. Exposing Bluetooth availability
This section is non-normative.

navigator.bluetooth.getAvailability() exposes whether a Bluetooth radio is available on the user’s system, regardless of whether it is powered on or not. The availability is also affected if the user has configured the UA to block Web Bluetooth. Some users might consider this private, although it’s hard to imagine the damage that would result from revealing it. This information also increases the UA’s fingerprinting surface by a bit. This function returns a Promise, so UAs have the option of asking the user what value they want to return, but we expect the increased risk to be small enough that UAs will choose not to prompt.
