---
title: "Bubble Sort"
date: "2019-07-25 23:01:00"
author: "Han Sim"
category: "Basics"
tags:
  - Bubble-Sort
  - Algorithm
  - JavaScript
---

# Bubble Sort with JavaScript

Best solution I've found.

```JavaScript
const bubbleSort = arr => {
  console.log(arr);
  let swapped;
  do {
    swapped = false;
    console.log("----loop starts----");
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > arr[i + 1]) {
        let tmp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tmp;
        swapped = true;
        console.log(i, arr, swapped);
      }
    }
  } while (swapped);
  return arr;
};

console.log("result: " + bubbleSort([5, 4, 2, 1, 9]));
```

It uses `swapped` flag. If `if` condition is never executed during the loop, swapped remains `false` and `do-while` loop stops.

output:

```
original:  [ 5, 4, 2, 1, 9 ]
----loop starts----
0 [ 4, 5, 2, 1, 9 ] true
1 [ 4, 2, 5, 1, 9 ] true
2 [ 4, 2, 1, 5, 9 ] true
----loop starts----
0 [ 2, 4, 1, 5, 9 ] true
1 [ 2, 1, 4, 5, 9 ] true
----loop starts----
0 [ 1, 2, 4, 5, 9 ] true
----loop starts----
result:  [ 1, 2, 4, 5, 9 ]
```

Source: https://www.w3resource.com/javascript-exercises/searching-and-sorting-algorithm/searching-and-sorting-algorithm-exercise-7.php
