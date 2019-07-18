---
title: "Const in JavaScript is Not Immutable"
date: "2019-07-18 17:22:00"
author: "Han Sim"
category: "JavaScript | Node.js"
tags:
  - JavaScript
  - Immutable
---

# Yes, `const` cannot be re-assigned or re-declared

**But it doesn't mean that `const` is immutable!** Because `array` and `object` are always `passed by reference`, they can be modifed directly even though they were declared with the `const` keyword.

> More about JS variables: [When To Use Const and Let](https://blog.hansim.dev/javascript-when-to-use-const-and-let)

```JavaScript
const a = [4, 2, 3, 1]

b = a //passed by reference: const array/object is MUTABLE!
b.sort()
console.log(a) //[ 1, 2, 3, 4]
// JavaScript does not support Immutability by default!!
```

# Then, how we implement `immutability` in JavaScript

We can use some methods that supports immutability. For example, `slice()` returns a copy of the array, which means it supports a shallow copy.

```JavaScript{6}
const a = [4, 2, 3, 1]
const c = a.slice(0, 2)
//slice method just returns a slice without modification to the original
// which means we can copy an array in a immutable way

console.log(c) //[ 1,2 ]
console.log(a) //[ 1, 2, 3, 4] 
```

## Spread Operator

**`Spread Operator` is a syntactic sugar to do a shallow copy over values in the arrays/objects.**

```JavaScript{1}
const d = [...a] //spread operator ---> do a shallow copy over elements in the array
d.push(5)

console.log(a) // [ 1, 2, 3, 4 ]
console.log(d) // [ 1, 2, 3, 4, 5 ]
```

When it comes to `Object` in JS, we have to be careful to use Spread Operator in this case below.

```JavaScript{7,18-19,21-22}
const state = {
  name: "John Snow",
  occupation: "Lord Commander",
  skills: [],
}

const newState = { ...state, occupation: "King in the north" }
newState.skills.push("fighting")

console.log(state.skills) //[ 'fighting' ]
//However, fighting is added here too!!

//Then, how to update skills[]?
//  because array is passed by reference, 
//  skills array in 'newState' still refers to the one in state
//  we use spread operator again to do a shallow copy

newState.skills=[...newState.skills, "programming"] 
newState.skills.push("web development")

console.log(state.skills) // [ 'fighting' ]
console.log(newState.skills) //[ 'fighting', 'programming', 'web development' ]
```

Also, we can use a library such as `Immutable.js` to implement Immutable easily.