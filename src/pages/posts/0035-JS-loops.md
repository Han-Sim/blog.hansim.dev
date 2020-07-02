---
title: "JavaScript Loops and Iterables"
date: "2019-07-26 00:48:00"
author: "Han Sim"
category: "Web Development"
tags:
  - JavaScript
  - Loop
  - Iterable
  - JavaScript-Technique
---

# Different Kinds of Loop

- `for` - loops through a block of code a number of times
- `for/in` - loops through the properties of an object
- `for/of` - loops through the values of an iterable object
  - it loops over data structures that are iterable such as `Arrays`, `Strings`, `Maps`, `Set`, and more.
- `while` - loops through a block of code while a specified condition is true
- `do/while` - also loops through a block of code while a specified condition is true

# JS Techniques to Iterate Over Properties in Object

## Simplest solution is the `for-in` loop

```JavaScript
let person = {
  name: "han",
  hobby: "cooking"
}

for (let key in person) {
  console.log(key, " : ", person[key])
}
```

But be careful! The enumeration will return properties not just of the object being enumerated, **but also from the prototypes of any parent objects.**

```JavaScript
let person = {
  name: "han",
  hobby: "cooking"
}

//add getName() method to the prototype chain.
// the object 'Object' is the parent object of every JS object
//
Object.prototype.getName = function() {
  return this.name
}

for (let key in person) {
  console.log(key, " : ", person[key])
}
```

```
output
name  :  han
hobby  :  cooking
getName  :  function () {
  return this.name
}
```

To avoid this, we can use `hasOwnProperty()` method to check if it is in the prototype chain or not.

```JavaScript
for (let key in person) {
  if(person.hasOwnProperty(key))
    console.log(key, " : ", person[key])
}
```

## `for-of` loop with `Object.entries(obj)`

```JavaScript
const object1 = {
  a: 'somestring',
  b: 42
};

for (let [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`);
}

// expected output:
// "a: somestring"
// "b: 42"
// order is not guaranteed
```

`for-in` enumerates properties in the prototype chain as well, but `Object.entries()` doesn't.

```JavaScript
//constructor with function expression
var Macbook = function(year, model) {
  this.year = year
  this.model = model
}

//add getModel() to the prototype chain
Macbook.prototype.getModel = function() {
  return "Macbook " + this.model
}

var myMac = new Macbook(2018, "macbook pro")

console.log("----- for-of with Object.entries -----")
for (let [key, value] of Object.entries(myMac)) {
  console.log(key, " : ", value)
} //only 'year' and 'model' are enumerated.

console.log("\n----- for-in loop -----")
for (let x in myMac) {
  console.log(x, " : ", myMac[x])
} //it catches getModel() method as well since for-in loop searchs for the prototype chain as well
```

output:

```
----- for-of with Object.entries -----
year  :  2018
model  :  macbook pro

----- for-in loop -----
year  :  2018
model  :  macbook pro
getModel  :  function () {
  return "Macbook " + this.model
}
```

## Using `Object.keys(obj)`

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

> The `Object.keys(obj)` method returns an array of a given object's own property names, in the same order as we get with a normal loop.

Because Object.keys(obj) returns an **array** which is `iterable`, there are many ways to iterate this.

```JavaScript
const myObj = {
  name: "han",
  age: 29,
  address: "toronto"
}

Object.keys(myObj).forEach((key, index) => {
  console.log(`${key} : ${myObj[key]}`)
})

/* output:
    name : han
    age : 29
    address : toronto
*/
```

# Iterable Objects

We can use `for..of`

- String
- Array
  - `Array.prototype.forEach()`
- Map
- Set
- NodeList: https://developer.mozilla.org/en-US/docs/Web/API/NodeList
- as we just saw, `Object.entries()`

```JavaScript
const str = "hansim"
for (char of str) console.log(char)

const set = new Set([1, 2, 3, 3, 4])
for (x of set) console.log(x)  //1, 2, 3, 4
```

For Arrays, we can use `forEach()` method.

```JavaScript
var array1 = ['a', 'b', 'c'];

array1.forEach(function(element) {
  console.log(element);
});
```

## Symbol.iterator

> References: https://alligator.io/js/iterables/
