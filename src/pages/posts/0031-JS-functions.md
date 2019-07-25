---
title: "JavaScript Functions in Brief"
date: "2019-07-25 13:17:00"
author: "Han Sim"
category: "JavaScript | Node.js"
tags:
  - JavaScript
  - Function
---

# Function Expression vs Declaration

There are more differences than just a syntactical difference

```JavaScript
console.log(funcD()) //hi
console.log(funcE()) //undefined

function funcD() {
  return("hi")
}

const funcE = function() {
  return("hi")
}
```

1. `Function Expression` follows its variable scope; which means, if it is `let` or `const`, it is not going to be hoisted. `Function Declaration` is always hoisted though.
2. If we want to pass the function to other function, we have to use `Function Expression` instead of `Function Declaration`. Because `Function Expression` is a variable. **Treating function as value** is one of the feature of JavaScript as a `Functional Programming` Language. https://blog.hansim.dev/functional-programming-in-simple-english

# Constructor

# Closure


# IIFE

https://mariusschulz.com/blog/use-cases-for-javascripts-iifes

## 1. `IIFE` gives a block scope to `var`

```JavaScript
(function() {
  var foo = "bar";
  console.log(foo);
})();

foo; // ReferenceError: foo is not defined
```

## 2. `IIFE` with `closure` --> to create truly private state

```JavaScript
const uniqueId = (function() {
  let private = 0;
  
  //return a function that has access to the variable in its outer scope
  return function() {
    ++private;
    return `id_${private}`;
  };
})();

console.log(uniqueId()); // "id_1"
console.log(uniqueId()); // "id_2"
console.log(uniqueId()); // "id_3"
```

Note that **the private variable is inaccessible from outside of the IIFE**. Except for the function that's being returned, nobody can read or modify the private variable. This allows for the creation of truly private state that can only be modified in a controlled fashion. Neither `let` nor `const` is a replacement for an IIFE returning a function that closes over some local variables to manage private data.

```JavaScript
const counter = (function() {
  let private = 0;

  //return an object that has access to the variable in its outer scope
  return {
    increment() {
      ++private;
    },

    get value() {
      return private;
    }
  };
})();

counter.increment();
console.log(counter.value); // 1

counter.increment();
counter.increment();
console.log(counter.value); // 3
```

See more about `get` syntax here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get

# Callback function

A callback is a function that is to be executed after another function has finished executing — hence the name ‘call back’. (https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced)

https://blog.hansim.dev/asynchronous-javascript-callback-function-and-promise-api/

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
