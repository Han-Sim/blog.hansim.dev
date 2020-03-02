---
title: "Functional Programming in Simple English"
date: "2019-07-25 00:18:00"
author: "Han Sim"
menu: "Web Development"
category: "JavaScript"
tags:
  - JavaScript
  - Functional-Programming
---

# What is Functional Programming?

- Functional programming is a programming paradigm in which we try to bind everything in pure mathematical functions style.
- It uses `expressions` instead of `statements`. 
  - An expression is evaluated to produce a value. The logics are hidden behind the scene; we just call the function to populate the value. i.e. `Array.prototype.map()`
  - A statement is executed to assign variables. i.e. `for-loop`
- `Referential transparency` or `Immutability`: In functional programs variables once defined do not change their value throughout the program. Functional programs do not have assignment statements. **If we have to store some value, we define new variables instead of modifying the original**. This eliminates any chances of `side effects` because any variable can be replaced with its actual value at any point of execution. **State of any variable is constant at any instant.**
  - Even though JavaScript does not force `objects` to be immutable by its nature, a lot of functions actually support immutability by returning the copy instead of modifying the original. https://blog.hansim.dev/how-to-implement-immutability-in-javascript
- The ability of functional programming languages (i.e. JavaScript) to **treat functions as values** and pass them to functions as parameters make the code more readable and easily understandable.
  - Functions are actually `First-class Object`: **they are treated as a value(`function expression`) and you can pass a function into other function (`callback` in JavaScript).**
  - `First-class functions` are treated as `first-class variable`. The first class variables can be passed to functions as parameter, can be returned from functions or stored in data structures. `Higher order functions` are the functions that take other functions as arguments and they can also return functions.

> Functional programming is a form of `declarative programming` that expresses a computation directly as pure functional transformation of data. A functional program can be viewed as a declarative program where computations are specified as pure functions. https://sookocheff.com/post/fp/what-is-functional-programming/

## Why Functional Programming?

- Clean Code: much smaller than cleaner in general
- Syntactic Efficiency
- More Abstract
  - We code in a symbolic way
- Reduction of Errors
  - It's likely to make less mistakes.

# Pure Function

`Pure Function` is a function that provides the same output if the input is the same, in any environment. This is one of the most important styles when it comes to functional programming.

- Pure function doesn't modify any variables outside of its scope.
  - **It doesn't change the state of its application**; the state remains `immutable`.
- There is no unpredictable logic inside such as `Math.random()`.

```JavaScript
function pureFunction( a , b ) {
  return a + bl
}
```

It is recommended to write pure function more in order to maintain, read code better and reduce errors that would've happened otherwise. These errors are referred to as `side-effects`. If the function changes the state which lies outside of its scope, it may change the behaviour of other parts of your codes.

# Syntax becomes cleaner in functional programming

```JavaScript
const arr = [1, 2, 3]

//instead of doing a for-loop, we can use a function instead
//  it is one of the way to follow functional programming style
//  I used 'map' function which resides on the Array object.
//  This is more readable and syntactically better.
//
const add = item => { return item + 1 }
const arr2 = arr.map(add)

console.log(arr2) //[ 2, 3, 4 ]
```

Also, we can even chain those functions. This is going to make the code extremely simple. I chained `reduce()` function after `map()`. (*Array reduce() method[W3Schools](https://www.w3schools.com/jsref/jsref_reduce.asp)*)

```JavaScript
const arr = [1, 2, 3]

const add = item => { return item + 1 }
const sum = (accumulator, item) => { return accumulator + item }
const val = arr.map(add).reduce(sum, 0)

console.log(val) //[ 2, 3, 4 ] --> add them up --> so it's 9!
```

Imagine I didn't follow the functional programming style. The code will be more explicit, less abstract, and with bunch of lines. This is because **functional programming uses `expressions`(`Declarative Approach`) instead of `statements`(`Imperative Approach`)**. 

> `Declarative programming` is a programming paradigm … that expresses the logic of a computation without describing its control flow.
> `Imperative programming` is a programming paradigm that uses statements that change a program’s state.
> https://codeburst.io/declarative-vs-imperative-programming-a8a7c93d9ad2

> React components are declarative and specify *what* should be rendered. `<MainPage />`
```JavaScript
const arr = [1, 2, 3]

//Now, I have to explicitly code the logic behind the scene.
//
const arr2 = [] //to keep 'arr' immutable
let val = 0
for (let i = 0; i < arr.length; i++) {
  arr2[i] = arr[i] + 1
  val += arr2[i]
}

console.log(val) //[ 2, 3, 4 ] --> add them up --> so it's 9!
```

We reduced the number of lines incredibly by following functional programming paradigm and this ends up being super `abstract` now. That is why some developers love to follow functional programming instead of explicitly doing all the lines including bunch of for-loop.

# References

- This is a good source to understand imperative / functional approach: https://sookocheff.com/post/fp/what-is-functional-programming/
- Summary: https://www.geeksforgeeks.org/functional-programming-paradigm/