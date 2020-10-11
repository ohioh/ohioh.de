# preact-book-example

Check out the book that uses the code in this repo: https://bleedingedgepress.com/progressive-web-apps-with-preact/

> Yet another Hacker News PWA

## Development

Serving the development build with hot reload on localhost:8080

```
$ npm run dev
```

Serving a production build locally

```
$ npm run serve
```

## Running Unit (Jest) Tests

```
$ npm test
```

## Running End-to-end tests

You need to start the local production build manually prior to running e2e tests.

```
$ npm run serve
```

And in another terminal window:

```
$ npm run test:e2e
```

## Deploying with Firebase

You will first need to have an account on Firebase. To register, visit [https://firebase.com/](https://firebase.com)

Once registered, install `firebase-tools` available on `npm`.

```
$ npm i -g firebase-tools
```

`firebase-tools` contains a wide array of commands to interact with your Firebase account. You'll only need a few for deployment. Before we do that, we'll need to authenticate via the command-line.

```
$ firebase login
```

A new browser window/tab will pop up and you will need to authenticate via Google SSO. Once authenticated, you can close your browser window and head back to the terminal to initialize your new Firebase app.

```
$ firebase init
```

This will generate a `.firebaserc` and an empty `firebase.json` file in your current project directory which will be replaced via `preact-cli` auto-generated `firebase.json` config.

```
$ preact serve -- server config
```

Once your `firebase.json` is populated by `preact-cli`, simply deploy like so:

```
$ firebase deploy
```

As a convenience, you can also run `npm run deploy` which will rebuild the `firebase.json` and run `firebase deploy`

```
$ npm run deploy
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).
