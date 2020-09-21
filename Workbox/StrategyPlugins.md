"Workbox Plugins
Workbox provides the following plugins:

BackgroundSyncPlugin: If a network request ever fails, add it to a background sync queue and retry the request when the next sync event is triggered.

BroadcastUpdatePlugin: Whenever a cache is updated, dispatch a message on a Broadcast Channel or via postMessage().

CacheableResponsePlugin: Only cache requests that meet a certain criteria.

ExpirationPlugin: Manage the number and maximum age of items in the cache.

RangeRequestsPlugin: Respond to requests that include a Range: header with partial content from a cache."

from https://developers.google.com/web/tools/workbox/guides/using-plugins
