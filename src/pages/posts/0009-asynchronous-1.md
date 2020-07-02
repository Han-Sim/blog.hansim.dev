---
title: "Asynchronous JavaScript and Callback Function"
date: "2019-07-03 11:27:00"
author: "Han Sim"
category: "Web Development"
tags:
  - JavaScript
  - Asynchronous
  - Promise
  - Callback
  - Ajax
  - Async-Await
  - Functional-Programming
---

> Asynchronous programming means that the engine runs in an `event loop`. When a blocking operation(that takes time to finish i.e. fetch) is needed, instead of blocking the event loop, the request is just started while the code keeps running without blocking for the result. When the response is ready, an interrupt is fired, which causes an event handler to be run, where the control flow continues.
> `User interfaces` are asynchronous by nature. It spends most of their time waiting for user input to interrupt the event loop and trigger event handlers.
> https://trello.com/c/5TzQwzMJ/80-what-is-asynchronous-programming-and-why-is-it-important-in-javascript

# Asynchronous

In JavaScript, lots of operation are done in an `asynchronous` way. To understand `asynchronous programming`, I used this resource: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous. **Asynchronous** means JavaScript does _not_ stop executing the code while it is being executed; JS just starts executing the next code.

```JavaScript
//setInterval() is asynchronous
let timer = setInterval(function() {
    console.log('I am an asynchronous message');
}, 1000);

console.log('I am a synchronous message'); //this will be displayed first.
```

## Examples 1: jQuery `ajax` communication

```JavaScript
function getData() {
	var data;
	$.get('https://api.com/products/1', function (res) {
		data = res;
	});
	return data;
}

console.log(getData());
```

Because JavaScript is asynchronous, `console.log(getData());` line returns `undefined`. It does not wait for `get` communication, instead, it just returns `data` variable which is undefined yet.

## Example 2: `setTimeout()`

This is probably the most common example that I can find anywhere.

```JavaScript
// #1
console.log('Hello');
// #2
setTimeout(function () {
	console.log('Bye');
}, 3000);
// #3
console.log('Hello Again');
```

Because `setTimeout` is asynchronous as well, a browser runs `console.log('Hello Again');` before it runs `setTimeout(...)`.

```
Hello
Hello Again
Bye
```

# Solution: `Callback Function`

```JavaScript
let x = function() {
  console.log("being called inside another function");
};

let y = function(callback) {
  callback();
};

y(x);
```

A callback is a function that is to be executed after another function has finished executing — hence the name ‘call back’. [cordburst.io posting](https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced)

With callback function, we can manage Asynchronous and execute them in sequence. This is how I solve the `ajax` call problem I mentioned above.

```JavaScript
//create callback function
function doHomework(subject, callback) {
  alert(`Start homework: ${subject}`); //this will be executed first
  callback(); //second
}

//call it
doHomework('math', function() {
  alert("Finished");
});
```

## `callback` and `functional programming`

`callback` makes code much cleaner as it is an essential part of `functional programming style`.

For example, without `callback`, we need conditional **statement** in below example. The code is really not abstract but more declarative explicitly showing 'how to solve' the problem.

```JavaScript
let calculator = function(a, b, type) {
  if (type === "add") {
    return a + b
  } else if (type === "multi") {
    return a * b
  }
}

console.log(calculator(10, 10, "add"))
```

However, with `callback`, **we can make code without statements and hence the code is much simpler**.

```JavaScript
let add = function(a, b) {
  return a + b
}

let multi = function(a, b) {
  return a * b
}

let calculator = function(a, b, callback) {
  if(typeof callback === "function") //for type safety
    return callback(a,b)
}

console.log(calculator(10, 10, add))
```

**Also, now as an user, I can create any function and just pass it to the `calculator` function in order to change the behaviour; I can entirely change the function's behaviour without changing its definition.** This is the beauty of functional programing; it makes code abstract.

```JavaScript
calculator(10, 10, function(a,b) {
  console.log(`the input number: ${a}, ${b}`)
})
```

Other example is `sort()`. It is built-in method that we can use. If we just do `sort()`, it basically sort by ascending order, but only for `alphabetical order by default`. **However, we can change its entire behaviour as it allows to pass `callback`.**

```JavaScript
const arr = [100, 23, 31, 4];

arr.sort((a, b) => a - b);
console.log(arr); // [ 4, 23, 31, 100]
arr.sort((a, b) => b - a);
console.log(arr); // [ 100, 31, 23, 4

arr.sort((a, b) => {
  if (a > b) return 1; //if its positive, it does 'swap'.
});
console.log(arr) // [ 4, 23, 31, 100]
```

> More about `Functional Programming`: https://blog.hansim.dev/functional-programming-in-simple-english

### callback example in React: `setState()`

How to `setState()` correctly? https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous

```JavaScript
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));

//or.. (without Arrow Syntax)
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

## Asynchronous and callback

```JavaScript
function getData(callback) {
	$.get('https://api.com/products/1', function (res) {
		callback(res); //pass 'res' from the server to callback function
	});
}

getData(function(data) {
  console.log(data);
})
```

### Problem: `Callback Hell`

However, if there is a lot of logic that needs to be executed in sequence, using callback function can be really messy as hell. This is called **Callback Hell**.

Ref: https://blog.hellojs.org/asynchronous-javascript-from-callback-hell-to-async-and-await-9b9ceb63c8e8

To solve this problem, we need **Promise** or **async/await**. I'll discuss about **Promise API** on [next post](http://localhost:8000/promise-api-and-asyncawait)
