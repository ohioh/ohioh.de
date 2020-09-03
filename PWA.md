https://www.pwabuilder.com/

https://web.dev/progressive-web-apps/

https://developers.google.com/web/fundamentals/primers/service-workers

https://zuixjs.github.io/zkit/

https://zuixjs.org/


https://open-wc.org/building/rollup-plugin-html.html


https://lit-element.polymer-project.org/guide/start
https://github.com/pwa-builder/pwa-starter


## Strategy: Cache with Network FallbackPage

If the ServiceWorker has to load something that is not yet avaible in the Cache [ because it wasn't loaded yet as an example] 
the serviceWorker will ask for Networkconnection. When this is not avaible it will redirect  to the fallbackPage.html to inform the User about.
