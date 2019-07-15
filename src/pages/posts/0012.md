---
title: "Asynchronous JavaScript: async/await"
date: "2019-07-14 14:53:00"
author: "Han Sim"
category: "JavaScript | Node.js"
tags:
  - JavaScript
  - Asynchronous
  - Promise
  - Callback
  - Async-Await
---

Last post: https://blog.hansim.dev/asynchronous-javascript-callback-function-and-promise-api

`async/await` is just another way to use `Promise API`. Using Promise is way more easy with async/await.

# A function with an `async` keyword --> always return `Promise`

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

# `await` in an `async` keyworded function

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

# Examples

## Multiple steps

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