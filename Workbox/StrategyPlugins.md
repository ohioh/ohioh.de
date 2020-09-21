"Workbox Plugins
Workbox provides the following plugins:

BackgroundSyncPlugin: If a network request ever fails, add it to a background sync queue and retry the request when the next sync event is triggered.

BroadcastUpdatePlugin: Whenever a cache is updated, dispatch a message on a Broadcast Channel or via postMessage().

CacheableResponsePlugin: Only cache requests that meet a certain criteria.

ExpirationPlugin: Manage the number and maximum age of items in the cache.

RangeRequestsPlugin: Respond to requests that include a Range: header with partial content from a cache."

"Custom Plugins
You can create your own plugins by passing in an object that has any of the following methods:

cacheWillUpdate: Called before a Response is used to update a cache. You can alter the response before it's added to the cache or return null to avoid updating the cache at all.

cacheDidUpdate: Called when a new entry is added to a cache or an existing entry is updated. Useful if you wish to perform an action after a cache update.

cacheKeyWillBeUsed: Called before a request is used as a cache key, for both cache lookups (when mode is 'read') and cache writes (when mode is 'write'). This can come in handy if you need to override or normalize your URLs prior to using them for cache access.

cachedResponseWillBeUsed: Called prior to a response from the cache being used, this callback allows you to examine that response, and potentially return null or a different response to be used instead.

requestWillFetch: This is called whenever a network request is about to be made. You can alter the Request in this callback.

fetchDidFail: Called when a network request fails, most likely due to a NetworkError. Note that this does not get called when a response with an error status, like 404 Not Found, is returned from the network.

fetchDidSucceed: Called when a network request is successful, regardless of what the HTTP status is of the response.

All of these functions will be called with await whenever a cache or fetch event reaches the relevant point for the callback.

A plugin using all of these callbacks would look like this..."

from https://developers.google.com/web/tools/workbox/guides/using-plugins
