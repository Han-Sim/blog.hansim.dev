---
title: "Coding Problem #003"
date: "2019-07-28 01:19:00"
author: "Han Sim"
category: "Basics"
tags:
  - Problem-Solving
  - JavaScript
  - Sets
  - Data-Structure
---

# Problem

There are two num arrays. Find if there can be a pair of numbers which adds up to the given number exactly.

## Solution: JavaScrip

To reduce time complexity, we can use `Set` data structure which has `Set.prototype.has()` method.

```JavaScript
const arr1 = [10, 20, 11, 3, 4]
const arr2 = [1, 2, 4, 5, 6]

function findPair(arr1, arr2, givenNum = 13) {
  let tempSet = new Set(arr1)
  for (let x of arr2) {
    let targetNum = givenNum - x
    if (tempSet.has(targetNum)) return true
  }
}
```
