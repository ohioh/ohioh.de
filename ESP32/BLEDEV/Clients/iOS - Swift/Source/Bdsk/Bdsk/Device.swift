import UIKit
import CoreBluetooth

class Device {
    
    // MARK: Properties
    
    var peripheral: CBPeripheral
    var deviceAddress: UUID
    var deviceName: String
    
    // MARK: Initialization
    
    init(peripheral: CBPeripheral, deviceAddress: UUID, deviceName: String?) {
        self.peripheral = peripheral
        self.deviceAddress = deviceAddress
        if let dn = deviceName {
            self.deviceName = dn
        } else {
            self.deviceName = "no name"
        }
    }
    
}
