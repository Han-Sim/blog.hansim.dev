---
title: "Java: Linear Data Structures"
date: "2019-07-05 10:22:00"
author: "Han Sim"
category: "Basics"
tags:
  - Java
  - Data Structure
---

# What is **Data Structure**

It is about how to organize data in a computer.

# Linear Data Structures

In this post, I'll be mainly discussing about **linear** data structures. There is **nothing hierarchical** here, it has only one dimension; data is stored in a single line.

**References**

- Stack vs Queue: https://www.cs.cmu.edu/~adamchik/15-121/lectures/Stacks%20and%20Queues/Stacks%20and%20Queues.html

## Array

Array is a data structure used to store homogeneous elements at contiguous locations. Size of an array must be provided before storing data.

https://www.geeksforgeeks.org/arrays-in-java/

```Java
class GFG
{
	public static void main (String[] args)
	{
	int[] arr; //declare
	arr = new int[5]; // allocating memory for 5 integers.

	arr[0] = 10;
	arr[1] = 20;
	arr[2] = 30;
	arr[3] = 40;
	arr[4] = 50;

	// accessing the elements of the specified array
	for (int i = 0; i < arr.length; i++)
		System.out.println("Element at index " + i +
									" : "+ arr[i]);
	}
}
```

## Queue (Interface)

A queue or **FIFO** (first in, first out) is an abstract data type that serves as a collection of elements, with two principal operations.

1. enqueue: the process of adding an element to the collection.(The element is added from the rear side)
2. dequeue, the process of removing the first element that was added. (The element is removed from the front side).

It can be implemented by using both **array** and **LinkedList**.

https://www.geeksforgeeks.**org**/queue-interface-java/

https://dzone.com/articles/arraylist-vs-linkedlist-vs

![Screen Shot 2019-07-10 at 10.17.07 PM 3.png](https://i.loli.net/2019/07/11/5d269c35a886054409.png)

### Implementation of Queue: LinkedList

A linked list is a linear data structure (like arrays) where each element is a separate object. Each element (that is node) of a list is comprising of two items – the data and a reference to the next node.

```Java
// Java code for Linked List implementation

import java.util.*;

public class Test
{
	public static void main(String args[])
	{
		// Creating object of class linked list
		LinkedList<String> object = new LinkedList<String>();

		// Adding elements to the linked list
		object.add("A");
		object.add("B");
		object.addLast("C");
		object.addFirst("D");
		object.add(2, "E");
		object.add("F");
		object.add("G");
		System.out.println("Linked list : " + object);

		// Removing elements from the linked list
		object.remove("B");
		object.remove(3);
		object.removeFirst();
		object.removeLast();
		System.out.println("Linked list after deletion: " + object);

		// Finding elements in the linked list
		boolean status = object.contains("E");

		if(status)
			System.out.println("List contains the element 'E' ");
		else
			System.out.println("List doesn't contain the element 'E'");

		// Number of elements in the linked list
		int size = object.size();
		System.out.println("Size of linked list = " + size);

		// Get and set elements from linked list
		Object element = object.get(2);
		System.out.println("Element returned by get() : " + element);
		object.set(2, "Y");
		System.out.println("Linked list after change : " + object);
	}
}
```

### Array vs LinkedList

Related Post: https://blog.hansim.dev/linkedlist-vs-array

- How it works?
  - Arrays are index based data structure
  - LinkedList relies on references to the previous and next element
- Allocation
  - Array has a fixed size and required to be declared prior
  - LinkedList is not restricted to size and expand and contract during execution.

## Stack

A stack or **LIFO** (last in, first out) is an abstract data type that serves as a collection of elements, with two principal operations.

- `push`: adds an element to the collection
- `pop`: removes the last element that was added.

In stack both the operations of push and pop takes place at the same end that is top of the stack. It can be implemented by using both array and linked list.

https://www.geeksforgeeks.org/stack-class-in-java/

```Java
import java.io.*;
import java.util.*;

class Test
{
	// Pushing element on the top of the stack
	static void stack_push(Stack<Integer> stack)
	{
		for(int i = 0; i < 5; i++)
		{
			stack.push(i); // [0, 1, 2, 3, 4]
		}
	}

	// Popping element from the top of the stack
	static void stack_pop(Stack<Integer> stack)
	{
		System.out.println("Pop :");

		for(int i = 0; i < 5; i++)
		{
			Integer y = (Integer) stack.pop();
			System.out.println(y); // 4, 3, 2, 1 (LIFO)
		}
	}

	// Displaying element on the top of the stack
	static void stack_peek(Stack<Integer> stack)
	{
		Integer element = (Integer) stack.peek();
		System.out.println("Element on stack top : " + element); //4
	}

	// Searching element in the stack
	static void stack_search(Stack<Integer> stack, int element)
	{
		Integer pos = (Integer) stack.search(element);

		if(pos == -1)
			System.out.println("Element not found");
		else
			System.out.println("Element is found at position " + pos);

    /*
    if 4 --> [0,1,2,3,4]
      '4' will be found at position 1 (LIFO)
    */
	}


	public static void main (String[] args)
	{
		Stack<Integer> stack = new Stack<Integer>();

		stack_push(stack);
		stack_pop(stack);
		stack_push(stack);
		stack_peek(stack);
		stack_search(stack, 4);
		stack_search(stack, 6);
	}
}
```

Output

```
Pop :
4
3
2
1
0
Element on stack top : 4
Element is found at position 3
Element not found
```
