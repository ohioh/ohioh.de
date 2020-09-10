## Service Worker:

# Definition from Mozilla:
"A service worker is an event-driven worker registered against an origin and a path. It takes the form of a JavaScript file that can control the web-page/site that it is associated with, intercepting and modifying navigation and resource requests, and caching resources in a very granular fashion to give you complete control over how your app behaves in certain situations (the most obvious one being when the network is not available).

A service worker is run in a worker context: it therefore has no DOM access, and runs on a different thread to the main JavaScript that powers your app, so it is non-blocking. It is designed to be fully async; as a consequence, APIs such as synchronous XHR and Web Storage can't be used inside a service worker.

Service workers only run over HTTPS, for security reasons. Having modified network requests, wide open to man in the middle attacks would be really bad. In Firefox, Service Worker APIs are also hidden and cannot be used when the user is in private browsing mode."

avaible for following browsers:

https:jakearchibald.github.io/isserviceworkerready/

# ServiceWorker API:
https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API


 "Multi-Thread" ( or two single Thread)  usage, this is an awesome feature that pwa support.Your basics like the DOM are running on a single thread. In normal everything you add in Js will added as workload to this thread. The ServiceWorker has a decoupled thread for usage. This push up the usability and performance on a nice way. This seperated Thread will still alaive if the browser is closed. Like a background Service that only need needs the visaul performance of the device whenn the user want to see the content of the application.Or in short "stay tuned and same time safe energy".
The Service Workers make sure that only the needed JS-Files are used which are needed for the advantage of the users.

Service Workers are only runing with https:. This means that only secure traffics from secure Hosts are allowed by default.

## Architecture:
https://developer.mozilla.org/de/docs/Web/API/Service_Worker_API/Using_Service_Workers

https://user-images.githubusercontent.com/49223724/92712028-67f57580-f359-11ea-9ac1-15e093099b5b.png

## Strategies for ServiceWorkers:
https://blog.bitsrc.io/5-service-worker-caching-strategies-for-your-next-pwa-app-58539f156f52
# 1.Stale-While-Revalidate
# 2.Cache first, then Network
# 3.Network first, then Cache
# 4.Cache only
# 5.Network only

## Service Worker Lifecycle:
https://dev.to/developertharun/the-service-worker-lifecycle-for-newbies-progressive-web-apps-4b51

index.html ->(loads)-> app.js -> (register)-> ServiceWorker.js->(install)*-> Install Event from the cache. or *->(activated)->Activation Event->(backgrounded)-Y IDLE Mode ->(after time)-> terminated "sleeping" Rewake when Events are coming in

0. register
0.1 download
1.load-Event
2.preinstall-Event
2.1 beforeinstallprompt
3.install-Event
4.activate-Event
5.fetch-Event
6.sync-Event
7. periodicSync-Event
( https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/periodicSync )

(Interface is at the end of the Document)



# Event: Source

# Fetch-API: 
Browser or Page-related JavaScript initiales a fetch like http request over the proxy-server.
The only way how this will not happen is a normal xml-https Request or from packages like Axios that base on it.

index.html ->(loads)-> app.js -> (register)-> Fetch Event triggers the ServiceWorker and wake it up.

# Push Notification:
Like the communication way over the used Browser-Server. Our OHIOH Servers can communicate over this way with the Browser and the App at the device (to the client).
This works on the Service Worker Thread.





# Background Sync:



## Interfaces
# Cache 
Represents the storage for Request / Response object pairs that are cached as part of the ServiceWorker life cycle.

# CacheStorage 
Represents the storage for Cache objects. It provides a master directory of all the named caches that a ServiceWorker can access, and maintains a mapping of string names to corresponding Cache objects.

# Client 
Represents the scope of a service worker client. A service worker client is either a document in a browser context or a SharedWorker, which is controlled by an active worker.

# Clients 
Represents a container for a list of Client objects; the main way to access the active service worker clients at the current origin.

# ExtendableEvent 
Extends the lifetime of the install and activate events dispatched on the ServiceWorkerGlobalScope, as part of the service worker lifecycle. This ensures that any functional events (like FetchEvent) are not dispatched to the ServiceWorker, until it upgrades database schemas, and deletes outdated cache entries, etc.

# ExtendableMessageEvent 
The event object of a ServiceWorkerGlobalScope/message_event event fired on a service worker (when a channel message is received on the ServiceWorkerGlobalScope from another context) — extends the lifetime of such events.

# FetchEvent 
The parameter passed into the ServiceWorkerGlobalScope.onfetch handler, FetchEvent represents a fetch action that is dispatched on the ServiceWorkerGlobalScope of a ServiceWorker. It contains information about the request and resulting response, and provides the FetchEvent.respondWith() method, which allows us to provide an arbitrary response back to the controlled page.

# InstallEvent 
The parameter passed into the oninstall handler, the InstallEvent interface represents an install action that is dispatched on the ServiceWorkerGlobalScope of a ServiceWorker. As a child of ExtendableEvent, it ensures that functional events such as FetchEvent are not dispatched during installation.

# NavigationPreloadManager 
Provides methods for managing the preloading of resources with a service worker.

# Navigator.serviceWorker
Returns a ServiceWorkerContainer object, which provides access to registration, removal, upgrade, and communication with the ServiceWorker objects for the associated document.

# NotificationEvent 
The parameter passed into the onnotificationclick handler, the NotificationEvent interface represents a notification click event that is dispatched on the ServiceWorkerGlobalScope of a ServiceWorker.

# ServiceWorker 
Represents a service worker. Multiple browsing contexts (e.g. pages, workers, etc.) can be associated with the same ServiceWorker object.
# ServiceWorkerContainer 
Provides an object representing the service worker as an overall unit in the network ecosystem, including facilities to register, unregister, and update service workers, and access the state of service workers and their registrations.

# ServiceWorkerGlobalScope
Represents the global execution context of a service worker.

# ServiceWorkerMessageEvent 
Represents a message sent to a ServiceWorkerGlobalScope. Note that this interface is deprecated in modern browsers. Service worker messages will now use the MessageEvent interface, for consistency with other web messaging features.

# ServiceWorkerRegistration 
Represents a service worker registration.

# ServiceWorkerState 
Associated with its ServiceWorker's state.

# SyncEvent 
The SyncEvent interface represents a sync action that is dispatched on the ServiceWorkerGlobalScope of a ServiceWorker.

# SyncManager 
Provides an interface for registering and listing sync registrations.

# WindowClient 
Represents the scope of a service worker client that is a document in a browser context, controlled by an active worker. This is a special type of Client object, with some additional methods and properties available.


