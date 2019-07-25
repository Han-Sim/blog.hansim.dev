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