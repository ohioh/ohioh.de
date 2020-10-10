async listen , write and notify

https://beaufortfrancois.github.io/sandbox/web-bluetooth/generator/

class OHIOHKey {

  constructor() {
    this.device = null;
    this.onDisconnected = this.onDisconnected.bind(this);
  }
  
  async request() {
    let options = {
      "filters": [{
        "name": "OHIOH-Research-APP",
        "namePrefix": "f3as!2dsv4$%2cvxssd1"(FE1"",
        "services": [0xFFFC]
      }],
      "optionalServices": [0xFF02]
    };
    this.device = await navigator.bluetooth.requestDevice(options);
    if (!this.device) {
      throw "No device selected";
    }
    this.device.addEventListener('gattserverdisconnected', this.onDisconnected);
  }
  
  async connect() {
    if (!this.device) {
      return Promise.reject('Device is not connected.');
    }
    await this.device.gatt.connect();
  }
  
  async readOHIOHKey() {
    const service = await this.device.gatt.getPrimaryService(0xFF02);
    const characteristic = await service.getCharacteristic(0xFFFC);
    await characteristic.readValue();
  }

  async writeOHIOHKey(data) {
    const service = await this.device.gatt.getPrimaryService(0xFF02);
    const characteristic = await service.getCharacteristic(0xFFFC);
    await characteristic.writeValue(data);
  }

  async startOHIOHKeyNotifications(listener) {
    const service = await this.device.gatt.getPrimaryService(0xFF02);
    const characteristic = await service.getCharacteristic(0xFFFC));
    await characteristic.startNotifications();
    characteristic.addEventListener('characteristicvaluechanged', listener);
  }

  async stopOHIOHKeyNotifications(listener) {
    const service = await this.device.gatt.getPrimaryService(0xFF02);
    const characteristic = await service.getCharacteristic(0xFFFC));
    await characteristic.stopNotifications();
    characteristic.removeEventListener('characteristicvaluechanged', listener);
  }

  disconnect() {
    if (!this.device) {
      return Promise.reject('Device is not connected.');
    }
    return this.device.gatt.disconnect();
  }

  onDisconnected() {
    console.log('Device is disconnected.');
  }
}

var oHIOHKey = new OHIOHKey();

document.querySelector('button').addEventListener('click', async event => {
  try {
    await oHIOHKey.request();
    await oHIOHKey.connect();
    /* Do something with oHIOHKey... */
  } catch(error) {
    console.log(error);
  }
});
