links:
Range: 2402-2480 MHZ
Broadcast<->Observer ;  Peripheral <-> Central (Periodic advertising  mode)
GAP-  Generic Access Profile
AFH: Adaptive Frequeny Hopping
intervalls: 20ms  - 10.24s 

Advertising Data:
DeviceName;Transmit Power;ServiceUUID ....

Channels:

Some of the notable differences include:
- Bluetooth Classic: used for streaming applications such as audio streaming and file transfers.
- BLE: used for sensor data, control of devices, and low-bandwidth applications.

- BLE: low power, low duty data cycles.
- Bluetooth Classic: not optimized for low power, has a higher data rate.

- BLE: Operates over 40 RF (Radio Frequency) channels.
- Bluetooth Classic: Operates over 79 RF channels.

- BLE: connections are much quicker (discovery occurs on 3 channels)
- Bluetooth Classic: discovery on 32 channels, leading to slower connections 

The Physical Layer (PHY) refers to the physical radio used for communication and for modulating/demodulating the data. It operates in the ISM band (2.4 GHz spectrum).
The Link Layer is the layer that interfaces with the Physical Layer (Radio) and provides the higher levels an abstraction and a way to interact with the radio (through an intermediary level called the HCI layer which we’ll discuss shortly). It is responsible for managing the state of the radio as well as the timing requirements for adhering to the Bluetooth Low Energy specification.
Direct Test Mode: the purpose of this mode is to test the operation of the radio at the physical level (such as transmission power, receiver sensitivity, etc.).
The Host Controller Interface (HCI) layer is a standard protocol defined by the Bluetooth specification that allows the Host layer to communicate with the Controller layer. These layers could exist on separate chips, or they could exist on the same chip.
The Logical Link Control and Adaptation Protocol (L2CAP) layer acts as a protocol multiplexing layer. It takes multiple protocols from the upper layers and places them in standard BLE packets that are passed down to the lower layers beneath it.



So, what is GAP anyway?
GAP stands for Generic Access Profile. It provides a framework that defines how BLE devices interact with each other. This includes:
Roles of BLE devices
Advertisements (Broadcasting, Discovery, Advertisement parameters, Advertisement data)
Connection establishment (initiating connections, accepting connections, Connection parameters)
Security
The different roles of a BLE device are:
Broadcaster: a device that sends out Advertisements and does not receive packets or allow Connections from others.
Observer: a device that listens to others sending out Advertising Packets, but does not initiate a Connection with the Advertising device.
Central: a device that discovers and listens to other devices that are Advertising. A Central also has the capability of connecting to an Advertising device.
Peripheral: a device that Advertises and accepts Connections from Central devices.


Connection Events

During a Connection Event, the Master and Slave alternate sending data packets to each other until neither side has data to send. Here are a few aspects of Connections that are very important  to know:

A Connection Event contains at least one packet sent by the Master. 
The Slave always sends a packet back if it received a packet from the Master. 
If the Master does not receive a packet back from the Slave, the Master will close the Connection Event — it resumes sending packets at the next Connection Event.
The Connection Event can be closed by either side. 
The starting points of consecutive Connection Events are spaced by a period of time called the Connection Interval.
Connection parameters

The most important parameters that define a Connection include:
Connection Interval: the interval at which two connected BLE devices wake up the radio and exchange data (at each Connection Event). 
Slave Latency: this value allows the Peripheral to skip a number of consecutive Connection Events and not listen to the Central at these Connection Events without compromising the Connection. For example, a Slave Latency of 3 allows a Slave to skip 3 Connection Events and a value of 0 means that the Slave has to send data to the Master at every Connection Event. 
Supervision Timeout: the maximum time between two received data packets before the Connection is considered lost. 
Today we covered a lot of material! However, Connections 

Which brings us to the concept of GATT... so what in the world is GATT?!

The Generic Attribute Profile (GATT) defines the format of the data exposed by a BLE device. It also defines the procedures needed to access the data exposed by a device.

There are two Roles within GATT: Server and Client. The Server is the device that exposes the data it controls or contains, and possibly some other aspects of its behavior that other devices may be able to control. A Client, on the other hand, is the device that interfaces with the Server with the purpose of reading the Server’s exposed data and/or controlling the Server’s behavior.

Keep in mind that a BLE device can act as the Server and a Client at the same time. Simply put, it acts as the Server for the sake of exposing its own data, and as a Client when accessing another device's data.

Services and Characteristics

Services and Characteristics are probably the two most used terms in BLE! That's why understanding them is crucial, especially for BLE devices that establish a connection with each other.

...but that doesn't mean they have to be complicated.

On the contrary, they are very simple and easy to understand!

To better understand GATT, we need to cover a few important concepts (including Services and Characteristics):
Attributes: a generic term for any type of data exposed by the Server and defines the structure of this data. For example, Services and Characteristics (both defined below) are types of Attributes.
​
Services: a grouping of one or more Attributes (some of which are Characteristics). It’s meant to group together related Attributes that satisfy a specific functionality on the Server. For example, the SIG-adopted Battery Service contains one Characteristic called the Battery Level.
 
Characteristics: a Characteristic is always part of a Service and it represents a piece of information/data that a Server wants to expose to a client. For example, the Battery Level Characteristic represents the remaining power level of a battery in a device which can be read by a Client.
 
Profiles: Profiles are much broader in definition from Services. They are concerned with defining the behavior of both the Client and Server when it comes to Services, Characteristics and even Connections and security requirements. Services and their specifications, on the other hand, deal with the implementation of these Services and Characteristics on the Server side only.

A simplified representation of a Service:

Service------|
          ---Characteristic 1
          ---Characteristic 2
          .....
          ---Characteristic N
           -------|
           
In BLE, there are six types of operations on Characteristics:
Commands: sent by the Client to the Server and do not require a Response (defined below). One example of a Command is a Write Command, which does not require a Response from the Server.
Requests: sent by the Client to the Server and require a Response. Some examples of Requests include: Read Requests and Write Requests.
Responses: sent by the Server in response to a Request.
Notifications: sent by the Server to the Client to let the Client know that a specific Characteristic Value has changed. In order for this to be triggered and sent by the Server, the Client has to enable Notifications for the Characteristic of interest. Note that a Notification does not require a Response from the Client to acknowledge its receipt.
Indications: sent by the Server to the Client. They are very similar to Notifications but require an acknowledgment to be sent back from the Client to let the Server know that the Indication was successfully received.
Note: Notifications and Indications are exposed via the Client Characteristic Configuration Descriptor (CCCD) Attribute. Writing a “1” to this Attribute value enables Notifications, whereas writing a “2” enables Indications. Writing a “0” disables both Notifications and Indications.
Confirmations: sent by the Client to the Server. These are the acknowledgment packets sent back to the Server to let it know that the Client received an Indication successfully.
