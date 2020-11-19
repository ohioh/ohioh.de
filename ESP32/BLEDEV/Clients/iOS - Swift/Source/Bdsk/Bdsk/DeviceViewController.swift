//
//  DeviceViewController.swift
//  BdskTest3
//
//  Created by Martin Woolley on 15/12/2016.
//  Copyright © 2016 Bluetooth SIG. All rights reserved.
//

import UIKit

class DeviceViewController: UIViewController, BluetoothOperationsConsumer {

    var adapter: BLEAdapter!
    var utils: Utils!
    var alarm: AlarmManager!
    var got_ll_alert_level: Bool?
    var got_ia_alert_level: Bool?
    var got_pm_client_proximity: Bool?
    var got_ht_temperature_measurement: Bool?
    var ll_alert_level: UInt8?
    let default_btn_colour = UIColor(red: 247.0/255.0, green: 249.0/255.0, blue: 249.0/255.0, alpha: 1.0)
    var new_ll_alert_level: UInt8?
    var sharing: Bool?
    var monitoring_temperature: Bool?

    @IBOutlet weak var device_details: UILabel!
    @IBOutlet weak var rssi: UILabel!
    @IBOutlet weak var proximity_classification: UIView!
    @IBOutlet weak var btn_low: UIButton!
    @IBOutlet weak var btn_medium: UIButton!
    @IBOutlet weak var btn_high: UIButton!
    @IBOutlet weak var switch_share: UISwitch!
    @IBOutlet weak var switch_temperature: UISwitch!
    @IBOutlet weak var temperature: UILabel!
    
    @IBOutlet weak var status: UILabel!
    @IBOutlet weak var btn_noise: UIButton!
    @IBOutlet weak var btn_connect: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        adapter = BLEAdapter.sharedInstance
        utils = Utils.sharedInstance
        alarm = AlarmManager.sharedInstance
        device_details.text = "Device: BDSK [" + adapter.selected_peripheral!.identifier.uuidString + "]"
        btn_low.isEnabled = false
        btn_medium.isEnabled = false
        btn_high.isEnabled = false
        btn_noise.isEnabled = false
        switch_share.isEnabled = false
        switch_temperature.isEnabled = false
        got_ia_alert_level = false
        got_ll_alert_level = false
        got_pm_client_proximity = false
        got_ht_temperature_measurement = false
        sharing = false
        monitoring_temperature = false
        ll_alert_level = 0
    }

    override func viewWillDisappear(_ animated : Bool) {
        super.viewWillDisappear(animated)
        
        if self.isMovingFromParent {
            if (adapter.connected == true) {
                print("disconnecting")
                adapter.disconnect(self)
            }
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func updateProximityClassification(_ rssi_value: NSNumber) {
        
        var proximity_band = 3;
        rssi.text = "RSSI: \(rssi_value.floatValue.description) dBm"
        if (rssi_value.floatValue < -80.0) {
            proximity_classification.backgroundColor = UIColor.red
        } else if (rssi_value.floatValue < -50.0) {
            proximity_classification.backgroundColor = UIColor.yellow
            proximity_band = 2;
        } else {
            proximity_classification.backgroundColor = UIColor.green
            proximity_band = 1;
        }
        if (sharing!) {
            adapter.setClientProximity(proximity_band: UInt8(proximity_band), rssi: UInt8(rssi_value))
        }
    }

    @IBAction func onLow(_ sender: UIButton) {
        print("onLow")
        self.new_ll_alert_level = UInt8(0)
        adapter.setLlAlertLevel(alert_level: new_ll_alert_level!)
    }
    
    @IBAction func onMedium(_ sender: UIButton) {
        print("onMedium")
        self.new_ll_alert_level = UInt8(1)
        adapter.setLlAlertLevel(alert_level: new_ll_alert_level!)
    }
    
    @IBAction func onHigh(_ sender: UIButton) {
        print("onHigh")
        self.new_ll_alert_level = UInt8(2)
        adapter.setLlAlertLevel(alert_level: new_ll_alert_level!)
    }
    
    @IBAction func onShareChanged(_ sender: UISwitch) {
        print("onShareChanged \(sender.isOn)")
        sharing = sender.isOn
        if (!sharing!) {
            // tell BDSK device we're no longer sharing
            adapter.setClientProximity(proximity_band: UInt8(0), rssi: UInt8(0))
        }
    }
    
    @IBAction func onTemperatureMonitoringChanged(_ sender: UISwitch) {
        print("onTemperatureMonitoringChanged \(sender.isOn)")
        adapter.setTemperatureMonitoringIndications(state: sender.isOn)
        if (!sender.isOn) {
            temperature.text = "not available"
        }
    }
    
    @IBAction func onMakeNoise(_ sender: UIButton) {
        print("onMakeNoise")
        // yes this should be the ll_alert_level. We use the same values for link loss and immediate alert.
        adapter.setIaAlertLevel(alert_level: ll_alert_level!)
    }
    
    @IBAction func onConnect(_ sender: UIButton) {
        print("onConnect")
        if (adapter.connected == false) {
            adapter.connect(self)
        } else {
            adapter.disconnect(self)
        }
    }

    func onConnected() {
        print("onConnected")
        if (alarm.alarmIsSounding()) {
            alarm.stopAlarm()
        }
        btn_connect.setTitle("DISCONNECT", for: .normal)
        adapter.startPollingRssi(self)
        adapter.discoverServices()
    }
    
    func onFailedToConnect(_ error: Error?) {
        print("onFailedToConnect")
        utils.error(message : "Failed to connect:  \(error)",
            ui : self,
            cbOK: {
        })
    }
    
    func onDisconnected() {
        print("onDisconnected")
        btn_connect.setTitle("CONNECT", for: .normal)
        btn_low.isEnabled = false
        btn_medium.isEnabled = false
        btn_high.isEnabled = false
        btn_noise.isEnabled = false
        switch_share.isEnabled = false
        switch_temperature.isEnabled = false
        rssi.text = "RSSI: unavailable"
        proximity_classification.backgroundColor = UIColor.gray
        btn_low.backgroundColor = default_btn_colour
        btn_medium.backgroundColor = default_btn_colour
        btn_high.backgroundColor = default_btn_colour
        adapter.stopPollingRssi()
        if (Int8(ll_alert_level!) > 0) {
            alarm.soundAlarm()
        }
    }
    
    func onRssiValue(_ rssi: NSNumber) {
        print("Received RSSI value \(rssi)")
        updateProximityClassification(rssi)
    }
    
    func onServicesDiscovered() {
        print("onServicesDiscovered")
        adapter.discoverCharacteristics()
    }
    
    func setUiStateValidBdsk() {
        print("setUiStateValidBdsk")
        btn_low.isEnabled = true
        btn_medium.isEnabled = true
        btn_high.isEnabled = true
        btn_noise.isEnabled = true
        switch_share.isEnabled = true
        switch_temperature.isEnabled = true
    }
    
    func setUiStateInvalidBdsk() {
        print("setUiStateInvalidBdsk")
        btn_low.isEnabled = false
        btn_medium.isEnabled = false
        btn_high.isEnabled = false
        btn_noise.isEnabled = false
        switch_share.isEnabled = false
        switch_temperature.isEnabled = false
        utils.error(message : "Connected device does not have all the required Bluetooth services and characteristics",
                    ui : self,
                    cbOK: {
        })
    }
    
    func onIaAlertLevelDiscovered() {
        print("onIaAlertLevelDiscovered")
        got_ia_alert_level = true
    }
    
    func onLlAlertLevelDiscovered() {
        print("onLlAlertLevelDiscovered")
        got_ll_alert_level = true
    }
    
    func onPmClientProximityDiscovered() {
        print("onPmClientProximityDiscovered")
        got_pm_client_proximity = true
    }
    
    func onHtTemperatureMeasurementDiscovered() {
        print("onHtTemperatureMeasurementDiscovered")
        got_ht_temperature_measurement = true
    }
    
    func onDiscoveryFinished() {
        print("onDiscoveryFinished")
        if (got_ia_alert_level == false || got_ll_alert_level == false || got_pm_client_proximity == false || got_ht_temperature_measurement == false) {
            setUiStateInvalidBdsk()
        } else {
            setUiStateValidBdsk()
            adapter.getLlAlertLevel()
        }
    }

    func onLlAlertLevelRead(_ ll_alert_level: UInt8) {
        print("onLlAlertLevelRead \(ll_alert_level)")
        self.ll_alert_level = ll_alert_level
        let ll_al_int = Int8(bitPattern: ll_alert_level)
        switch ll_al_int {
        case 0:
            btn_low.backgroundColor = UIColor.green
            btn_medium.backgroundColor = default_btn_colour
            btn_high.backgroundColor = default_btn_colour
        case 1:
            btn_medium.backgroundColor = UIColor.yellow
            btn_low.backgroundColor = default_btn_colour
            btn_high.backgroundColor = default_btn_colour
        case 2:
            btn_high.backgroundColor = UIColor.red
            btn_medium.backgroundColor = default_btn_colour
            btn_low.backgroundColor = default_btn_colour
        default:
            btn_high.backgroundColor = default_btn_colour
            btn_medium.backgroundColor = default_btn_colour
            btn_low.backgroundColor = default_btn_colour
        }
    }
    
    func onLlAlertLevelWritten() {
        print("onLlAlertLevelWritten \(new_ll_alert_level)")
        ll_alert_level = new_ll_alert_level
        let ll_al_int = Int8(bitPattern: new_ll_alert_level!)
        switch ll_al_int {
        case 0:
            btn_low.backgroundColor = UIColor.green
            btn_medium.backgroundColor = default_btn_colour
            btn_high.backgroundColor = default_btn_colour
        case 1:
            btn_medium.backgroundColor = UIColor.yellow
            btn_low.backgroundColor = default_btn_colour
            btn_high.backgroundColor = default_btn_colour
        case 2:
            btn_high.backgroundColor = UIColor.red
            btn_medium.backgroundColor = default_btn_colour
            btn_low.backgroundColor = default_btn_colour
        default:
            btn_high.backgroundColor = default_btn_colour
            btn_medium.backgroundColor = default_btn_colour
            btn_low.backgroundColor = default_btn_colour
        }
    }
    
    func onTemperatureMeasurement(_ temperature_measurement: [UInt8]) {
        
        if (temperature_measurement.count != 5) {
            print("ERROR: onTemperatureMeasurement expected 5 bytes but received\(temperature_measurement.count)" )
            return
        }

        // 4 bytes required for Int32 conversion. Also, make big endian while we're at it.
        var mantissa_bytes: [UInt8] = [0x00, 0x00, 0x00 , 0x00]
        mantissa_bytes[1] = temperature_measurement[3]
        mantissa_bytes[2] = temperature_measurement[2]
        mantissa_bytes[3] = temperature_measurement[1]
        
        // propogate sign bit of most significant byte of the 3 mantissa bytes
        if (mantissa_bytes[1] & 0x80 == 0x80) {
            // sign bit is set so....
            mantissa_bytes[0] = 0xff
        }
        let data = Data(bytes: mantissa_bytes)
        let mantissa_value = Int32(bigEndian: data.withUnsafeBytes { $0.pointee })
        print("mantissa_value=\(mantissa_value)")

        
        let exponent = temperature_measurement[4]
        print("exponent=\(exponent)")
        
        let signed_exponent = Int8(bitPattern: UInt8(exponent))
        print("signed exponent=\(signed_exponent)")
        
        let p = pow(Double(10), Double(signed_exponent))
        
        let new_temperature = Double(mantissa_value) * p
        print("new_temperature=\(new_temperature)")
        
        temperature.text = "\(new_temperature)"
    }
    

}
