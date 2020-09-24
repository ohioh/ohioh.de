As you have seen  ...  we have 3 ServiceWorker inthe public Folder.

To understand you need to  look in the   
* workbox-config.js
* package.json
* serviceWorkerCache.js
* serviceWorkerRoute.js
* serviceWorkerStrategy.js

and only give a mention  to the 
* workbox-xxxx.js ( XXXX  can change )
*serviceWorker.js.map  (  that is only the lightweight version to optimize the speed)


Now   lets start:

the comment from the package.json -> $  npm  run generate-sw  (as "workbox  generate:sw")
start a new  bundling for precaching process. 
This  is good for the first step   to create a servicework, but everytime after  this would overwrite the first version.

If we wanna build up on an existing serviceWorker 
$ workbox inject:manifest   (and we changed it in the package.json script areatoo)
On this way we take the existing serviceWorker,analyse it and data around,create the filemanifest ( not manifest.json )
and bring it to the serviceWorkerRoute.js

If we  run the comment $ npm run  generate-sw then the inject:manifest  will  take the exisitng file,analyse  all and create filemanifest
and inject to the serviceWorkerCache.js (as  an input  from  the  serviceWorkerRoute.js  , look to it and take the  workboxSW.precache  HOOK)
text


