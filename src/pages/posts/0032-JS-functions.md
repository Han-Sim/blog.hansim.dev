---
title: "JavaScript Functions in Brief"
date: "2019-07-25 15:17:00"
author: "Han Sim"
category: "JavaScript | Node.js"
tags:
  - JavaScript
  - Function
  - Arrow-Function
  - This
  - React
  - Scope
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
3. `Function Expression` is essentially a `constructor function`. https://blog.hansim.dev/object-oriented-programming-syntax-in-javascript

```JavaScript
function Circle(radius) {
  this.radius = radius

  this.draw = function() {
    console.log("drawing: " + this.radius)
  }
}

const another = new Circle(1)
another.draw()
```

# Closure

A closure is simply a function defined within another function(Closure are nested function which has access to the outer scope). However, the power of closures is derived from the fact that the inner function remembers the environment in which it was created. In other words, the inner function has access to the outer function’s variables and parameters. 

https://blog.hansim.dev/so-why-do-we-need-closure

## Factory Function with Closure ---> truly private variable

`Singleton`is an object that is meant to have only one instance during the execution of the program. Because function() is `anonymous` and called right after its definition, we cannot create anymore object from this factory function. We only can use `get` and `increment` method only by using `singleton` instance. `private_counter` is now truly private.

```JavaScript
//factory function (function that returns an object)
var singleton = function(){
  var private_counter = 0;
  return {
      get: function () {
          return "Counter: " + private_counter;
      },
      increment: function() {
          private_counter++;
      }
  };
}();  // Attention Here - the singleton is the result of this function's call

console.log(singleton.get()); //0
console.log(singleton.get()); //0

singleton.increment(); 
console.log(singleton.get()); //1
singleton.increment(); 
console.log(singleton.get()); //2
```

# `IIFE` (Immediately Invoked Function Expression)

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

http://blog.hansim.dev/asynchronous-javascript-and-callback-function

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

## Arrow Function (ES6+)

> https://medium.com/tfogo/advantages-and-pitfalls-of-arrow-functions-a16f0835799e

Arrow Function is not just a syntactic sugar!!!

### Arrow Function can be a simple solution for losing `this` context.

> Roughly speaking, `Context` is the object that calls the function.
> For example, `setTimeout()` is called by `global`(or `window` in browser) so `this` is `global` or `window`, even though it was defined within some other object.

**`classic JS Functions`(other than `Arrow Function`), such as `splitName` below, have its own `this` no matter where it lies.** Even though `splitName` is under the property `setName` of the `profile` object, it has its own `this` context that is bound to `global`(node) or `window`(browser) object.

```JavaScript
const profile = {
  fName: "",
  lName: "",
  setName: function(name) {
    console.log(this === profile) //true
    let splitName = function() {
      console.log(this === global) //true
      let nameArray = name.split(' ')
      this.fName = nameArray[0]
      this.lName = nameArray[0]
    }

    splitName()
  }
}

profile.setName("han sim")
console.log(profile.fName) //still an empty string

console.log(global.fName) //'han' (I used node here to compile this js file)
//console.log(window.fName) //'han' (If this is in a browser JS runtime environment)
```

`fName` is not bound to `profile` because it lost `this` context here; it binds to `global`(node) or `window`(browser) scope now.

**We can fix this unexpected behaviour by using `Arrow Function`, because it doesn't have its own `this` unlike other functions. It borrows `this` from its lexical scope automatically.**

```JavaScript
const profile = {
  fName: "",
  lName: "",
  setName: function(name) {
    let splitName = () => {
      let nameArray = name.split(' ')
      this.fName = nameArray[0]
      this.lName = nameArray[0]
    }

    splitName()
  }
}

profile.setName("han sim")
console.log(profile.fName) //'han'
```

This is why we use `Arrow Function` in `React`, especially for `event handlers` inside the React.Component extended Class.

#### we can use `bind`, `call`, or `apply` as well.

Those methods give `context` manually no matter where we define the function.

```JavaScript
const profile = {
  fName: "",
  lName: "",
}

let setName = function(name) {
  let splitName = () => {
    let nameArray = name.split(' ')
    this.fName = nameArray[0]
    this.lName = nameArray[0]
  }

  splitName()
} //setName function binds to window object

setName = setName.bind(profile) //--> setName function binds to profile object.
setName("han sim")

console.log(profile.fName) //'han'
```

> Find this document to understand `this` and context. I think this comes with a perfect explanation: [MDN doc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this?source=post_page--------------------------)
> [MDN: Lexical Scoping](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures?source=post_page---------------------------)

### Arrow Function cannot be a `constructor`

Because it has not `prototype` prototype so it can't be used with `new`.

### Arrow Function does not have a `arguments`

We have to use `spread operator` instead.

```JavaScript
let sumUp = (...args) => {
  return args.reduce((a, b) => {
    return a + b
  }, 0)
}
sumUp(1, 2, 3) // 6
```

If there is one return line, we can simply remove `{}` and `return`.

```JavaScript
let sumUp = (...args) => args.reduce((a,b) => a + b, 0)
```