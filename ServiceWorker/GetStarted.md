


https://blog.heroku.com/how-to-make-progressive-web-app

* Create an app manifest
* Add it to your base HTML template
* Create the service worker
* Serve the service worker on the root of the scope you used in the manifest
* Add a <script> block to your base HTML template to load the service worker
* Deploy your progressive web app
*Use your progressive web app!

## Create an App Manifest
An app manifest is a JSON file containing the following information:

* The canonical name of the website
* A short version of that name (for icons)
* The theme color of the website for OS integration
* The background color of the website for OS integration
* The URL scope that the progressive web app is limited to
* The start URL that new instances of the progressive web app will implicitly load
* A human-readable description
* Orientation restrictions (it is unwise to change this from "any" without a hard technical limit)
* Any icons for your website to be used on the home screen (see the above manifest generator for autogenerating icons)

## Add the Manifest to Your Base HTML Template

simply add it to the <head> section:
<link rel="manifest" href="/public/manifest.json">

## Create offline.html as an Alias to index.html
By default, the service worker code below will render /offline.html instead of any resource it can't fetch while offline.
Create a file at <your-scope>/offline.html to give your user a more helpful error message, explaining that this data isn't cached and the user is offline.
