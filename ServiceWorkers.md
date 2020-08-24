## Service Worker:

avaible for following browesers:

https:jakearchibald.github.io/isserviceworkerready/


 "Multi-Thread" ( or two single Thread)  usage, this is an awesome feature that pwa support.Your basics like the DOM are running on a single thread. In normal everything you add in Js will added as workload to this thread. The ServiceWorker has a decoupled thread for usage. This push up the usability and performance on a nice way. This seperated Thread will still alaive if the browser is closed. Like a background Service that only need needs the visaul performance of the device whenn the user want to see the content of the application.Or in short "stay tuned and same time safe energy".
The Service Workers make sure that only the needed JS-Files are used which are needed for the advantage of the users.

# Event: Source

# Fetch-API: 
Browser or Page-related JavaScript initiales a fetch like http request over the proxy-server.
The only way how this will not happen is a normal xml-https Request or from packages like Axios that base on it.

index.html ->(loads)-> app.js -> (register)-> Fetch Event triggers the ServiceWorker and wake it up.

# Push Notification:
Like the communication way over the used Browser-Server. Our OHIOH Servers can communicate over this way with the Browser and the App at the device (to the client).
This works on the Service Worker Thread.



# Service Worker Lifecycle:

index.html ->(loads)-> app.js -> (register)-> ServiceWorker.js->(install)*-> Install Event from the cache. or *->(activated)->Activation Event->(backgrounded)-Y IDLE Mode ->(after time)-> terminated "sleeping" Rewake when Events are coming in
