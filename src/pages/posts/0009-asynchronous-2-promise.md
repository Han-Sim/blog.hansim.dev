---
title: "Promise API and Async/Await"
date: "2019-07-03 11:30:00"
author: "Han Sim"
category: "JavaScript | Node.js"
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

## Example1. Ajax Communication with Promise

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

## Example2. real code in Node.js

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
