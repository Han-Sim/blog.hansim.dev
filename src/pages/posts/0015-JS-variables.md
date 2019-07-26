---
title: "JavaScript: When to Use Const and Let"
date: "2019-07-17 16:33:00"
author: "Han Sim"
category: "JavaScript"
tags:
  - JavaScript
  - Scope
  - Variable
  - Hoisting
---

# `cosnt` and `let` are `block scope` variables

```JavaScript
{
  const a = 1;
  let b = 2;
}

var c = a + b; //ERROR
```

# Variables and constants declared with `let` or `const` are not hoisted!

```JavaScript
x = 3;
y = 4; // ERROR: y is not defined

var x;
let y;
```

Reference: https://www.w3schools.com/js/js_hoisting.asp

# `const`

`const` is most preffered way to declare variables in these reasons

## `const` is a signal that the identifier won’t be reassigned.

**It doesn't mean that `const` is `immutable`, because for example, we can change `properties` of const object.

Reference: [const variables not immutable](https://ponyfoo.com/articles/const-variables-not-immutable)

> Using const only means that the variable will always have a reference to the same object or primitive value, because that reference can’t change. The reference itself is immutable, but the value held by the variable does not become immutable.

```JavaScript{2,5}
const JS_CONST_1 = "Hi";
//JS_CONST_1 = "Bye"; //ERROR: re-assignment to constat variable is prohibited.

const JS_CONST_2 = ["Hi", "Bye"];
JS_CONST_2.push("How are you?"); //this works as JS_CONST_2 is NOT immutable
console.log(JS_CONST_2);

Object.freeze(JS_CONST_2); //now JS_CONST_2 is immutable and not extensible
```

**Therefore, if we don't need to reassign the identifier, it is always most safe to declare variables with `const`** 

# `let`

When we use `let` other than `const`, it means this variable will be reassigned within its `block scope`. 

One of the most common example would be a counter in a loop

```JavaScript
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

It has to be `let` because the identifier `i` is going to be assigned again throughout the loop.

# Why `var` should be avoided

**Because `var` has `function scope` which means it can be used within its entire function scope and this can lead our code to some unexpected results.**

```JavaScript
var callbacks = [];

(function() {
  for (var i = 0; i < 5; i++) {
    callbacks.push(function() { 
      return i; 
    });
  }
})();

console.log(callbacks.map( 
  function(cb) { 
    return cb(); 
  } 
));
```

Because the counter `i` is declared with `var`, it is hoisted to the top of the function scope. So we can see `[5, 5, 5, 5, 5]` istead of `[0, 1, 2, 3, 4]` on the console.

# Reference

- [Why you shouldn't use var anymore](https://hackernoon.com/why-you-shouldnt-use-var-anymore-f109a58b9b70)

