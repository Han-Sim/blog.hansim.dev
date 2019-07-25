---
title: "JavaScript Techniques #3"
date: "2019-07-25 11:56:00"
author: "Han Sim"
category: "JavaScript | Node.js"
tags:
  - JavaScript
  - JavaScript-Techniques
---

This is about JavaScript coding problems, techniques, and tricky but basic fundamentals of JavaScript. This is the list of the related posts(https://blog.hansim.dev/tag/JavaScript-Techniques).

# Data Types in JavaScript

The latest ECMAScript standard defines `eight data types`. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types

- `Seven data types` that are primitives:
  - Boolean
  - Null
  - Undefined
  - Number
    - the number type has three symbolic values: `+Infinity`, `-Infinity`, and `NaN` (not-a-number).
  - BigInt
    - The BigInt type is a numeric primitive in JavaScript that can represent integers with arbitrary precision. With BigInts, you can safely store and operate on large integers even beyond the safe integer limit for Numbers. A BigInt is created by appending n to the end of an integer or by calling the constructor. \*[Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#BigInt_type)
  - String
  - Symbol
- and `Object`

# `truthy` and `falsy`

A `falsy` value is a value that is considered false when encountered in a Boolean context. There are `six falsy`

- `false`: The keyword false
- `0`: The number zero
  - BigInt, when used as a boolean, follows the same rule as a Number. `0n` is falsy.
- `An empty string` (the length of the string is zero)
- `null`: the absence of any value
- `undefined`
- `NaN`: - not a number

Everything else is `truthy`. for example,

- `'0'` (a string containing a single zero)
- `'false'` (a string containing the text “false”)
- `[]` (an empty array)
- `{}` (an empty object)
- `function(){}` (an “empty” function)

https://www.sitepoint.com/javascript-truthy-falsy/

## `Boolean`, `Number` and `String` can be defined as an object or as a primitive.

https://www.w3schools.com/js/js_object_definition.asp

```JavaScript
let x = Number('09');
typeof x; // 'number'

let x = new Number('09');
typeof x; // 'object'

Number('1') === new Number('1'); // false
```

we can use `parseInt()` built-in function to convert string into number

```JavaScript
console.log(typeof(parseInt("01"))) //number
```

# Definition of Prototypical Inheritance

This is to make objects much lighter without carrying many of methods. Every object has a property called `prototype`. When we create another new object, it'll automatically inherit the property from the parent. If we call a `method`, JavaScript search its own properties first and then search the `prototype chain` to find the matching identifier and execute it.

> Again, JavaScript does not have `class` or `instances` per se (at least like the one in OOP languages such as C++), it just copies one objects to create another objects. If there are 1,000 instances with one method, it's not just one actually; there are 1,000 methods. To solve this problem, `JavaScript` supports `prototype-based inheritance`. [See more.. (my post)](https://blog.hansim.dev/javascript-and-prototype-based-inheritance)

```JavaScript
const person = function(name) {
  this.name = name
}

person.prototype.getName = function() {
  return this.name
}

const han = new person("han")
console.log(han.getName())
```

# `setTimeout()`

```JavaScript
setTimeout(function() {
  console.log('a')
}, 0)

console.log('b')
console.log('c')

/*
output:
b
c
a
*/
```

Even though we have `0` time out, it is not executed right away. It is still asynchronous and it will wait until everything on stack is finished. so `console.log('b')` and `console.log('c')` are going to be on the stack and executed first, and then `asynchronous` is executed.

# `null` vs `undefined`

Both represent an empty value

- `undefined`: This is something JS does for you automatically. When you define a variable but not assign a value to it, JS puts a placeholder for this variable which is `undefined`.
  - `typeof(undefined)` is `undefined`.
- `null`: This is what you do intentionally. If there is a value and I want to clean it up, we can assign `null`. _it is still possible to assign `undefined` manually, but you shouldn't do it_
  - `typeof(null)` is `object`. `null` is `object`.
