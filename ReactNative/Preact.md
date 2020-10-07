##  Whypreact:
Preact is a directIn-Browser  tool that need no seperate builds.
That means that you can write the code directly  to *.html files if it is needed:
<script type="module">
  import { h, Component, render } from 'https://unpkg.com/preact?module';

  // Create your app
  const app = h('h1', null, 'Hello World!');

  render(app, document.body);
</script>

Disadvantage of this is that JSX is not usabele because it needs a build step.
The solution ist the h() and create Element() whichis creapy to use but the easiest way is HTM ( Hyperscript Tagged Markup ) .
HTM is a JSX-similar syntax whichis usable in all modern browsers.
To use this  as ansaingle import use the following import line:

import { html, render } from 'https://unpkg.com/htm/preact/index.mjs?module'

Github:
https://github.com/developit/htm

<script type="module">
  import { h, Component, render } from 'https://unpkg.com/preact?module';
  import htm from 'https://unpkg.com/htm?module';

  // Initialize htm with Preact
  const html = htm.bind(h);

  function App (props) {
    return html`<h1>Hello ${props.name}!</h1>`;
  }

  render(html`<${App} name="World" />`, document.body);
</script>

For testing use:
https://preactjs.com/repl?code=import%20%7B%20h%2C%20render%2C%20Component%20%7D%20from%20%27preact%27%3B%0A%0Aclass%20App%20extends%20Component%20%7B%0A%20%20render()%20%7B%0A%20%20%20%20return%20%3Ch1%3EHello%2C%20world!%3C%2Fh1%3E%3B%0A%20%20%7D%0A%7D%0A%0Arender(%3CApp%20%2F%3E%2C%20document.body)%3B

## Good way to start:
https://preactjs.com/guide/v10/getting-started/



https://preactjs.com/

https://preactjs.com/guide/v10/switching-to-preact

## Fragments:
Components to render Child elements without an extra DOM element.
https://preactjs.com/guide/v10/components/#fragments

Using Fragements in a loop... a key is necessary:
<Fragment key={item.id}></Fragment>

## componentDidCatch:
This catches errors from rendering like *.catch in normal usage, This  method uses the state as an boolean to start a new "error" lifecylce.

## Hooks:
Hooks are a new way to make sharing logic easier between components and is very similar to a usage of classes.
There are two ways to import hooks: from preact/hooks or preact/compat
https://preactjs.com/guide/v10/hooks

## createContext:
The create Contaxt-API ist solving getChildConetext() probs aspecially when you are changing variables.
Component in-between the provider and consumer blocks can be handled via updating with shouldComponentUpdate.
Now you can commuincat directly and logical in the code with XXX.Consumer and xxx.Provider

## Compat:
This is looking in sep core for interoperability.
import React from "preact/compat";

## h():
Turns JSX to preact understandable form
JSX:JavaScript expression is a  code unit that resolves  a value;
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions

understand react & JSX:
https://reactjs.org/docs/introducing-jsx.html

## render():
this takes the h-value to visualisation

## Switching to react
