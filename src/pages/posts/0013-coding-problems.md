---
title: "Coding Problem #001"
date: "2019-07-15 00:06:00"
author: "Han Sim"
category: "Coding Problems"
tags:
  - Problem-Solving
  - JavaScript
---

# Problem

Given a list of numbers and a number k, return whether any two numbers from the list add up to k.

For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.

Bonus: Can you do this in one pass?

_Source: https://dev.to/awwsmm/java-daily-coding-problem-001-59pg_

# Solution

This is a very easy coding question, so I focused on **minimizing calculation**. In worst case, if there is four elements in the given array, we have to calculate for `3+2+1 = 6` times.

## JavaScript

```JavaScript
let arr = [10, 15, 3, 7]
let k = 17

arr.sort(function(a, b) {
  return a - b
}) //[3,7,10,15]

function answer() {
  let i, j, sum
  let nTrials = 0
  let noMoreTryThisIndex = -1

  for (i = 0; i < arr.length; i++) {
    for (j = arr.length - 1; j >= 0; j--) {
      if (j >= noMoreTryThisIndex && noMoreTryThisIndex !== -1) {
        console.log(`**Skipped calculation of arr[${i}] and arr[${j}]`)
      } else {
        console.log(`no of trials (arr[${i}] + arr[${j}]): ` + nTrials++)
        sum = parseInt(arr[i]) + parseInt(arr[j])
        console.log(sum)
        if (sum === k) {
          return true
        } else if (sum > k) {
          if (noMoreTryThisIndex === -1 || noMoreTryThisIndex > j) {
            console.log(`we don't need to try arr[${j}] from now on`)
            noMoreTryThisIndex = j
          }
          continue
        } else {
          break
        }
      }
    }
  }
}

console.log(answer())
```

### How to minimize the number of calculation

**I sorted the given array using the `sort` method.** By doing this, now I can avoid picking every possible pair from the array.

> However, if `sort` is more expensive than doing this, we should avoid use `sort` instead. I assumed the given array is big enough so that using `sort` ultimately makes my code more efficient and faster.

```JavaScript
arr.sort(function(a, b) {
  return a - b
}) //[3,7,10,15]
```

If `arr[0] + arr[4]` is bigger than `k`, we don't need to calculate `arr[1] + arr[4]`, `arr[2] + arr[4]`, and `arr[3] + arr[4]`, as these elements are arranged in an asscending order. So my code checks this condition and let the loop skip the `arr[j]`.

Also, if `arr[0] + arr[4]` is smaller than `k`, we don't need to keep doing this inner loop as it is gonna get smaller and smaller only. So I put `break` in this condition to break the inner loop and let the outer loop continues.
