---
title: "Node.js and Module Object"
date: "2019-07-24 13:46:00"
author: "Han Sim"
category: "Web Development"
tags:
  - JavaScript
  - NodeJS
---

# Modularity

Node.js supports `Modularity` unlike the client-side JS. Each functions or variable is encapsulated within its module .

```JavaScript{2}
var message="hi!"
console.log(global.message) //undefined
```

The `message` variable are not accessible from the outside of its js file; it is not in a global scope.

## How does it work on the client-side (with browsers, not node)

Most of modern browsers gives an environment called `window`, the object which represents an open window. In this case, if we add functions or variables, it adds it to the global scope and it's available via `window` object.

```JavaScript
var greeting = "hi"

var sayHi = function() {
  console.log(greeting)
}

window.sayHi()
//we don't need to explicitly write window here; a browser will add window prefix.
```

This can occur some problems. **Simply think about why we should avoid global variables; it is because it may make our application work unexpected way and debugging and unit testing would be so much painful**. For example, say we define a function with the same identifier `sayHi` in other js file. Because there are two identifiers in the same scope, it'll just `override` the previous definition.

# `module` object

To use variables and functions in Node, we need to `explicitly export` them to make it `public`.

This is how module object looks like:

```JavaScript
Module {
  id: '.',
  exports: {},
  parent: null,
  filename: '/Users/han/Desktop/Dev/JavaScript/blog/src/pages/posts/nothing/tempCodeRunnerFile.js',
  loaded: false,
  children: [],
  paths:
   [ '/Users/han/Desktop/Dev/JavaScript/blog/src/pages/posts/nothing/node_modules',
   //......
   ]
}
```

We can export variables or functions and make them public.

```JavaScript{5}
var greeting = "hi" //this will be private
var sayHi = function() {
  console.log(greeting);
}

module.exports.sayHi = sayHi
```

To load the module into other modules, we use `require` function.

```JavaScript
const dataService = require("./data-service.js")

dataService.sayHi();
```

We define `const` here to prevent our code from reassigning the variables while using that module by accident. If that happens, for example, `jshint` tool can catch that error.

We also can use `module.export = sayHi` syntax instead. In this case, we don't need to use dot notation to use this function.

```JavaScript{3}
const dataService = require("./data-service.js")

dataService();
```

## What's under the hood? `Module Wrapper Function`

Our code is converted to a function; node always wrap modules within `Moduler Wrapper Function`. For example, `require` is one of the arguments that is passed to the module wrapper function and that is how each module can use `require` to use other modules.

### `function(exports, require, module, __filename, __dirname)`

- `exports` is a shortcut to `module.exports`; it is a reference to `module.exports`. However, we can't do `exports = sayHi`; because we can't change the reference. We only can do `module.exports = sayHi`.
- `require` is to bring other modules.
- `module` is used for `module.exports` mostly.
- `__firname` is a complete path to the file whereas `__dirname` is a complete path to the directory where the file is stored.

# Some Useful built-in modules in Node.js

For example, `console` is one of the built-in modules in Node.js(like, `global.console.log(hi!)`! It works like `window.console` on browser JS runtime environments. Check the official document [here](https://nodejs.org/dist/latest-v10.x/docs/api/)

## Path

```JavaScript
const path = require("path")

console.log(path.parse(__filename))
```

`parse` method will parse the given path effectively like below.

```JavaScript
{
  root: '/',
  dir: '/Users/han/Desktop/Dev/JavaScript/blog/src/pages/posts/nothing',
  base: 'nothing.js',
  ext: '.js',
  name: 'nothing'
}
```

When it comes to path, using `path` module will make things so much easier than just handling string.

## `OS`

This is to get information from the current OS.

```JavaScript
const os = require("os")

console.log(`total memory: ${os.totalmem()}`)
console.log(`free memory: ${os.freemem()}`)
```

output:

```
total memory: 8589934592
free memory: 223195136
```

## `FS`: File System

Methods in `fs` are always paired: Non-blocking(Asynchronous) and blocking(Synchronous). It is always recommended to use non-blocking code for the better performance and taking advantages of using JavaScript. **Node has a single thread so make sure always use asynchronous!** Synchronous codes are there just for simplicity.

```JavaScript
const fs = require("fs")

fs.readdir(__dirname, (err, result) => {
  if (err) console.log(err)
  else console.log(result)
})
//it returns an array of the file names inside the given directory, if it is resolved.
```

## Event: `EventEmitter`

`events` module has only one class, `EventEmitter` (\*if it is class, we do capitalization including the first letter)

```JavaScript
const EventEmitter = require("events")
const emitter = new EventEmitter()

//to register a listener
emitter.on('messageLogged', () => {
    console.log("Listener called")
})

//to raise an event; you're literally making a 'noise' to your application by calling emit() method.
emitter.emit('messageLogged')
```

We can use this with `event arguments`

```JavaScript
emitter.on('messageLogged', (arg) => {
  console.log("Listener called", arg)
})

emitter.emit('messageLogged', { id: 1, url: "https://blog.hansim.com" })
```

## HTTP module

This is to create networking application. We can create a web server that listens to the HTTP request on a given port. We can easily create a back-end service for our client application such as web or mobile applications using this `http` module.

```JavaScript
const http = require("http")

const server = http.createServer((req, res) => {
  if(req.url === "/") {
    res.write("hello world")
    res.end()
  }
})

server.on('connection', (socket) => {
  console.log("new connection")
}) //in real world, we don't respond to the connection event for each connection. this is just for practice!

server.listen(3000)
```

We need to handle many requests in real world
