---
title: "Promise API and Async/Await"
date: "2019-07-03 11:30:00"
author: "Han Sim"
category: "JavaScript"
tags:
  - JavaScript
  - Asynchronous
  - Promise
  - Callback
  - Ajax
  - Async-Await
  - Functional-Programming
---

> “A promise is an object that may produce a single value some time in the future”

Previous Post: http://blog.hansim.dev/asynchronous-javascript-and-callback-function

# Promise API

> The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

```JavaScript
var promise1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('foo');
  }, 300);
});

promise1.then(function(value) {
  console.log(value);
  // expected output: "foo"
});

console.log(promise1);
// expected output: [object Promise]
```

## Promise is in one of these states:

- pending: initial state, neither fulfilled nor rejected.
- fulfilled: meaning that the operation completed successfully.
- rejected: meaning that the operation failed.

### Pending

If we call `new Promise()` method, it is now in the `Pending` state. **When we call `new Promise()` method, we can access to `resolve` and `reject` as a paramter of Callback Function.**

```JavaScript
new Promise(function (resolve, reject) {
  // ...
});
```

### Fullfilled

```JavaScript
new Promise(function (resolve, reject) {
  resolve();
});
```

When it executes the parameter `resolve` of Callback Function, it is now in the `Fulfilled` state. If the promise is in this state, we can get results by using `then()`.

```JavaScript
function getData() {
  return new Promise(function (resolve, reject) {
    var data = 100;
    resolve(data);
  });
}

//get result by using "then"
getData().then(function (resolvedData) {
  console.log(resolvedData); // 100
});

```

> If the promise is `fulfilled`, we can say it is **complete** now.

### Rejected

When it executes the parameter `reject` of Callback Function, it is now in the `Rejected` state. If the promise is in this state, we can get results by using `catch()`.

```JavaScript
new Promise(function (resolve, reject) {
  reject();
});
```

We can get the reason of the error.

```JavaScript
getData().then().catch(function (err) {
  console.log(err); // Error: Request is failed
});
```

## Example: Ajax Communication with Promise

```JavaScript
function getData() {
  return new Promise(function (resolve, reject) {
    $.get('api.com/1', function (response) {
      if (response) resolve(response);
      reject(new Error("Request is failed"));
    });
  });
}

getData().then(function (data) {
  console.log(data); // response
}).catch(function (err) {
  console.error(err); // why error?
});
```

## Example: my real code in Node.js

This is from my full-stack web development project: https://blog.hansim.dev/full-stack-web-development-with-express-and-handlebars (**Node.js/Express**)

Briefly, in `data-service.js` file, I have helper functions that handle data using `sequelize`. I used `Promise` as this needs to be synchronized (ajax communication).

This is **a chain of two promises**. If `sequelize.sync()` is `resolved`, `then` we resolve this Promise. If this promise is `resolved` too, the Node.js/Express server finally renders "employees" page using Template Engines.

```JavaScript
module.exports.getAllEmployees = () => {
    return new Promise((resolve, reject) => {
        sequelize.sync()
        .then(() => { resolve(Employee.findAll()); })
        .catch((err) => { reject("No result returned. " + err); });
    });
}
```

I called the `getAllEmployees()` function in `server.js`. If the promise is resolved, it renders "employees" with `data`(response). Otherwise, it catches the error and renders "employees" with error messages.

```JavaScript
app.get('/employees', (req, res) => {
  dataService.getAllEmployees().then((data) => {
      res.render("employees", {employees: data});
  }).catch((err) => {
      res.render("employees", {message: "no results"});
  });
});
```

## `Promise.all()` and `Promise.race()`

```JavaScript
const a = new Promise((resolve, reject) => resolve("a"))
const b = new Promise((resolve, reject) => resolve("b"))
const c = new Promise((resolve, reject) => resolve("c"))
const d = new Promise((resolve, reject) => resolve("d"))
const e = new Promise((resolve, reject) => resolve("e"))

Promise.all([a, b, c, d, e]).then(data => console.log(data)) //[ 'a', 'b', 'c', 'd', 'e' ]
Promise.race([a, b, c, d, e]).then(data => console.log(data)) //a
```

# `async`/`await`

`async/await` is just another way to use `Promise API`. Using Promise is way more easy with async/await.

## A function with an `async` keyword --> always return `Promise`

It is that simple: the function below returns `Promise`

```JavaScript
async function foo() {
  return "success";
}

const result = foo();
result.then(x => console.log(x)); //"success"

//or just this way
foo().then(x => console.log(x));
```

for the readibility, we can explicitly write the code this way:

```JavaScript
async function foo2() {
  return Promise.resolve("success");
}
```

## `await` in an `async` keyworded function

**The line with an `await` keyword will wait until the `Promise` is resolved or rejected. `await` keyword can be only used within a function with an `async` keyword.**

```JavaScript{7}
async function foo() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done"), 1000)
  });

  let result = await promise;

  console.log(result); // "done"
}

foo();
```

I can rewrite this code this way:

```JavaScript
function foo() {
  return new Promise((res, rej) => {
    setTimeout(() => res("done"), 1000)
  });
}

async function displayMsg() {
  let msg = await foo();
  console.log(msg);
}

displayMsg(); //execution
```

## Examples

### Multiple steps

Source: https://alligator.io/js/async-functions/

```JavaScript
function who() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('🤡');
    }, 200);
  });
}

function what() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('lurks');
    }, 300);
  });
}

function where() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('in the shadows');
    }, 500);
  });
}

async function msg() {
  const a = await who();
  const b = await what();
  const c = await where();

  console.log(`${ a } ${ b } ${ c }`);
}

msg(); // 🤡 lurks in the shadows <-- after 1 second
```

We can use `Promise.all([...])`

```JavaScript
async function msg() {
  const [a, b, c] = await Promise.all([who(), what(), where()]);

  console.log(`${ a } ${ b } ${ c }`);
}

msg(); // 🤡 lurks in the shadows <-- after 500ms
```