---
title: "Coding Problem #002"
date: "2019-07-25 01:19:00"
author: "Han Sim"
category: "Basics"
tags:
  - Problem-Solving
  - JavaScript
  - Recursion
  - JavaScript-Techniques
  - Data-Structure
---

# Problem

Effectively reverse the given string.

## Solution: JavaScript

I used `recursive function` here.

Some JavaScript Techniques here:

- string --> char array: `const arrOfChars = str.split("")`
- char array --> string: `const result = arrOfChars.join("")`

```JavaScript
function reverse(arr, start, end) {
  if (start <= end) {
    let temp
    temp = arr[start]
    arr[start] = arr[end]
    arr[end] = temp
    reverse(arr, start + 1, end - 1)
  }
}

const str = "hansim"
const arrOfChars = str.split("")

reverse(arrOfChars, 0, str.length)

const result = arrOfChars.join("")
console.log(result) //misnah
```

Time complexity is O(n) and space complexity is O(n)

## using `Stack` data structure

```JavaScript
function reverse(str) {
  const arr = str.split("")
  let reverseStr = ""
  let n = arr.length //since pop() removed the last element, we need to define 'n' first.

  for (let i = 0; i < n; i++) reverseStr += arr.pop()
  return reverseStr
}

const str = "hansim"
console.log(reverse(str)) //misnah
```
