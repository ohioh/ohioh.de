As you have seen  ...  we have 3 ServiceWorker inthe public Folder.

To understand you need to  look in the   
* workbox-config.js
* package.json
* serviceWorkerCache.js
* serviceWorkerRoute.js
* serviceWorkerMain.js

and only give a mention  to the 
* workbox-xxxx.js ( XXXX  can change )
*serviceWorker.js.map  (  that is only the lightweight version to optimize the speed)


Now   lets start:

the comment from the package.json -> $  npm  run generate-sw 
start a new  bundling for precaching process. 
This  is good for the first step   to create a servicework, but everytime after  this would overwrite the first version.

If we wanna build up on an existing serviceWorker 
$ workbox inject:manifest
On this way we take the existing serviceWorker,analyse it and data around,create the filemanifest ( not manifest.json )
and bring it to the serviceWorkerRoute.js
