# Notes

## Getting started

### Create project

<pre>
cordova create bdsk com.bluetooth.cordova.bdsk Bdsk
</pre>

### Add platform support
<pre>
cd bdsk
cordova platform add android
</pre>

<pre>
cd bdsk
cordova platform add ios
</pre>

### Add plugins
<pre>
cordova plugin add cordova-plugin-ble-central --variable BLUETOOTH_USAGE_DESCRIPTION="Bluetooth is used to allow the exchange of data between phone/tablet and Arduino"
cordova plugin add cordova-plugin-media
cordova plugin add cordova-plugin-device
</pre>

* For iOS only

<pre>
cordova plugin add cordova-plugin-ios-longpress-fix
</pre>

### Test ability to build
<pre>
cordova build android
</pre>

### Install on Android
<pre>
adb install -r platforms/android/build/outputs/apk/android-debug.apk
</pre>

## Testing and Debugging

### Debugging with Chrome
<pre>
chrome://inspect
</pre>
