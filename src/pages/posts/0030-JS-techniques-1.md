---
title: "JavaScript Techniques #1"
date: "2019-07-25 01:40:00"
author: "Han Sim"
menu: "Web Development"
category: "JavaScript"
tags:
  - JavaScript
  - Closure
  - Array
  - Object
  - Bind
  - React
  - JavaScript-Technique
---

This is about JavaScript coding problems, techniques, and tricky but basic fundamentals of JavaScript. This is the list of the related posts(https://blog.hansim.dev/tag/JavaScript-Technique).

# How to add element to array into the first position?

```JavaScript
let arr = [ 1, 2, 3 ]
arr.unshift(0)  //first way
arr = [-1, ...arr]  //second way

console.log(arr) // [-1,0,1,2,3]
```

# How to create a private variable

because there is no class in JavaScript, we have to do some extra works.

```JavaScript
const Foo = function(arg) {
  var secretCode = arg;

  this.getSecretCode = function() {
    return secretCode;
  }
}

const obj = new Foo("bye")
console.log(obj.secretCode) //undefined
console.log(obj.getSecretCode()) //bye
```

We need `getter` method to get secretCode. [See more about prototype and OOP in JavaScript here in my post](https://blog.hansim.dev/javascript-and-prototype-based-inheritance)

# `bind`

```JavaScript
var person = {
  _name : "han",
  getName : function() {
    return this._name
  }
}
var stoleIdentity = person.getName;

console.log(stoleIdentity()) //undefined
console.log(person.getName()) //han
```

## It is because `stoleIdentity` is a new variable but not bound!

We have to declare that **"Stick the `person` object onto this new variable `stoleIdentity`"**. We can do this by using `bind()` method(*this is why we 'bind' in React(more posts related to react: https://blog.hansim.dev/category/react-react-native)*)

```JavaScript
var stoleIdentity = person.getName.bind(person)
console.log(stoleIdentity()) //"han"
```

This is another example from [the MDN doc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind).

```JavaScript
var module = {
  x: 42,
  getX: function() {
    return this.x;
  }
}

var unboundGetX = module.getX;
console.log(unboundGetX()); 
// The function gets invoked at the global scope
// expected output: undefined

var boundGetX = module.getX.bind(module);
console.log(boundGetX());
// expected output: 42
```

Even when we declare functions inside the JS class or function, it can lost its context easily! For example, `Event Handlers` in React Component lose its context, so we have to `bind` them.

> Good resource here: https://javascript.info/bind

# `+` and `-`

```JavaScript
console.log(2 + '2') //22; + concats them if one of them are string.
console.log(2 - '2') //0; - sign is only number operator! it only works with numbers so it converts stirng into a number
```