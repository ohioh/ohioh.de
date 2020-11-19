import UIKit
import CoreBluetooth

class DeviceListViewController : UITableViewController, ScanResultsConsumer {

    var adapter: BLEAdapter!
    var utils: Utils!
    var devices :NSMutableArray = []
    var scan_timer = Timer()

    override func viewDidLoad() {
        super.viewDidLoad()
        adapter = BLEAdapter.sharedInstance
        adapter.initBluetooth(self)
        utils = Utils.sharedInstance
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
        
        if (adapter.scanning == true) {
            print("stopping scanning")
            adapter.stopScanning()
            scan_timer.invalidate()
        }
        
        if let index = tableView.indexPathForSelectedRow?.row {
            let selected_device = devices[index] as! Device
            adapter.selected_peripheral = selected_device.peripheral
        }
    }

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return devices.count
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "DeviceTableViewCell", for: indexPath) as! DeviceTableViewCell
        let device = devices.object(at: indexPath.row) as! Device
        cell.deviceName.text = device.deviceName
        cell.deviceAddress.text = device.deviceAddress.uuidString
        return cell
    }
    
    // MARK: actions
    
    @IBAction func onScan(_ sender: UIBarButtonItem) {
        if (adapter.scanning == true) {
            print("Already scanning - ignoring")
            return
        }
        if (adapter.powered_on == false) {
            utils.info(message : "Bluetooth is not available yet - is it switched on?",
                       ui : self,
                       cbOK: {
                        print("OK callback")
            })
            return
        }
        if(adapter.scanning == false) {
            adapter.scanning = true
            print("Will start scanning shortly")
            devices.removeAllObjects()
            self.tableView.reloadData()
            
            // scan for 10 seconds
            let rc = adapter.findDevices(10,"BDSK", self)
            
            if (rc == -1) {
                utils.info(message : "Bluetooth is not available - is it switched on?",
                           ui : self,
                           cbOK: {
                            print("OK callback")
                })
            } else {
                print("Setting up timer for when scanning is finished")
                scan_timer = Timer.scheduledTimer(
                    timeInterval: 10.0,
                    target: self,
                    selector: #selector(DeviceListViewController.scanningFinished(_:)),
                    userInfo: nil,
                    repeats: false)
            }
        }
        
    }
    
    @objc func scanningFinished(_ timer: Timer)
    {
        print("Finished scanning")
        adapter.scanning = false
        if(adapter.peripherals.count > 0)
        {
            let msg = "Finished scanning - found " + String(adapter.peripherals.count) + " devices"
            utils.info(message : msg, ui : self,
                       cbOK: {
                        print("OK callback")
            })
        } else {
            let msg = "No devices were found"
            utils.info(message : msg, ui : self,
                       cbOK: {
                        print("OK callback")
            })
        }
    }
    
    func onDeviceDiscovered(_ peripheral: CBPeripheral) {
        var device_name = "BDSK on " + peripheral.name!
        let device = Device(peripheral: peripheral, deviceAddress: peripheral.identifier, deviceName: device_name)
        devices.insert(device, at: 0)
        let indexPath = IndexPath(row: 0, section: 0)
        var indexesPath:[IndexPath] = [IndexPath]()
        indexesPath.append(indexPath)
        self.tableView.insertRows(at: indexesPath, with: UITableViewRowAnimation.automatic)
    }

}
