---
title: "We Use Generator Because It Pauses"
date: "2019-07-18 17:22:00"
author: "Han Sim"
category: "Web Development"
tags:
  - JavaScript
  - Generator
---

# Function Generator

Function Generator is a function that returns an `iterator` object and can be exited and later re-entered; which means it pauses its execution until `iterator.next()` is called.

This is powerful because **it pauses until its `iterator.next()` is called**. For example, the codes below don't make _stack overflow_ because it is a function generator.

```JavaScript
function* infiniteMaker() {
  let i = 0

  while(true) {
      yield i
      i++
  }
}

let iterator = infiniteMaker()

console.log(iterator.next()) // { value: 0, done: false } 
console.log(iterator.next()) // { value: 1, done: false } 
console.log(iterator.next()) // { value: 2, done: false } 
console.log(iterator.next()) // { value: 3, done: false } 
```

## `return` stops generator

```JavaScript{7,15-16}
function* infiniteMaker() {
  let i = 0

  while (true) {
    yield i
    i++
    if (i === 2) return "hello"
  }
}

let iterator = infiniteMaker()

console.log(iterator.next()) // { value: 0, done: false }
console.log(iterator.next()) // { value: 1, done: false }
console.log(iterator.next()) // { value: 'hello', done: true } 
console.log(iterator.next()) // { value: undefined, done: true } 
```

## Function Generator with Promise API

To understand Promise API, [you can check my previous post here](https://blog.hansim.dev/asynchronous-javascript-callback-function-and-promise-api)

```JavaScript
function requestCall(url) {
  return new Promise((resolve,reject) => {
    makeAjaxCall(url, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}
```

Say we have a dependency issue: we need to get data from `url1` and only it was successfully resolved, then we get data from `url2` (we need data from `url1` to make a second call for `url2`). We can simply code this logic by using **function generator**.

```JavaScript
function* generator() {
  yield requestCall('url1')
  yield requestCall('url2')
}
```

# References

- [MDN: Iterator and Generator](https://www.google.com/search?q=javascript+iterator&rlz=1C5CHFA_enCA796CA797&oq=javascript+iterator&aqs=chrome..69i57j69i59l2j0j35i39l2.3071j0j4&sourceid=chrome&ie=UTF-8)
