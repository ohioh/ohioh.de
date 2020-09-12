## Creating a Basic React-APP for PWA:
($ = Sign to  show that we work in terminal)


// install it globaly to use it after:
$ npm install -g create-react-app

// now we can create an app "xyz" is the name that you can give your project:
$ create-react-app "xyz"

// not use yarn, we use NPM -> we built the base... now lets turn to complete offline pwa:
( for that we have to make some files avaible because they are hidden by default example: registerServiceWorker.js -> lets change that.This eject process in  not returnable)

$ npm  run eject

// Now check your folder and you see a lot more folders an files
// lets bring it PWA now:

$ npm  run build

// look to it in the browser as a  simulation (testing-purpose) #notToDeploy:

$ npm install -g serve

//  lets test it:

$  serve -s build 

//-> Gratulation... you did it -> a single side pwa. You can visit the build in your locahost shown in the terminal:


https:localhost:5000


// Wanna dive in deeper  ? :

-> https://developers.google.com/web/tools/workbox/
-> https://www.npmjs.com/package/sw-precache-webpack-plugin

We are using our own precache strategy, so we have to use $ importScript[]  in the generated sw-precache file 









