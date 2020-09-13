# Project name: Event

## Description:
This Document is about ServiceWorker. As you will see... the "magic" from browser to APP is happening here.
In the coding language we talkinbg about lifecyle of ServiceWorkers.

## Table of Contents:
-- Service Worker Lifecycle
(-- Event:  Waiting )
--  Event: waitUntil
-- Event: Register
-- Event: Download
-- Event: Load
-- Event: Preisntall
-- Event: beforeinstallpropmt
-- Event: Install
-- Event: Activate
-- Event: Update (only for SPA)
-- Event: Fetch
-- Event: Sync
-- Event: PeriodicSync

## Installation & prepair:
For testing you can use our repository for the Research-App and  look to the ../public/ServiceWorker.js
If you want start by  zero the introduction "Step By Stey" in the React-Native-Folder will  help  you.
Use a browser that support ServiceWorkers. This link shows you all information you need: https://caniuse.com/serviceworkers
The browser needs https (TLS) Support. VERY IMPORTANT FOR SECURITY.
The ServiceWorker has  to be inside the scope of the project  folder.

## Usage:
Events are the code in  the ServiceWorker-File.
They cache app content, perform the background processing,request for push notification (  or handle them ).
Events are the nice way since ES6 to set up individual stragies for your need to create a great user-experiance.


## Contributing:
Satyam

## Credits & Links:
created by Tjark Ziehm; 

## License: 
MIT
------------------------------------------------------------------------------------------------------------
## -- Service Worker Lifecycle

## (-- Event:  Waiting )
Waiting is possible when two serviceworkers are avaible after installation.
As  an example  SW_B and SW_A. A is still active and the SW_b is isntalled but not in usage yet. So it is waiting.
This can be skipped by skipWaiting();

## --  Event: waitUntil ( method )
A multiusage  Event for specific  tasks like cache creating or calling specific parts from the key of an object

## -- Event: .respongWith (method)
Takes the event to use is in a async way.

## -- Event: Register
## -- Event: Download
## -- Event: Load
## -- Event: Preisntall
## -- Event: beforeinstallpropmt

## -- Event: Install
addEventListener('install' ...);
Here the listener fires the event object that install  the local environment and gives the servicework after the install is done a place  to stay.


## -- Event: Activate
Activate  is a powerfull tool to clean up and activate the previos serviceworker Version.
The Activation  is the different between Browser experiance and the APP. This switch  browser usage to APP activate.

[Coders] ofcourse you can handle this with versioning of the file like $ var sw-version = "0.1";
or later with workbox.
The newest ServiceWorker will loaded when  it was installed and in waiting mode.

forcing the activation
skipWaiting()

## -- Event: Update (only for SPA)
this force an update for the serviceworker.
[Coder]  
function requestUpdate(){
regObj.update();
}

## -- Event: Fetch
addEventListener('fetch' .... );
This the Fetch Event Listener will return a event objekt. Here the decission between taking data from Networt or cache is done.
This Event will fire for each request the User is doing.
Now the following code will grab it.
event.resondWith(fetch(event.request));
This request or Event will take the data from the browser.

## -- Event: Sync

## -- Event: PeriodicSync

( https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/periodicSync )


