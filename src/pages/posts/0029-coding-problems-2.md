---
title: "Coding Problem #002"
date: "2019-07-25 01:19:00"
author: "Han Sim"
category: "Coding Problems"
tags:
  - Problem-Solving
  - JavaScript
  - Recursion
  - JavaScript-Technique
---

# Problem

Effectively reverse the given string.

# Solution: JavaScript

I used `recursive function` here.

Some JavaScript Techniques here:

- string --> char array: `const arrOfChars = str.split("")`
- char array --> string: `const result = arrOfChars.join("")`

```JavaScript
const str = "hansim"

const arrOfChars = str.split("")
reverse(arrOfChars, 0, str.length)
const result = arrOfChars.join("")

console.log(result) //misnah

function reverse(arr, start, end) {
  if (start <= end) {
    let temp
    temp = arr[start]
    arr[start] = arr[end]
    arr[end] = temp
    reverse(arr, start + 1, end - 1)
  }
}
```

Time complexity is O(n) and space complexity is O(n)