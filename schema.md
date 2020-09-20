
# Ohioh.de

OHIOH APP is an open source implementation in the OHIOH Framework.

OHIOH App is a part of the OHIOH Products, which uses privacy-preserving protocol for community-driven contact tracing across borders, with the opportunity to select geolocation tracing, like GPS.

Its aim is to flatten the curve of pandemics and potentially detect them before they spread widely. To effectively contain the spread of a virus health officials use the approach of test, trace and quarantine.

When an individual is determined to be infected , the official’s task is to determine who might have been in close enough proximity to this person, to be infected. Testing/ quarantining those individuals quickly is one of the effective strategies to curb the spread of infection further. However, such a method, without information is ineffective as well as inefficient.

The OhIOH APP, allows participating devices to log encounters with each other, in order to facilitate epidemiological contact tracing, while protecting the user's personal data and privacy.


## Table of Contents:

* ### Welcome to Ohioh Repository.
* ### Open Source
* ### Bluetooth
   #### Bluetooth protocol
* ### GAEN
* ### Web Bluetooth
* ### Indoor positioning System
* ### Push notification
* ### Progressive Web APP
   #### Service Worker
    ##### Architecture
* ### Taging and parsing
* ### Calibration
* ### Git Info
* ### How to build APK
* ### User Interface with CSS
* ### Installation & preparation:
* ### Usage:
* ### Contributing:
* ### Credits & Links:
   #### Partners
* ### License

## Welcome to Ohioh Repository

To get more information about the project and the university of applied sciences of Kiel stay tuned on following links:

https://ohioh.de

https://fh-kiel.de

As you have mentioned our github looks a bit different. At the moment you are in the main repository. This repository has more text and documentation. The reason is that we wish to give you as a new user an easy description to the project by it self and then go with you to the repository you are interested at. On more benifit on this way is that it is easier to handle. All Documentations are here. For you as a user it is easiert to follow aspecially to see updates in the update section.For us as voluntary for you it is easier to handle and stay tuned too.

The goal of this documentation is to make an understandable possibility to look in the code as a non-coder. Maybe you will not unterstand all at the beginning but if your are interested you should get a start as easy as possible.

The easiest way to get started is to use the Chrome-Browser. If you are not still using this, please install it. After done work go the document https://github.com/ohioh/ohioh.de/tree/master/Chrome to get next interesting information about the Development Tool inside.

  ### Goal:
[glimpse: field research, App-development, public health, risk scoring]

We are a collective of voluntary helpers and student from all over the world. Togehter we work at the OHIOH ("Our Helath In Our Hands") Workgroup to explore newst technologies, Protocols (like GAEN or TCN) and User-Behavior to publish public Documents. On this way we want to help to fight corona and non-pandemics like flue. Educational work is nessesary to give the users of tracing App and influenced person a fair chance to decide the own privat way to use APPs. For further information we publish technologies which helps public Authorities like school, universities or Town halls to define there individual risk places and develop fact oriented instructions for action and the restart after covid-19.

  ### Project Summary:
In the last month we worked on differnet project of development to fight covid-19. The colobaration to the university of applied sciences of Kiel and the PatchCheckfoundation ( https://pathcheck.org ) helped us to create a research field and envirnment for Data acquisition. The Pathcheck Foundation build with us an App that works in this closed research field of the university.

  ### Repositories:
Our App based on PathCheck: https://github.com/ohioh/gaen-mobile

Our Backend repositories:

https://github.com/ohioh/ohioh_Framework_api_gateway

https://github.com/ohioh/ohioh_Framework_cluster5_key-generator

https://github.com/ohioh/ohioh_Framework_cluster5_authentication

https://github.com/ohioh/Open-OHIHO-Gate-Gateway

https://github.com/ohioh/ohioh_Framework_Cluster_1_Flask

OHIOH Protocol

GrannPad will follow soon
  
## Open Source

On important step for being open source is to publish the source code. A lot of general informations about being open source, you can find from our partner the Linux Foundation. This guide help to get started with open source mindset at an awesome way. ( https://www.linuxfoundation.org/resources/open-source-guides/ )

There is one other point that is important for us i.e Complete transparency:

This is possible with the progressive web app that we design with. Before you install something, you can test in chromebrowser and lighthouse upto the smallest details. You can see all the traffic, Information above the traffic ( Network ) etc.

This is not possible ( or very hard ) if you "only" install a app from the app store. Our goal is not to make other apps bad. We wish to provide complete transparency by and an understanding of what the APP is doing.

## Bluetooth
## Bluetooth protocol

BT-Specification from Bluetooth SIG Working Groups: https://www.bluetooth.com/specifications/bluetooth-core-specification/

Guide from APPLE: https://developer.apple.com/accessories/Accessory-Design-Guidelines.pdf

Bluetooth Low Energy operates in the 2.4 GHz ISM band The Bluetooth Low Energy spectrum is divided into 40 RF channels Long-range mode (Coded PHY) can be used for enhancing reliability You can switch between using the three PHYs: Coded PHY, 1M PHY, and 2M PHY on the fly during a connection (master –> slave vs. slave –> master).

  ### Strategies in a function and case decision:

point-to-point, star, and mesh topologies

Bluetooth 5.0 introduced two new modes: high-speed and long-range

Fact:

100% of shipped smartphones, laptops, and tablets will support both Bluetooth Low Energy and Bluetooth Classic in 2024 ( https://www.novelbits.io/how-bluetooth-low-energy-works-21-interesting-facts/ )

There is no defined maximum number of connections between a Central and different peripherals per the Bluetooth spec

## GAEN

Documentation from Google: https://developers.google.com/android/exposure-notifications/exposure-notifications-api

Bluetooth Exposure Notification Specificaton:
https://blog.google/documents/70/Exposure_Notification_-_Bluetooth_Specification_v1.2.2.pdf

The google Github about Exposure notification for android: https://github.com/google/exposure-notifications-android

https://github.com/google/exposure-notifications-internals

The google Github about Exposure notification for the gaen Server: https://github.com/google/exposure-notifications-verification-server

The google Github about Exposure notification example server: https://github.com/google/exposure-notifications-server

More Informations about Google API:

https://developers.google.com/android/reference/com/google/android/gms/nearby/exposurenotification/package-summary

## Web Bluetooth

This new way to use Bluetooth can open a complete new way of interacting with Bluetooth. It controls Blietooth Low energy device like heart rate or glucose monitors, all kind of sensore, home appliances and other devices. This Technologie can be used in all way. The client can be the host at the same time. A great way to communicate. This idea followes the mindset of open source deeply. that is why we decided for this young technolgy. We will create an open source control interfaces for near the GAEN and TCN Protocol.

Energy:

This is an often discussed in the world of tracing. For us as researcher who are deeply interested in the userview that discussion is the same important. We only make research that is usable in normal life and not in a labor. In Bluetooth Low Energy devices can perform one of two roles.As a “Central” (your phone) or a “Peripheral” (a above called hardware, headset other device).

The Bluetoothdevice by itself:

The Bluetooth sensor is in general only on functional platin on your mainboard ( from the smartphone ). This sensor has a lot of services which are or are not ever avaible ( like the GAEN ). You maybe have seen this battery status of your headset at you smartphone screen. This is a service ( like a specific protocol that as a sensor of the headset about this battery). The answer is a number. The same with health data or audio. Different protocols can run ( when it is allowed ) at the same time or interval. Music audio stream is after activation a permanent running service as long as you want to listen to music. The request of the battery service is in the most cases in interval.

This services are declaired by the Bluetooth SIG Group.

Check it out:

First, you need to enable Developer Mode in Android. Next, go to Settings, then open “Developer Options” and turn on the “Enable Bluetooth HCI snoop log.” This will start recording all the Bluetooth traffic that goes through your device. Then use Wireshark to open the Bluetooth log. More we are not allowed to explain ;-)

## Indoor positioning System

An indoor positioning system (IPS) is a network of devices used to locate people or objects where GPS and other satellite technologies lack precision or fail entirely, such as inside multistory buildings, airports, alleys, parking garages, and underground locations.

https://en.wikipedia.org/wiki/Indoor_positioning_system


## Push notification

https://www.w3.org/TR/2020/WD-push-api-20200204/

https://w3c.github.io/push-api/

https://datatracker.ietf.org/doc/rfc8292/

https://www.npmjs.com/package/web-push

https://developers.google.com/web/fundamentals/push-notifications

Notification object;

onclick onclose onerror onshow

https://developer.mozilla.org/en-US/docs/Web/API/notification/Notification

## Progressive Web APP

This is maybe your first coding contact or you only want to undestand how our app make is possible to download without using PlayStore or AppStore. Then you are at the right place. Information only for Coder : [Coders!] Infomration only for User: [User]

Progressive Web Applications (Progressive Web Apps, PWAs) are web applications that mimic the experience of native applications and must
Capable: PWAs often contain functions such as keyboard shortcuts, file system access, app-badging, media control and clipboard support, all created using modern Web APIs and WebAssembly.

Reliable: PWAs remain usable regardless of the quality of the network connections. The latest content is always available, and if access requests fail, PWAs warn users and tell them why. PWAs also support offline access.

Installable: PWAs run in a stand-alone window rather than a browser tab and can therefore be launched like native applications. You can set PWAs as default settings, just like native applications.

 ### Service Worker
 
 Definition from Mozilla:
"A service worker is an event-driven worker registered against an origin and a path. It takes the form of a JavaScript file that can control the web-page/site that it is associated with, intercepting and modifying navigation and resource requests, and caching resources in a very granular fashion to give you complete control over how your app behaves in certain situations (the most obvious one being when the network is not available).

A service worker is run in a worker context: it therefore has no DOM access, and runs on a different thread to the main JavaScript that powers your app, so it is non-blocking. It is designed to be fully async; as a consequence, APIs such as synchronous XHR and Web Storage can't be used inside a service worker.

Service workers only run over HTTPS, for security reasons. Having modified network requests, wide open to man in the middle attacks would be really bad. In Firefox, Service Worker APIs are also hidden and cannot be used when the user is in private browsing mode."

avaible for following browsers:

https:jakearchibald.github.io/isserviceworkerready/

ServiceWorker API:
https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

"Multi-Thread" ( or two single Thread) usage, this is an awesome feature that pwa support.Your basics like the DOM are running on a single thread. In normal everything you add in Js will added as workload to this thread. The ServiceWorker has a decoupled thread for usage. This push up the usability and performance on a nice way. This seperated Thread will still alaive if the browser is closed. Like a background Service that only need needs the visaul performance of the device whenn the user want to see the content of the application.Or in short "stay tuned and same time safe energy". The Service Workers make sure that only the needed JS-Files are used which are needed for the advantage of the users.

Service Workers are only runing with https:. This means that only secure traffics from secure Hosts are allowed by default.

   #### Architecture
   
   ##### OHIOH-Strategy
We use an combination to make sure of less Network-Traffic and maximal easy User-Experiance. 1. 2. 3.


   ##### Strategy: Cache with Network FallbackPage
If the ServiceWorker has to load something that is not yet avaible in the Cache [ because it wasn't loaded yet as an example] the serviceWorker will ask for Networkconnection. When this is not avaible it will redirect to the fallbackPage.html to inform the User about.


   ##### Strategy: Cache only
This strategy helps in situation, where a relink or data change would brake the information by it self. MAyby when loading something from the database. Then it is important to only use cache when Nétwork is not avaible. On this way the dataquality is secured.


   ##### Strategy: Network Only
This is the opposite to Cache only. This is how Homepage etc are working


   ##### Strategy: Network with Cache Fallback
This strategy request a page from the ServiceWorker in a situation where the Network is not avaible. Then the serviceWorker will request this data from Cache. This is a very helpful strategy.


   ##### Strategy: Cache, then Network
This is a really useful strategy in alot of cases. The idea is to get the content as fast and traffic saving as possible. If and update is avaible on the avaible network this will update the content. 1.The page will directly request the cache and getting the content 2.At the same time the page request the ServiceWorker that request the network for new content for the page and the cache.If new contant is avaible the serviceWorker pushit to the page too. The user has the best experinace on this way Important for Coders:This process is in the requested *.js file and the serviceWorker

Version: Cache then Network (all data to dynamic Caching again) Strategy:
Version: Cache then Network (all data to dynamic Caching after compare) Strategy:


   ##### Implimentation way for seperated files Step-byStep:
The important question to understand why we have do give this a look is "What is loaded first...the serviceworker or the wihed *.js file from the index.html?"


   ##### Kill a Servic eWorker

   ##### Dynamic Caching vs Caching Dynamic Content
This both methods are not equal. Dynamic Caching works by loading he page, caling the ServiceWorker. This makes a request to Network and send it back to ServiceWorker. Now this new content is stored in the Cache and is send to the PAGE. This is a part of a Caching-Strategies.


   ##### Caching Dynamic Content
Here the Page requests information from the ServiceWorker. Buit instead of useing the Cacha API, this uses the Indexed( or other DB) Key-Value-Object Database (in Json). Works similar NetworkThenCache Strategy concationated with the DB. Data changes frequently is dynamic and thetypically way to handle this is the JSON-Format.


   ##### Background Sync
What happens if the user has no internet and will make a new request. MAybe for sending Research Data or getting newst information? We biult in a storage for the serviceworker like a "register Sync Task" as json file in DB (at the beginning in indexedDB) that waits for a Internet connection. This is a "Sync"-Event in the ServiceWorker in the background of the application.

## Taging and parsing

Taging is a way in JavaScript and HTML to point to a specific code part.

https://www.w3schools.com/html/html_scripts.asp

Parsing:

https://tomassetti.me/parsing-in-javascript/

## Calibration

Calibtaion for devices:

https://developers.google.com/android/exposure-notifications/files/en-calibration-2020-08-12.csv

## Git Info

test We are working with folks from the PathCheck Repository. It can happen that we work in different ways with the Project. To bring the split to a minimum we try to merge the original pathcheck repository to a seperated Account. There we can manual compare the differences and try to run the origin from PathCheck concatinated with our actual data from the Device ( which should ofcourse been up to date). if everything is running we can merge the TransferAccount with our ohioh account.

we use the develop as our regular "master" the masterfile is the last published version and shouldnt be touched ( only safed )

We recognize that it can be helpful using next to your terminal the software 1.Gitkraken for the ohioh account 2.Github Desktop to your privat account



   ### How to use:
use your terminal to handle your work


   ### Definitions:
https://backlog.com/git-tutorial/branching/merge/ Good to know: remote repository - this is the repository hosted by github on the server initial repository - your folder with the data

pull - (down) pull the latest change from the remote repository to our local repository fetch - (down) push - (up) to the repository that you point example: $ git push -u origin master ( or in our case develop) Before you start check out how git works. If you know where you git head is at the moment you are ready to rock.


   ### Daily Update with repo from OHIOH:
https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/managing-branches creating your daily branch at the beginning of the work Define the each Microprojet in the file as you can read in the secation to "MicroProject"


   ### Regular Update with repo from pathcheck:
https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork use ForkSyncInTestBranch.md


   ### MicroProject:
Define in by ProjectContent and Version: Actual Version github branch.

## How to build APK

Follow this instructions to build your own APK for Android:

before you go deeper pls use the Androidx:

Using androidx libraries in your project See Migrating to AndroidX to learn how to migrate an existing project.

If you want to use androidx-namespaced libraries in a new project, you need to set the compile SDK to Android 9.0 (API level 28) or higher and set both of the following Android Gradle plugin flags to true in your gradle.properties file.

android.useAndroidX: When this flag is set to true, the Android plugin uses the appropriate AndroidX library instead of a Support Library. The flag is false by default if it is not specified. android.enableJetifier: When this flag is set to true, the Android plugin automatically migrates existing third-party libraries to use AndroidX dependencies by rewriting their binaries. The flag is false by default if it is not specified. (from https://developer.android.com/jetpack/androidx)

https://www.instamobile.io/android-development/generate-react-native-release-build-android/

## User Interface with CSS

We use CSS MEdia Quesries to adjust Layout& Design.

We try to influence the world of tracing from different fields and views.

On is to make the APP Experiance for the use extreme comprehensible and understandable.

For this implementation of goals we need and combination of traditional App Coding ( JavaScript with React+(Native) ) and html & css.
An important file for this to understand the schema is the material.{primary}-{accent}.min.css ormaterial.{primary}-{accent}.min.js File in our repository.
Test it yourself by open our APP-Page in Chrome and open the Dev Tools -> Elements. Now move the size of the App-View-Field and you see that the code is reacting on your choice of the View size. Look to the class changes in the file "..is-small-screen".

The DOM ( https://de.wikipedia.org/wiki/Document_Object_Model ) need a style guide. In React Native it is often used with the style class and a methode for each element that we used. The CSS and JS calles from the index.html and serviceWorker is  very similar


This brings the user a reponsive Experiance


Interesting Link:

https://getmdl.io/started/

http://daemonite.github.io/material/docs/4.0/getting-started/introduction/

Responsive Design Basics by Google: https://developers.google.com/web/fundamentals/design-and-ui/responsive/
Responsive Design Patterns (Google): https://developers.google.com/web/fundamentals/design-and-ui/responsive/patterns
Responsive Images (Google): https://developers.google.com/web/fundamentals/design-and-ui/responsive/images
Using CSS Media Queries: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
Responsive Images (MDN): https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
Responsive Images in CSS: https://css-tricks.com/responsive-images-css/
Using CSS Animations: http://learn.shayhowe.com/advanced-html-css/transitions-animations/

If you want to give your knowledge a try you can dive to following code:

<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta content="initial-scale=1, shrink-to-fit=no, width=device-width" name="viewport">

    <!-- CSS -->
    <!-- Add Material font (Roboto) and Material icon as needed -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- Add Material CSS, replace Bootstrap CSS -->
    <link href="css/material.min.css" rel="stylesheet">
  </head>
  <body>
    <h1>Hello, world!</h1>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

    <!-- Then Material JavaScript on top of Bootstrap JavaScript -->
    <script src="js/material.min.js"></script>
  </body>
</html>


## Installation & preparation:
## Usage:
## Contributing:
## Credits & Links:
 ### Partners
## License: 

# Schema to Informations.md
