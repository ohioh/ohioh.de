Web Bluetooth Developer Studio Plugin
WIP

Installation
Copy/paste sandbox/web-bluetooth/bluetooth-developer-studio-plugin/ folder content to a new Web Bluetooth plugin folder at C:\Program Files (x86)\Bluetooth SIG\Bluetooth Developer Studio\Plugins\Web Bluetooth.

Run
Open Bluetooth Developer Studio
Press Ctrl+G to Generate Code
Pick Client and select Web Bluetooth
Click Generate button
Check out the new generated HTML and JS files in the Bluetooth Developer Studio Plugin Output folder.


Notes
Make sure template.html and template.js lines end with CR then LF:
:update
:e ++ff=dos
:wq
