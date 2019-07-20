---
title: "Binary Search"
date: "2019-07-19 20:29:00"
author: "Han Sim"
category: "Programming Basics"
tags:
  - Binary-Search
  - Algorithm
  - JavaScript
  - Recursive-Function
---

> `Binary searc`h` is an efficient algorithm for **finding an item from a sorted list of items**. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one. [Link: what is binary search](https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search)

As compared to `linear search`, `binary search` is much faster with Time Complexity of `O(logN)` whereas linear search algorithm works in O(N) time complexity.

# JavaScript

```JavaScript
function binarySearch(arr, findMe, startIndex, endIndex) {
  if (startIndex > endIndex) return false

  let mid = Math.floor((startIndex + endIndex) / 2) //index for medium

  if (arr[mid] === findMe) return true
  else if (arr[mid] > findMe) {
    //check the left side of mid (excluding mid itself though)
    return binarySearch(arr, findMe, startIndex, mid - 1)
  } else {
    //check the right side of mid (excluding mid itself though)
    return binarySearch(arr, findMe, mid + 1, endIndex)
  }
}

//Test
let array = [1, 10, 14, 23, 8, 7, 9, 2, 26]
let findMe = 14

//Ascending order
array.sort((a, b) => {
  return a - b
}) // array: [ 1, 2, 7, 8, 9, 10, 14, 23, 26 ]

array

console.log(binarySearch(array, findMe, 0, array.length - 1)) //true
```

# References

- [What is big-o notation and time complexity](https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search)