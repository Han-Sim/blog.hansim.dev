---
title: "LinkedList vs Array"
date: "2019-07-21 11:55:00"
author: "Han Sim"
category: "Basics"
tags:
  - Java
  - Data-Structure
  - LinkedList
  - Array
---

# When to allocate memory? `Compile-time` vs `Run-time`

Both `LinkedList` and `Array` are used to store `linear data type`

- Reference: [Prev post: linear data structures in Java](https://blog.hansim.dev/java-linear-data-structures)

However, there are the most difference between two.

- Array consumes contiguous memory locations allocated at `compile time`, i.e. at the time of declaration of array.
- LinkedList assigns memory as and when data is added to it, which means at `runtime`.

# `Array` is more memory-efficient when we need `Random Access`

`Random Access`: Array can use `index` to directly access a specific element.

However, `LinkedList` supports only `Sequential Access`; to get an element, Java has to traverse the complete LinkedList up to that element. So the time complexity is `O(n)` when it is nth element.

It is because `LinkedList` is just a collection of `nodes`(an element + reference to the next node) which can be assigned anywhere in memory, while elements in `Array` are stored in `contiguous memory location`.

_LinkedList has `get` methods and we can pass `index` as a parameter; however Java still does linear search from the beginning_.

```Java
import java.util.LinkedList;

class LinkedListBasic {
	public static void main(String args[]) {
		LinkedList<String> list = new LinkedList<String>();

		list.add("blog");
		list.add("han");
		list.add("sim");
		list.add("dev");

		System.out.println(list.get(1)); //han
	}
}
```

# `LinkedList` is more memory-efficient when we need `insertion`

Because memory locations are consecutive and fixed in Array, `insertion` or `deletion` requires a lot of job by its nature.

However, `LinkedList` assigns memory in anywhere, it can insert or delete memory fast as it only needs to change some references.

# More Differences

- `LinkedList`: Memory is allocated at runtime when a new node is added (`Dynamic Memory Allocation`) - we can easily expand the size of `LinkedList` Also, memory are assigned in `Heap`.
- `Array`: Memory is allocated as soon as the array is declared, at `compile time` (`Static Memory Allocation`). Also, memory are assigned in `Stack`.

![Screen Shot 2019-07-21 at 12.34.54 PM.png](https://i.loli.net/2019/07/22/5d34944a0aa9b99734.png)

# References

- https://www.studytonight.com/data-structures/linked-list-vs-array
