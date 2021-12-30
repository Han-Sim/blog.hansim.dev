---
title: "Arrow Function and this in JavaScript"
date: "2021-12-30 21:50:00"
author: "Han Sim"
category: "Web"
tags:
  - React
  - JavaScript
  - Scope
  - ES2015
  - ES5
  - This
---

# Type Error: Cannot read property of 'setState' of undefined.

If you start dealing with old React codes written as a class component, you might come across this error message. This is a very common error message when the class component was the only option in React. It's not really a common thing anymore as React Hooks become more popular so I'll just leave a [link](https://stackoverflow.com/questions/32317154/react-uncaught-typeerror-cannot-read-property-setstate-of-undefined?rq=1) here to give an example. Basically, the event method in the class component loses its `this` binding to the component and therefore `setState` function cannot be called.

Even though this isn't something that you would encounter in the world of React Hooks, I was always curious how the `this` loses its binding to where its method is defined when I started teaching myself React. Also I couldn't wrap my head around the reason why Arrow Function can solve this problem.

# `this` follows the rule of dynamic scope.

When you read [the MDN article about this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this), it stated as below:

> In most cases, the value of this is determined by how a function is called (runtime binding). It can't be set by assignment during execution, and it may be different each time the function is called. ES5 introduced the bind() method to set the value of a function's this regardless of how it's called, and ES2015 introduced arrow functions which don't provide their own this binding (it retains the this value of the enclosing lexical context).

To understand this, you need to understand what lexical scope and dynamic scope is.

## Lexical Scope

JavaScript basically follows lexical scope. **Lexical Scope** determines variables to use where the function is **defined**.

```JS
function printFruitVariable() {
  console.log(fruit);
}

function execute() {
  var fruit = "apple";
  printFruitVariable();
}

var fruit = "banana";
execute();
```

The result is "banana". It's because in `printFruitVariable` does not have a `fruit` variable, so it follows through its scope chain and then gets the `fruit` variable of its parent scope. Even though fruit is defined as `apple` in `execute` function, this variable is not visible and out of scope from `printFruitVariable` function's point of view.

## Dynamic Scope

On the other hand, dynamic scope determines variables to use depending on where the function is **executed**. If it follows dynamic scope, because `printFruitVariable` is executed inside of `execute` function, it will use `fruit` variable defined in `execute` function.

**The problem raises because JavaScript mostly follows lexical scope, but when it comes to `this`, it follows dynamic scope**. That's why the `this` confuses many JavaScript developers. In React, even though the event handler is defined inside of the class component, it is executed from the event. That's why the method does not have `this` as the class component anymore at the point of execution.

## Arrow Function makes `this` to follow lexical scope instead.

The reason why ES2015's Arrow Function fixes this issue is that Arrow Function always makes `this` to follow the rule of lexical scope. That's the real meaning of the MDN document saying _"it retains the `this` value of the enclosing lexical context"_, or something like _"Arrow functions do not have their own `this` value (and therefore `this` always inherited from the enclosing scope"_. This is why we say Arrow Function is not just a syntactic sugar for ES5 functions as it differs in some behaviors.

Before ES2015, _"ES5 also introduced the `bind()` method to set the value of a function's `this` regardless of how it's called"_. Now, we know this also means `bind()` makes `this` to follow lexical scope, not dynamic scope.

# Useful Resources

[ES6 in Depth: Arrow Functions](https://hacks.mozilla.org/2015/06/es6-in-depth-arrow-functions/)
