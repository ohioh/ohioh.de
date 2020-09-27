https://www.npmjs.com/package/webpack


## Look to:
Plugins

webpack has a rich plugin interface. Most of the features within webpack itself use this plugin interface. This makes webpack very flexible.

Name	Status	Install Size	Description
mini-css-extract-plugin	mini-css-npm	mini-css-size	Extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
compression-webpack-plugin	compression-npm	compression-size	Prepares compressed versions of assets to serve them with Content-Encoding
i18n-webpack-plugin	i18n-npm	i18n-size	Adds i18n support to your bundles
html-webpack-plugin	html-plugin-npm	html-plugin-size	Simplifies creation of HTML files (index.html) to serve your bundles
extract-text-webpack-plugin	extract-npm	extract-size	Extract text from a bundle, or bundles, into a separate file
Loaders
webpack enables use of loaders to preprocess files. This allows you to bundle any static resource way beyond JavaScript. You can easily write your own loaders using Node.js.

Loaders are activated by using loadername! prefixes in require() statements, or are automatically applied via regex from your webpack configuration.


https://github.com/webpack-contrib/html-loader


https://survivejs.com/webpack/developing/getting-started/
