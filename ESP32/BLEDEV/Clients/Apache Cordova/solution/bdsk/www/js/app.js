var found_my_device = false;
var connected = false;
var disconnect_requested = false;
var sharing = false;
var monitoring_temperature = false;
var odd = true;
var info_hidden = true;
var alert_level = 0;
var rssi;
var proximity_band = 3;
var connection_timer;
var rssi_timer;
var btn_low;
var btn_mid;
var btn_high;
var cb_sharing = false;
var cb_temperature = false;
var rectangle;
var alarm_sound_path = "sounds/alarm.wav";

var app = {};
var device_addresses = [];
var selected_device_address;

app.device = {};
app.device.ADV_NAME = 'BDSK'

app.device.IMMEDIATE_ALERT_SERVICE = '1802';
app.device.LINK_LOSS_SERVICE = '1803';
app.device.TX_POWER_SERVICE = '1804';
app.device.PROXIMITY_MONITORING_SERVICE = '3e099910-293f-11e4-93bd-afd0fe6d1dfd';
app.device.HEALTH_THERMOMETER_SERVICE = '1809';

app.device.ALERT_LEVEL_CHARACTERISTIC = '2a06';
app.device.TEMPERATURE_MEASUREMENT_CHARACTERISTIC = '2a1C';
app.device.CLIENT_PROXIMITY_CHARACTERISTIC = '3e099911-293f-11e4-93bd-afd0fe6d1dfd';

app.findDevices = function () {
    app.clearDeviceList();
    app.startScan();
}

app.startScan = function () {
    console.log("startScan");

    //TODO create onDeviceFound function
    function onDeviceFound(peripheral) {
        console.log("Found " + JSON.stringify(peripheral));
        if (app.isMyDevice(peripheral.name)) {
            found_my_device = true;
            app.showDiscoveredDevice(peripheral.id, peripheral.name);
        }
    }

    //TODO create scanFailure function
    function scanFailure(reason) {
        alert("Scan Failed: " + JSON.stringify(reason));
    }

    //TODO start scanning for devices for 5 seconds
    ble.scan([], 5, onDeviceFound, scanFailure);
    showMessage("Scanning....");

    //TODO check outcome of scanning after 5 seconds have elapsed using a timer
    setTimeout(function () {
        showMessage("");
        if (!found_my_device) {
            alert("Could not find your device");
        }
    }, 5000);
};

app.isMyDevice = function (device_name) {
    console.log("isMyDevice(" + device_name + ")");
    //TODO implement device name matching
    if (device_name == null || device_name == undefined) {
        return false;
    }
    console.log('device name: ' + device_name);
    return (device_name == app.device.ADV_NAME);
};

app.setAlertLevel = function (level) {
    console.log("setAlertLevel(" + level + ")");
    var alert_level_bytes = [0x00];
    alert_level_bytes[0] = level;
    var alert_level_data = new Uint8Array(alert_level_bytes)
    ble.write(
        selected_device_address,
        app.device.LINK_LOSS_SERVICE,
        app.device.ALERT_LEVEL_CHARACTERISTIC,
        alert_level_data.buffer,
        function () {
            console.log("written LL alert level OK");
            alert_level = level;
            app.setAlertLevelSelected();
        },
        function (e) {
            console.log("ERROR: writing LL alert level: " + e);
        });
};

app.stopIndications = function () {
    console.log("stopping indications");
    ble.stopNotification(
        selected_device_address,
        app.device.HEALTH_THERMOMETER_SERVICE,
        app.device.TEMPERATURE_MEASUREMENT_CHARACTERISTIC);
    document.getElementById('temperature').innerHTML = 'not available';
};

app.startIndications = function () {
    console.log('Starting indications');
    ble.startNotification(selected_device_address,
        app.device.HEALTH_THERMOMETER_SERVICE,
        app.device.TEMPERATURE_MEASUREMENT_CHARACTERISTIC,
        function (buffer) {
            monitoring_temperature = 1;
            var data = new Uint8Array(buffer);
            console.log("data="+data.toString());
            var signed_data = new Int8Array(buffer);
            var units = "C";
            if (data[0] == 1) {
                units = "F";
            }

            // 4 bytes required for Int32 conversion. Also, make big endian while we're at it.
            var mantissa_bytes = new Uint8Array([0x00,0x00,0x00,0x00]);
            mantissa_bytes[1] = data[3];
            mantissa_bytes[2] = data[2];
            mantissa_bytes[3] = data[1];
            // propogate sign bit of most significant byte of the 3 mantissa bytes
            if (mantissa_bytes[1] & 0x80 == 0x80) {
                // sign bit is set so....
                mantissa_bytes[0] = 0xff
            }

            // now convert to a standard signed int
            var mantissa = 0;
            for (var i = 0; i < 4; ++i) {        
                mantissa += mantissa_bytes[i];        
                if (i < 3) {
                    mantissa = mantissa << 8;
                }
            }            
            console.log("mantissa=" + mantissa);
            var exponent = signed_data[4];
            console.log("exponent=" + exponent);
            var temperature = (mantissa * Math.pow(10, exponent) * 10);
            temperature = Math.round(temperature) / 10;
            document.getElementById('temperature').innerHTML = temperature + units;
        },
        function (e) {
            console.log("Error handling indication:" + e);
            monitoring_temperature = 0;
        });
};

app.setTemperatureMonitoring = function () {
    console.log("setTemperatureMonitoring");
    monitoring_temperature = cb_temperature.checked;
    console.log("monitoring_temperature=" + monitoring_temperature);
    if (monitoring_temperature) {
        app.startIndications();
    } else {
        app.stopIndications();
    }
};

app.setSharing = function () {
    console.log("setSharing");
    sharing = cb_sharing.checked;
    console.log("sharing=" + sharing);
    if (!sharing) {
        // this will clear the Arduino LCD of proximity info and switch off all LEDs
        app.shareProximityData(0, 0);
    }
};

app.makeNoise = function () {
    console.log("makeNoise");
    var alert_level_bytes = [0x00];
    alert_level_bytes[0] = alert_level;
    var alert_level_data = new Uint8Array(alert_level_bytes)
    ble.writeWithoutResponse(
        selected_device_address,
        app.device.IMMEDIATE_ALERT_SERVICE,
        app.device.ALERT_LEVEL_CHARACTERISTIC,
        alert_level_data.buffer,
        function () {
            console.log("written IA alert level OK");
        },
        function (e) {
            console.log("ERROR: writing IA alert level: " + e);
        });
};

app.shareProximityData = function (proximity_band, rssi) {
    console.log("shareProximityData(" + proximity_band + "," + rssi + ")");
    var proximity_bytes = [0x00, 0x00];
    proximity_bytes[0] = proximity_band;
    proximity_bytes[1] = rssi;
    var proximity_data = new Uint8Array(proximity_bytes)
    ble.writeWithoutResponse(
        selected_device_address,
        app.device.PROXIMITY_MONITORING_SERVICE,
        app.device.CLIENT_PROXIMITY_CHARACTERISTIC,
        proximity_data.buffer,
        function () {
            console.log("written client proximity OK");
        },
        function (e) {
            console.log("ERROR: writing client proximity: " + e);
        });
};

app.startRssiPolling = function () {
    console.log("startRssiPolling");
    if (connected) {
        rssi_timer = setInterval(
            function () {
                if (connected) {
                    ble.readRSSI(selected_device_address,
                        function (rssi) {
                            document.getElementById("rssi").innerHTML = "RSSI = " + rssi;
                            proximity_band = 3;
                            var rssi_value = parseInt(rssi);
                            if (rssi_value < -80) {
                                rectangle.style.backgroundColor = "#FF0000";
                            } else if (rssi_value < -50) {
                                rectangle.style.backgroundColor = "#FF8A01";
                                proximity_band = 2;
                            } else {
                                rectangle.style.backgroundColor = "#00FF00";
                                proximity_band = 1;
                            }
                            if (sharing) {
                                app.shareProximityData(proximity_band, rssi_value);
                            }
                        },
                        function (err) {
                            console.log('Error: unable to read RSSI', err);
                            showInfo("Error: unable to read RSSI", 2);
                            clearInterval(rssi_timer);
                        })
                }
            },
            1000);
    }
};

app.stopRssiPolling = function () {
    clearTimeout(rssi_timer);
};

app.toggleConnectionState = function () {
    console.log("toggleConnectionState(" + selected_device_address + ") : connected=" + connected);
    if (!connected) {
        app.connectToDevice(selected_device_address);
    } else {
        console.log("disconnecting");
        clearInterval(rssi_timer);
        document.getElementById("rssi").innerHTML = "&nbsp;";
        if (monitoring_temperature == 1) {
            app.stopIndications();
        } 
        ble.disconnect(
            selected_device_address,
            function () {
                console.log("toggleConnectionState: disconnected OK");
                showInfo("Disconnected");
                connected = false;
                app.setControlsDisconnectedState();
            },
            function (error) {
                console.log("toggleConnectionState: disconnect failed: " + error);
                alert("Failed to disconnect");
                showInfo("Error: Failed to disconnect", 2);
            });
    }
};

app.connectToDevice = function (device_address) {
    console.log('connectToDevice: Connecting to ' + device_address);
    //TODO connect to the BDSK device and handle failures to connect and unexpected disconnections
    function onConnected(peripheral) {
        console.log('connectToDevice: onConnected');
        connected = true;
        audio.stop();
        // this will clear the peripheral LCD / console of proximity info and switch off all LEDs
        app.shareProximityData(0, 0);
        app.startRssiPolling();
        // check we have the required services
        if (app.hasService(peripheral, app.device.IMMEDIATE_ALERT_SERVICE)
            && app.hasService(peripheral, app.device.LINK_LOSS_SERVICE)
            && app.hasService(peripheral, app.device.PROXIMITY_MONITORING_SERVICE)
            && app.hasService(peripheral, app.device.HEALTH_THERMOMETER_SERVICE)
        ) {
            app.setControlsConnectedState();
            app.establishCurrentAlertLevel();
            showInfo("connected", 0);
        } else {
            showInfo("ERROR: missing required GATT services", 2);
            ble.disconnect(
                selected_device_address,
                function () {
                    console.log("connectToDevice: disconnected OK");
                    showInfo("Disconnected");
                },
                function (error) {
                    console.log("connectToDevice: disconnect failed: " + error);
                    alert("Error: Failed to disconnect");
                    showInfo("Error: Failed to disconnect", 2);
                });
        }
    }
    function onDisconnected(peripheral) {
        console.log('connectToDevice: onDisconnected');
        // called if ble.connect fails OR if an established connection drops
        if (!connected) {
            // we tried to connect and failed
            console.log('connectToDevice: Error: Connection failed');
            console.log(JSON.stringify(peripheral));
            showInfo("Error: not connected", 2);
            alert("Error: could not connect to selected device");
        } else {
            // we were already connected and disconnection was unexpected
            showInfo("Error: unexpectedly disconnected", 2);
            audio.play(alarm_sound_path);
            setTimeout(function () {
                audio.stop();
            }, 10000);
        }
        connected = false;
        app.setControlsDisconnectedState();
    }
    console.log("Attempting to connect to " + device_address);
    ble.connect(device_address, onConnected, onDisconnected);

};

app.establishCurrentAlertLevel = function () {
    console.log("establishCurrentAlertLevel");
    ble.read(selected_device_address, app.device.LINK_LOSS_SERVICE, app.device.ALERT_LEVEL_CHARACTERISTIC,
        function (data) {
            console.log("read current link loss alert level OK");
            var alert_level_data = new Uint8Array(data);
            if (alert_level_data.length > 0) {
                console.log("alert_level=" + alert_level_data[0]);
                alert_level = alert_level_data[0];
                app.setAlertLevelSelected();
            }
        },
        function (err) {
            console.log("ERROR: reading current alert level: " + err);
        });
};

app.exitMain = function () {
    if (connected) {
        if (monitoring_temperature == 1) {
            app.stopIndications();
        }
        showInfo("Disconnecting");
        ble.disconnect(
            selected_device_address,
            function () {
                console.log("disconnected OK");
                app.showDeviceList();
            },
            function (error) {
                console.log("disconnect failed: " + error);
                alert("Failed to disconnect");
                app.showDeviceList();
            });
    } else {
        app.showDeviceList();
    }
}

app.showDiscoveredDevice = function (address, name) {
    console.log("showDiscoveredDevice(" + address + "," + name + ")");
    var tbl = document.getElementById("tbl_devices");
    if (tbl != undefined) {
        var row_count = tbl.rows.length;
        var rows = tbl.rows;
        var new_row = tbl.insertRow(row_count);
        var new_cell = new_row.insertCell(0);
        var button_class;
        if (odd) {
            button_class = "wide_button_odd";
        } else {
            button_class = "wide_button_even";
        }
        odd = !odd;
        var btn_connect = "<button class=\"" + button_class + "\" onclick=\"app.showMain('" + address + "')\" <br>" + name + "<br>" + address + "</button>";
        new_cell.innerHTML = btn_connect;
    }
};

app.clearDeviceList = function () {
    var tbl = document.getElementById("tbl_devices");
    tbl.innerHTML = "";
}

app.showDeviceList = function () {
    device_list_hidden = false;
    main_hidden = true;
    message_hidden = false;
    setDivVisibility();
};

app.hasService = function (peripheral, service_uuid) {
    console.log("hasService(" + JSON.stringify(peripheral) + "," + service_uuid + ")");
    var services = peripheral.services;
    for (var i = 0; i < services.length; i++) {
        if (services[i].toLowerCase() == service_uuid) {
            return true;
        }
    }
    return false;
};

app.showMain = function (address) {
    console.log("showMain: " + address);
    selected_device_address = address;
    device_list_hidden = true;
    main_hidden = false;
    message_hidden = true;
    btn_low = document.getElementById("btn_low");
    btn_mid = document.getElementById("btn_mid");
    btn_high = document.getElementById("btn_high");
    cb_sharing = document.getElementById('sharing');
    cb_temperature = document.getElementById('temp_monitoring');
    rectangle = document.getElementById("proximity_rectangle");
    document.getElementById('device_details').innerHTML = "Device: BDSK[" + address + "]";
    app.setControlsDisconnectedState();
    showInfo("Ready");
    setDivVisibility();
    document.getElementById('message').hidden = message_hidden;
};

app.initialize = function () {
    document.addEventListener(
        'deviceready',
        function () {
            document.addEventListener("backbutton", app.onBackKeyDown, false);
            ready();
        },
        false);
};

app.onBackKeyDown = function () {
    if (main_hidden == false) {
        app.exitMain();
        return;
    }
    if (device_list_hidden == false) {
        showMessage("Exiting application", 2);
        setTimeout(function () {
            navigator.app.exitApp();
        },
            500);
    }
};

app.setButtonText = function (btn_id, text) {
    console.log("setButtonText(" + btn_id + "," + text + ")");
    var btn = document.getElementById(btn_id);
    btn.innerHTML = text;
};

app.disableButton = function (btn_id) {
    var btn = document.getElementById(btn_id);
    btn.style.color = "gray";
};

app.enableButton = function (btn_id) {
    var btn = document.getElementById(btn_id);
    btn.style.color = "white";
}

app.setAlertLevelSelected = function () {
    switch (alert_level) {
        case 0:
            btn_low.style.color = "#FF0000";
            btn_mid.style.color = "#FFFFFF";
            btn_high.style.color = "#FFFFFF";
            break;
        case 1:
            btn_low.style.color = "#FFFFFF";
            btn_mid.style.color = "#FF0000";
            btn_high.style.color = "#FFFFFF";
            break;
        case 2:
            btn_low.style.color = "#FFFFFF";
            btn_mid.style.color = "#FFFFFF";
            btn_high.style.color = "#FF0000";
            break;
    };
};

app.buttonIsDisabled = function (btn_id) {
    var btn = document.getElementById(btn_id);
    return (btn.style.color === "gray");
};

app.setControlsConnectedState = function () {
    console.log("setControlsConnectedState");
    app.setButtonText("btn_connect", "DISCONNECT");
    document.getElementById('sharing').disabled = false;
    document.getElementById('temp_monitoring').disabled = false;
    app.enableButton('btn_low');
    app.enableButton('btn_mid');
    app.enableButton('btn_high');
    app.enableButton('btn_noise');
};

app.setControlsDisconnectedState = function () {
    console.log("setControlsDisconnectedState");
    app.setButtonText("btn_connect", "CONNECT");
    document.getElementById('sharing').disabled = true;
    document.getElementById('sharing').checked = false;
    document.getElementById('temp_monitoring').disabled = true;
    document.getElementById('temp_monitoring').checked = false;
    app.disableButton('btn_low');
    app.disableButton('btn_mid');
    app.disableButton('btn_high');
    app.disableButton('btn_noise');
    rectangle.style.backgroundColor = "#000000";
};

// Initialize the app.
app.initialize();
