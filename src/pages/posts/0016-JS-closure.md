---
title: "Why Do We Need closure?"
date: "2019-07-17 18:33:00"
author: "Han Sim"
category: "Web"
tags:
  - JavaScript
  - Scope
  - closure
---

# Without closure, it can be confusing.

When we have a global `var` and local `var` under the same identifier, the result can be driven in an unexpected way.

```JavaScript
var a = 100;

function foo() {
  var a = 0;
  a++;
}

foo();
foo();
foo();
console.log(a); //still 100
```

Even though we changed the code by removing global variable `a`, it doesn't work either.

```JavaScript
function foo() {
  var a = 100;
  return a++;
}

foo();
foo();
foo();
console.log(a); //expected 103, but the result is 101
```

Because every time we call the function `foo()`, it does not remember the previous status. So it initialize new `a` with the assigned value `100` again.

This is where we need **Closures** to make our function remember the previous environment in which it was created.

# closure

We can avoid using Global variables by using closure instead.

> Closures are functions that refer to independent (free) variables. In other words, the function defined in the closure ‘remembers’ the environment in which it was created.

> A closure is simply a function defined within another function(**closure are nested function which has access to the outer scope**). However, the power of closures is derived from the fact that the inner function remembers the environment in which it was created. In other words, the inner function has access to the outer function’s variables and parameters. [Link](https://medium.com/@dis_is_patrick/practical-uses-for-closures-c65640ae7304)

```JavaScript
const foo = (function () {
  var a = 100;

  return function () {
    a += 1;
    return a
  }
})();

foo();
foo();
foo();
// the a is now 103
```

I used **IIFE** here: see this post to understand why. https://mariusschulz.com/blog/use-cases-for-javascripts-iifes

## Singleton in JavaScript using closure

Singleton is an object that is meant to have only one instance during the execution of the program. Because `function()` is anonymous and called right after its definition, we cannot create anymore object from this factory function. We only can use get and increment method only by using singleton instance. `private_counter` is now truly private.

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

## Lexical Scope and closure

[Lexical scope and closure](http://astronautweb.co/javascript-lexical-scope/)

- Lexical scope is created by a closure.
  - closure is when a function is able to remember and access its **lexical scope** even when that function is executing outside its lexical scope.
- **functional scope of outer function === lexical scope of inner function**

```JavaScript
function foo() {  // 'scope of foo' aka lexical scope for bar
   var memory = 'hello closure';
   return function bar() {
      console.log(memory);
   }
}

// returns the bar function and assigns it to the identifier 'closure’;
const closure = foo();

closure(); // hello closure
```

# References

- https://www.codingame.com/playgrounds/6516/closures-in-javascript-for-beginners
