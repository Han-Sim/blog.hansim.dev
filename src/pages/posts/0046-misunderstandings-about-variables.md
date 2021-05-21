---
title: "3 things about JavaScript Variables that you might be wrong about"
date: "2021-05-20 20:30:00"
author: "Han Sim"
category: "Web"
tags:
  - JavaScript
  - Hoisting
  - Scope
  - Variable
---

# 1. `const` and `let` are also hoisted

`let` and `const` are hoisted but not initialized. MDN Web Doc describes this status as _variables is in a temporal dead zone_. [MDN doc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_Types#variable_hoisting) **As a matter of fact, all declarations are hoisted in Javascript** including `var`, `let`, `const`, `function`, `function*`, and `class`.

```JavaScript
console.log(x); // ReferenceError. - x is defined but still in a temporal dead zone.
let x = 3;
```

One more example from [stack overflow](https://stackoverflow.com/questions/500431/what-is-the-scope-of-variables-in-javascript),

```JavaScript
function f() {
  function g() {
    console.log(x);
  }
  let x = 1; // hoisted to the top of this function scope.
  g();
}
f(); // 1 because x is hoisted even though declared with `let`!
```

# 2. Only the declaration is hoisted, not the assignment

**Hoisting** means the variable is taken apart form where it is declared and placed to the top of the document. The browser will take every declaration and before showing anything on the browser, it takes these declaration to the top of the document. However, the assignment to this variable won't be hoisted.

```JavaScript
console.log(a); // undefined

var a = 'aa';
```

In the example above, we get `undefined` not the `ReferenceError` because `var a` has been declared already in the beginning of the document, but it's value is not defined yet at the moment of the `console.log(a)` line. This is why the codes below is valid in JavaScript:

```JavaScript
a = 'aa'
console.log(a); // 'aa'

var a;
```

Therefore **Function Declaration** gets also hoisted.

```JavaScript
console.log(foo()); // 'aa'

function foo() {
  var a = 'aa';
  return a;
}
```

# 3. Scope in JavaScript

While `let` and `const` have block scope, `var` has function scope; simply means `var` is only visible in the function.

```JavaScript
if (true) { // If block is not a function scope but a block scope.
  var a = 'aa';
  let b = 'bb';
  const c = 'cc';
}

console.log(a); // 'aa'
console.log(b); // error
console.log(c); // error
```

To understand **scope** in JS, [check this post on dev.to](https://dev.to/sandy8111112004/javascript-introduction-to-scope-function-scope-block-scope-d11)
