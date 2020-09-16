## Creating a Basic React-APP for PWA:

we will use this https://www.npmjs.com/package/create-react-native-app
(pls read this first) 
($ = Sign to  show that we work in terminal)


// install the 'create-react-app' library globaly to use it after:

    $ npm install -g create-react-app


// now we can create an app "xyz" is the name that you can give your project:

    $ create-react-app xyz


// not using yarn, we use NPM -> we built the base... now lets convert it to a complete offline pwa:
( for that we have to make some files available because they are hidden by default example: registerServiceWorker.js -> lets change that.This eject process in not reversible)

    $ npm run eject


// Now check your folder and you see a lot more folders an files
// lets bring it PWA now:

    $ npm run build


// look to it in the browser as a  simulation (testing-purpose) #notToDeploy:

    $ npm install -g serve


//  lets test it:

    $ serve -s build 


//-> Congratulation... you did it -> a single side pwa. You can visit the build in your locahost shown in the terminal:

    https:localhost:5000


// Wanna dive in deeper  ? :

-> https://developers.google.com/web/tools/workbox/
-> https://www.npmjs.com/package/sw-precache-webpack-plugin

We are using our own precache strategy, so we have to use $ importScript[]  in the generated sw-precache file 

https://github.com/facebook/create-react-app/blob/master/packages/cra-template/template/README.md


# Set Up  Workbox:
-> https://developers.google.com/web/tools/workbox/modules/workbox-cli

npm install --save-dev workbox-cli








