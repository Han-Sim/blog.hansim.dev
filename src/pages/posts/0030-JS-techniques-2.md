---
title: "JavaScript Techniques #2"
date: "2019-07-25 02:39:00"
author: "Han Sim"
category: "JavaScript"
tags:
  - JavaScript
  - Closure
  - Array
  - Object
  - Bind
  - React
  - JavaScript-Techniques
---

This is about JavaScript coding problems, techniques, and tricky but basic fundamentals of JavaScript. This is the list of the related posts(https://blog.hansim.dev/tag/JavaScript-Techniques).

# `+` and `-`

```JavaScript
console.log(2 + '2') //22; + concats them if one of them are string.
console.log(2 - '2') //0; - sign is only number operator! it only works with numbers so it converts string into a number
```

# Eliminate duplicate elements

```JavaScript
let arr = [ 1, 2, 2, 3]

//Simplest solution would be using 'Set' data structure
//  'Set' doesn't allow the entry of duplicate data.
//   Set is an object,
//   so we can convert it into an array using spread operator.
console.log([...new Set(arr)]) //[1,2,3]
```

# make `var` not accessible from its outside of scope

It can happen because for example, if we need to use `var` for older browsers, it may occur unexpected errors. To do this, we can simply use `IIFE`. (https://mariusschulz.com/blog/use-cases-for-javascripts-iifes)

```JavaScript{2-4}
var func() = function() {
  (function() {
    var makeMeSecret
  }();

  console.log(makeMeSecret) //error
}

func();
```

# `>` and `<`

```JavaScript{2}
console.log(5 < 6 < 7) //true
console.log(7 > 6 > 5) //false
```

We can follow the computation from the left side

1. `7 > 6` is `true`
2. `true > 5` is `false`, because `true` is `1` so `1 > 5` = `false`.

# Arrow Function and `arguments`

```JavaScript
let arrowFunc = () => { return arguments }
let normalFunc = function() {
  return arguments
}

console.log(arrowFunc("hi")) // { '0': {}, '1': ........ }
console.log(normalFunc("hi")) // { '0': 'hi' }
```

This is because `arguments` does not bind to `Arrow Function` variable. If we'd like to use something like `arguments` with arrow function, we can do this:

```JavaScript
let arrowFunc = (...n) => { return n } 
console.log(arrowFunc("hi")) // [ 'hi' ]
```

# `return` shouldn't have a line break

This code below has an error. Because JavaScript put `;` automatically by each line, if we just put `return` on a single line, it becomes `return;` which is a syntax error.

```JavaScript
let x = function() {
  return 
  {
    message: "hi"
  }
}
```

We should write code this way:

```JavaScript
let x = function() {
  return {
    message: "hi"
  }
}
```

# Prevent object from modification

We can use `Object.freeze()`; user can't change the object at all including adding new properties or changing the existing property.

There is also `Object.seal()`; user *can* change the existing properties, but they cannot add new properties.

```JavaScript
let obj = {
  name : "han"
}
Object.seal(obj)

obj.name = "franz"
console.log(obj) //{ name: "franz" }

//trial to add property
obj.age = 32
console.log(obj) //{ name: "franz" } 
```

If we want to freeze only specific properties, we can use `Object.defineProperty()` when we define the properties that should be `writable: false`.

```JavaScript
let obj = {
  name: "han",
}

Object.defineProperties(
  obj,
  {
    age: {
      value: 29,
      writable: false,
    },
  },
  {
    hobby: {
      value: "cooking",
      writable: false,
    },
  }
)

obj.age = 3
console.log(obj.age) //29
```

# `-infinity`

```JavaScript
console.log(Math.max()) //-infinity
```

This is related to how `Math.max()` works. It compares to numbers starting from `-infinity`. If it's `Math.max(1,2,3)`, it compares `1` to `-infinity` first. If there is none, it just returns `-infinity`.

