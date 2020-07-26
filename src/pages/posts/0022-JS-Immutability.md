---
title: "How to Implement Immutability in JavaScript"
date: "2019-07-18 17:22:00"
author: "Han Sim"
category: "Web Development"
tags:
  - JavaScript
  - Immutable
---

# Yes, `const` cannot be re-assigned or re-declared

**But it doesn't mean that `const` is immutable!** Because `arrays` and `objects` are `addressed by reference`, they can be modified directly even though they were declared with the `const` keyword.

> More about JS variables: [When To Use Const and Let](https://blog.hansim.dev/javascript-when-to-use-const-and-let)

```JavaScript
const a = [4, 2, 3, 1]

b = a //passed by reference: const array/object is MUTABLE!
b.sort(function(a, b) {
  return a - b
})
console.log(a) //[ 1, 2, 3, 4]
// JavaScript does not support Immutability by default!!
```

However, `immutability` has some benefits. For example, in `Redux`, it is forced to keep the `store` immutable, because it's simpler and easy to debug as pure functions can be easily unit-tested; we can also easily time-travel over the `state` using git or other dev tools. (There can be more reasons for Redux, such as `shallow equality checking` which ensure the better performance than deep equality checking; check the official document [here](https://redux.js.org/faq/immutable-data#what-are-the-benefits-of-immutability) and [this post about redux](https://www.toptal.com/javascript/immutability-in-javascript-using-redux))

# Then, how we implement `immutability` in JavaScript

We can use some methods that supports immutability. For example, `slice()` returns a copy of the array without changing the original.

```JavaScript{6}
const a = [4, 2, 3, 1]
const c = a.slice(0, 2)
//slice method just returns a slice without modification to the original
// which means we can copy an array in a immutable way

console.log(c) //[ 1, 2 ]
console.log(a) //[ 1, 2, 3, 4] 
```

We can also use Array's `map` function. This is a `reducer` example in Redux.

```JavaScript
function reducer(state, action) {
  /*
    State looks like:

    state = [1, 2, "X", 4];
  */

  return state.map((item, index) => {
    // Replace "X" with 3
    // alternatively: you could look for a specific index
    if(item === "X") {
      return 3;
    }

    // Leave every other item unchanged
    return item;
  });
}
```

Also, we can simply add a dependency such as `Immutable.js`.

## Shallow Copy: Spread Operator

> https://www.youtube.com/watch?v=XI27nSXSrYs

![Screen Shot 2019-07-26 at 11.26.41 PM.png](https://i.loli.net/2019/07/27/5d3bc4986723c48453.png)
![Screen Shot 2019-07-26 at 11.27.33 PM.png](https://i.loli.net/2019/07/27/5d3bc4b4ac4ae78221.png)
![Screen Shot 2019-07-26 at 11.28.54 PM.png](https://i.loli.net/2019/07/27/5d3bc506c143358411.png)

**`Spread Operator` is a syntactic sugar to do a shallow copy over values in the arrays/objects.**

```JavaScript{1}
const d = [...a] //spread operator ---> do a shallow copy over elements in the array
d.push(5)

console.log(a) // [ 1, 2, 3, 4 ]
console.log(d) // [ 1, 2, 3, 4, 5 ]
```

When it comes to `Object` in JS, we have to be careful to use Spread Operator in this case below. If there is another nested object inside the object, only memory address will be copied **because spread syntax is a `shallow copy`**; it will still refer to the same address.

![Screen Shot 2019-07-24 at 10.13.23 PM.png](https://i.loli.net/2019/07/25/5d3910571b0c461801.png)

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

Before `spread syntax`, `Object.assign()` had been used. It's not really recommended as using spread syntax is way easy to read.

```JavaScript
const origin = {
  id: 1,
  name: "han"
}
const shallowCopy = Object.assign({}, origin, {name: "ben"}) //the third arg is optional.

console.log(origin) //no changes
console.log(shallowCopy) //name property will be "ben"
```

> Check this `redux` document page here: https://redux.js.org/recipes/using-object-spread-operator

## Deep Copy: `JSON.stringify` and `JSON.parse`

> Javascript objects are `mutable` by nature and stored as a `reference`. So when you assign the object to another variable, **you're just assigning the memory address of the object to that variable**. In this case your old and new object both will point to the same memory address. Any change in either object will be reflected in the other. So just assigning the one object to another will not really copies your object, as they both refers to the same memory address.

```JavaScript
const a = { id: 1, name: "han" }
const b = a; //shallow copy unlike primitive data types
```

So we can simply do `deep copy` to solve this problem as well. As we saw above, using shallow copy can make other problems when the object is nested and that nested object will be shallow-copied again. To do deep copy, we can use `JSON.stringify` and `JSON.parse` technique.

```JavaScript
const origin = {
  id: 1,
  name: "han",
  specialties: ["web development", "problem solving"],
}

let deepClone = JSON.parse(JSON.stringify(origin))
deepClone.specialties.push("cooking")

console.log(origin.specialties) //[ 'web development', 'problem solving' ]
console.log(deepClone.specialties) //[ 'web development', 'problem solving', 'cooking' ]
```

## `Object.freeze()`

We can also use `freeze()` method to occur an error if we try to mutate the specific object.

```JavaScript
const a = [4, 2, 3, 1]

Object.freeze(a)
a.push(5); //error - Cannot add property 4, object is not extensible
console.log(a)
```

# References

- Deep Copy in JS: https://medium.com/@gamshan001/javascript-deep-copy-for-array-and-object-97e3d4bc401a
- https://daveceddia.com/react-redux-immutability-guide/#redux-update-an-item-in-an-array-with-map
- https://www.codementor.io/junedlanja/copy-javascript-object-right-way-ohppc777d
