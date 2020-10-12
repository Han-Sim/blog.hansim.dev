---
title: "Object-oriented Programming Syntax in JavaScript"
date: "2019-07-17 20:16:00"
author: "Han Sim"
category: "Web Development"
tags:
  - JavaScript
  - OOP
---

# Object Oriented Programming with JavaScript

## 4 pillars of Obejct-Oriented Programming

```
Car Object
- Property: Color, Make
- Method: Move, Stop
```

- Encapsulation
  - Property and method are encapsulated.
  - Less parameters for functions as method can access properties without having arguments.
  - The fewer parameters, the easier to maintain and use that function.
- Abstraction
  - Hide all the complexity.
  - Benefit 1) **Simpler interface**
  - Benefit 2) **Reduce the impact of change**: Say we change private methods or properties, but it is still hidden and does not change the application outside of the hidden unit
- Inheritance
  - To eliminate redundant codes
- Polymorphism
  - Many Form
  - Code gets simpler --> one line of code can act in a several different way depending on the object.

# Objects in JavaScript

## Literal Syntax

```JavaScript
const circle = {
  // properties: to hold values
  radius: 1,
  location: {
    x: 1,
    y: 1
  },

  // methods: to define some logics
  draw: function() {
    console.log("drawing");
  }
}

circle.draw();
```

This syntax can be used too

```JavaScript
const circle = new Object()
circle.radius = 1
circle.location = {
  x : 1,
  y : 1
}
circle.draw = function() {
  console.log("drawing")
}
```

However, in order to have two or more instances, we need factory function or constructor function

### Factory Function

Factory function is a function that **returns an object**.

```JavaScript
// factory function
function createCircle(radius) {
  return {
    // properties: to hold values
    radius, // same as 'radius: radius'
    draw: function() {
      console.log("drawing: " + this.radius);
    }
  }
}

const circle1 = createCircle(1);
circle1.draw();
const circle2 = createCircle(3);
circle2.draw();
```

### Constructor Function

`this` keyword.

For C++ developers, constructor functions can be preferred to Factory functions. Because it looks like we instantiate class by new keyword (**but JavaScript does not have class!!**)

> Reference: [Does JavaScript have class?](https://www.google.com/search?q=JavaScript+does+not+have+class+quora&rlz=1C5CHFA_enCA796CA797&oq=JavaScript+does+not+have+class+quora&aqs=chrome..69i57.5374j0j7&sourceid=chrome&ie=UTF-8)

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

### Literal Syntax Uses Built-in Constructor Function

```JavaScript
let x = {};
new String(); // '', "", ``
new Boolean(); // true, false
new Number(); // 1, 2, 3...
```

## Functions are object

### call/apply method

```JavaScript
Circle.call({}, 1); // {} --> this object
Circle.call(window, 1); // window object

Circle.apply({}, [1,2,3]); // apply passes the array.
```

## Value types vs Reference types

- Value Types
  - Number
  - String
  - Boolean
  - Symbol (new in es6)
  - undefined
  - null
- Reference types
  - Object
  - Function
  - Array

### Copy by value

```JavaScript
let x = 10;
let y = x;
x = 20;
console.log(y); // 10
```

### Copy by reference

```JavaScript
let x = {value: 10};
let y = x;
/**
 * x and y are pointing to the same object in memory where {value: 10};
 */
x.value = 20;
console.log(y); // 20
```

- **Primitives are copied by value**
- **Objects are copied by the reference**
  - Which means, objects are mutable

### Copy by value

```JavaScript
let number = 10 // primative type

function increase(number) {
  number++
}

increase(number)
console.log(number) // 10
```

### Copy by reference

```JavaScript
let obj = {value: 10} // reference types

function increase(obj) {
  obj.value++;
}

increase(obj);
console.log(obj); // {value: 11}
```

## How to update properties

### add

#### 1. Dot Notation

```JavaScript
circle.location = {
  x : 1
}; // dot notation
```

#### 2. Bracket Notation

```JavaScript
circle['location'] = {
  x : 1
}; // bracket notation
```

##### When to use bracket notation (which seems more complicated than dot notation)

**When the name of a property is not valid identifiers e.g. special characters, white spaces...**

```JavaScript
const propertyName = 'center-location';
// circle.center-location = {x: 1}; --> Syntax error
circle[propertyName] = {x: 1};
```

### delete

We can simply use `delete` keyword to delete the property.

```JavaScript
delete circle.location;
delete circle['location'];
```

## Enumerating Properties

```JavaScript
// for in loop
for (let key in circle) {
  if (typeof circle[key] !== "function")
    console.log(key, circle[key]);
  // only properties will appear on the console
}

// another approach to get all the keys from object.
//   we cannot separate properties from methods on this approach
const keys = Object.keys(circle);
console.log(keys);

// if... in...
if ("radius" in circle)
  console.log("Circle has a radius")
```

## Abstraction

```JavaScript
function Circle(radius) {
  this.radius = radius;
  this.defaultLocation = { x: 0, y: 0 }; // complex detail

  this.computeOptimumLocation = function(factor) {
    // .....complex detailed codie
  };

  this.draw = function() {
    this.computeOptimumLocation(0.1);
    console.log("drawing");
  };
}
// we only want to show radius and draw which are essential to public
```

What if computeOptimumLocation shouldn't be accessed? if calling it improperly can put the object in the bad states?
--> Abstraction is needed: We should hide the details(complexities) and show the essentials only.

### How to implement abstraction in JavaScript?

Local variable / closure

```JavaScript
function Circle(radius) {
  // local var inside the function
  // --> dies when it goes out of its scope.
  let defaultLocation = { x: 0, y: 0 };
  let computeOptimumLocation = function(factor) {};

  this.radius = radius;

  // closure
  this.draw = function() {
    computeOptimumLocation(0.1);
    console.log("drawing");
  };
}
```

computeOptimumLocation **stays** in memory (they will preserve its state) cause it is now a part of a closure function!! --> So it's now acting like a **private property**

## Getter/Setter

```JavaScript
function Circle(radius) {
  this.radius = radius;

  let defaultLocation = { x: 0, y: 0 };

  // this approach can only allow them to read defaultLocation
  this.getDefaultLocation = function() {
    return defaultLocation;
  }

  this.draw = function() {
    console.log("drawing");
  };

  // Using Object constructor --> getter/setter
  Object.defineProperties(this, 'defaultLocation', {
    get: function() { // getter
      return defaultLocation
    }
    set: function(value) { // setter
      if(!value.x || !value.y) // setter can do validation!
        throw new Error('Invalid location');
      return defaultLocation = value;
    }
  } );
}

const circle = new Circle(10);
circle.draw();

```

# References

- [w3schools: JS Object](https://www.w3schools.com/js/js_object_definition.asp)
- [Youtube OOP tutorial](https://www.youtube.com/watch?v=PFmuCDHHpwk)
