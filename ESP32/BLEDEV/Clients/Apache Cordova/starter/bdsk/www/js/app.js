var found_my_device = false;
var connected = false;
var disconnect_requested = false;
var sharing = false;
var monitoring_temperature = false;
var odd = true;
var info_hidden = true;
var alert_level=0;
var rssi;
var proximity_band=3;
var connection_timer;
var rssi_timer;
var btn_low;
var btn_mid;
var btn_high;
var cb_sharing=false;
var cb_temperature=false;
var rectangle;
var alarm_sound_path="sounds/alarm.wav";

var app = {};
var device_addresses = [];
var selected_device_address;

app.device = {};
app.device.ADV_NAME              = 'BDSK'

app.device.IMMEDIATE_ALERT_SERVICE = '1802';
app.device.LINK_LOSS_SERVICE       = '1803';
app.device.TX_POWER_SERVICE        = '1804';
app.device.PROXIMITY_MONITORING_SERVICE = '3e099910-293f-11e4-93bd-afd0fe6d1dfd';
app.device.HEALTH_THERMOMETER_SERVICE = '1809';

app.device.ALERT_LEVEL_CHARACTERISTIC   = '2a06';
app.device.TEMPERATURE_MEASUREMENT_CHARACTERISTIC   = '2a1C';
app.device.CLIENT_PROXIMITY_CHARACTERISTIC = '3e099911-293f-11e4-93bd-afd0fe6d1dfd';

app.findDevices = function() {
    app.clearDeviceList();
    app.startScan();
}

app.startScan = function()
{
    console.log("startScan");

    //TODO create onDeviceFound function

    //TODO create scanFailure function

    //TODO start scanning for devices for 5 seconds

    //TODO check outcome of scanning after 5 seconds have elapsed using a timer
};

app.isMyDevice = function(device_name)
{
    console.log("isMyDevice("+device_name+")");
    //TODO implement device name matching
    return true;
};

app.setAlertLevel = function(level) {
    console.log("setAlertLevel("+level+")");
    //TODO implement function which writes to the Alert Level characteristic
    // in the Link Loss service
};

app.setTemperatureMonitoring = function() {
    console.log("setTemperatureMonitoring");
    monitoring_temperature = cb_temperature.checked;
    console.log("monitoring_temperature="+monitoring_temperature);
};

app.setSharing = function() {
    console.log("setSharing");
    sharing = cb_sharing.checked;
    console.log("sharing="+sharing);
    if (!sharing) {
        // this will clear the LCD / console of proximity info and switch off all LEDs
        app.shareProximityData(0,0);
    }
};

app.makeNoise = function() {
    console.log("makeNoise");
    //TODO implement function which writes to the Alert Level characteristic
    // in the Immediate Alert service
};

app.shareProximityData = function(proximity_band, rssi) {
    console.log("shareProximityData("+proximity_band+","+rssi+")");
    //TODO implement function which writes to the Client Proximity characteristic
    // in the Proximity Monitoring service
};

app.startRssiPolling = function() {
    console.log("startRssiPolling");
    //TODO implement RSSI polling
};

app.stopRssiPolling = function() {
    clearTimeout(rssi_timer);
};

app.toggleConnectionState = function() {
    console.log("toggleConnectionState("+selected_device_address+") : connected="+connected);
    //TODO implement code to toggle between connected and disconnected states
};

app.connectToDevice = function(device_address)
{
	console.log('connectToDevice: Connecting to '+device_address);
    //TODO connect to the BDSK device and handle failures to connect and unexpected disconnections

};

app.establishCurrentAlertLevel = function() {
    console.log("establishCurrentAlertLevel");
    //TODO determine the Link Loss Alert Level that the BDSK device is currently set to
}

app.exitMain = function() {
    app.showDeviceList();
};

app.showDiscoveredDevice = function(address, name) {
    console.log("showDiscoveredDevice("+address+","+name+")");
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
        var btn_connect = "<button class=\""+button_class+"\" onclick=\"app.showMain('"+address+"')\" <br>"+name+"<br>"+address+"</button>";
        new_cell.innerHTML =  btn_connect;
    }
};

app.clearDeviceList = function() {
    var tbl = document.getElementById("tbl_devices");
    tbl.innerHTML = "";
}

app.showDeviceList = function() {
    device_list_hidden = false;
    main_hidden = true;
    message_hidden = false;
    setDivVisibility();
};

app.hasService = function(peripheral, service_uuid) {
    console.log("hasService("+JSON.stringify(peripheral)+","+service_uuid+")");
    var services = peripheral.services;
    for (var i=0;i<services.length;i++) {
        if (services[i].toLowerCase() == service_uuid) {
            return true;
        }
    }
    return false;
};

app.showMain = function(address) {
    console.log("showMain: "+address);
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
    document.getElementById('device_details').innerHTML = "Device: BDSK["+address+"]";
    app.setControlsDisconnectedState();
    showInfo("Ready");
    setDivVisibility();
    document.getElementById('message').hidden = message_hidden;
};

app.initialize = function()
{   
	document.addEventListener(
		'deviceready',
		function() { 
          document.addEventListener("backbutton", app.onBackKeyDown, false);
          ready();
        },
		false);
};

app.onBackKeyDown = function() {
  if (main_hidden == false ) {
      app.exitMain();
      return;
  }
  if (device_list_hidden == false) {
      showMessage("Exiting application",2);
      setTimeout(function() { 
          navigator.app.exitApp(); 
        }, 
        500);
  }
};

app.setButtonText = function(btn_id,text) {
    console.log("setButtonText("+btn_id+","+text+")");
    var btn = document.getElementById(btn_id);
    btn.innerHTML = text;
};

app.disableButton = function(btn_id) {
    var btn = document.getElementById(btn_id);
    btn.style.color = "gray";
};

app.enableButton = function(btn_id) {
    var btn = document.getElementById(btn_id);
    btn.style.color = "white";
}

app.setAlertLevelSelected = function() {
    switch (alert_level) {
        case 0:
          btn_low.style.color="#FF0000";
          btn_mid.style.color="#FFFFFF";
          btn_high.style.color="#FFFFFF";
          break;
        case 1:
          btn_low.style.color="#FFFFFF";
          btn_mid.style.color="#FF0000";
          btn_high.style.color="#FFFFFF";
          break;
        case 2:
          btn_low.style.color="#FFFFFF";
          btn_mid.style.color="#FFFFFF";
          btn_high.style.color="#FF0000";
          break;
    };
};

app.buttonIsDisabled = function(btn_id) {
    var btn = document.getElementById(btn_id);
    return (btn.style.color === "gray");
};

app.setControlsConnectedState = function() {
    console.log("setControlsConnectedState");
    app.setButtonText("btn_connect","DISCONNECT");
    document.getElementById('sharing').disabled = false;
    document.getElementById('temp_monitoring').disabled = false;
    app.enableButton('btn_low');
    app.enableButton('btn_mid');
    app.enableButton('btn_high');
    app.enableButton('btn_noise');
};

app.setControlsDisconnectedState = function() {
    console.log("setControlsDisconnectedState");
    app.setButtonText("btn_connect","CONNECT");
    document.getElementById('sharing').disabled = true;
    document.getElementById('temp_monitoring').disabled = true;
    app.disableButton('btn_low');
    app.disableButton('btn_mid');
    app.disableButton('btn_high');
    app.disableButton('btn_noise');
    rectangle.style.backgroundColor = "#000000";
};

// Initialize the app.
app.initialize();
