---
title: "JavaScript and Prototype-based Inheritance"
date: "2019-07-17 21:22:00"
author: "Han Sim"
category: "JavaScript"
tags:
  - JavaScript
  - OOP
  - Prototype
  - Inheritance
---

```JavaScript
function Person(name) {
    this.name = name
}

han = new Person("han")
james = new Person("james")

//han is not an instance (like Java), it is an OBJECT!
han.getName = function() {
    console.log(this.name)
}
han.getName() //"han"

console.log(james)  // Person { name: 'james' }
//it doesn't have 'getName()'

//to add methods to every so-called instance, we need 'prototype chain'
Person.prototype.greeting = function() {
    console.log(this.name + " says Hi")
}
james.greeting()
```

# Does JavaScript has `class`?

The answer can be yes and no.

It has `class` keyword now in ES6, but it is just a syntax sugar over `Prototype-based Inheritance`. The `class` in JavaScript is not like the one in C++ or Java.

> Reference: [Does JavaScript have class?](https://www.google.com/search?q=JavaScript+does+not+have+class+quora&rlz=1C5CHFA_enCA796CA797&oq=JavaScript+does+not+have+class+quora&aqs=chrome..69i57.5374j0j7&sourceid=chrome&ie=UTF-8)

JavaScript does not supports `Class-based programming`; it supports `OOP` by `Prototype-based Inheritance`. JavaScript does not distinguish

## JavaScript and `objects`

A `class` is `an abstract data type`. It describes a family of objects that have the same set of methods and properties. It also defines these properties and methods.

> For example, the shape class could represent the set of all shapes in a drawing. An instance is the instantiation of a class. It is one of the members of the family that the class represents. The shape on the top left corner of the page could be an instance of the shape class, representing a single particular shape out of all shapes shown on a drawing.

JavaScript, being a prototype-based language, does not distinguish between `classes` and `instances`. **It has only `objects`, which are similar to instances. An object is a real, particular entity**. The shape on the bottom right corner of a drawing is an object. **You can use an existing object as a template for creating another object**. The second object shares the first object's properties and methods. Any object might be used as a prototype for another object. Any object can also specify its own properties and methods, adding or overriding its existing ones.

http://webreference.com/js/tips/010215.html

# In JavaScript, we just create `constructor` directly.

Every `Function Expression` is essentially a constructor.

```JavaScript
var Macbook = function(year, model) {
  this.year = year
  this.model = model

  this.getModel = function() {
    return "Macbook " + this.model
  }
}

var myFirstMac = new Macbook("2017" , "Pro")
var mySecondMac = new Macbook("2019" , "Air")

console.log(myFirstMac.getModel()); //"Macbook Pro"
console.log(mySecondMac.getModel()); //"Macbook Air"
```

I can rewrite this code using `prototype`. `prototype` works with a constructor this way.

> When a `function` is created in JavaScript, the JavaScript engine adds a `prototype property` to the function. This prototype property is an object (called as `prototype object`) which has a `constructor property` by default. The constructor property points back to the function on which prototype object is a property. We can access the function’s prototype property using `functionName.prototype.` > https://medium.com/better-programming/prototypes-in-javascript-5bba2990e04b

```JavaScript
var Macbook = function(year, model) {
  this.year = year
  this.model = model
}

Macbook.prototype.getModel = function() {
  return "Macbook " + this.model
}
```

## What's the difference??

```JavaScript
console.log(myFirstMac.getModel === mySecondMac.getModel)
//true, because getModel() method is on the prototype chain.
//  'getModel' property is not their own property

console.log(myFirstMac.hasOwnProperty('getModel')) //false
console.log(myFirstMac.hasOwnProperty('year')) //true
```

**The difference is that `myFirstMac` and `mySecondMac` now doesn't have the method `getModel()` inside anymore!** Instead, whenever `getModel()` is called, it looks up into the `prototype chain` and see if it can find `getModel()` and execute it.

We use `prototype` because it can be redundant if the same method exists in thousands of different objects. This is all because JavaScript does not have `class`! we avoid having redundant methods by using `prototype`.

# Reference

- This is a really great document regarding Prototype Chain: [MDN: Inheritance and Prototype Chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
