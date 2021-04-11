---
title: "How React Works and Dirty Checking"
date: "2019-07-26 14:55:00"
author: "Han Sim"
category: "Web"
tags:
  - JavaScript
  - React
  - Dirty Checking
  - VirtualDOM
---

# What is dirty-checking

The process of checking every watch to detect the changes.

# How React Works?

React works using a virtual DOM. The VirtualDOM is an abstraction of the HTML DOM. It is lightweight and detached from the browser-specific implementation details.

Whenever a ReactComponent is changing the state, diff algorithm in React runs and identifies what has changed. And then it updates the DOM with the results of diff; thanks to diffing, it only updates the exact element that has to be changed. The point is - it’s done faster than it would be in the regular DOM.

> One of the best posts I've found : https://programmingwithmosh.com/react/react-virtual-dom-explained/

## diffing is a dirty checking, itself

> https://stackoverflow.com/questions/21109361/why-is-reacts-concept-of-virtual-dom-said-to-be-more-performant-than-dirty-mode

In React, each of your components have a state. **This state is like an observable** you might find in knockout or other MVVM style libraries. Essentially, **React knows when to re-render the scene because it is able to observe when this data changes**.

**Setting a value on the state will signal to a listener that some state has changed, so React can simply listen for change events on the state and queue up re-rendering.**

**The virtual DOM is used for efficient re-rendering of the DOM.** This isn't really related to dirty checking your data. You could re-render using a virtual DOM with or without dirty checking. You're right in that there is some overhead in computing the diff between two virtual trees, but the virtual DOM diff is about understanding what needs updating in the DOM and not whether or not your data has changed. **In fact, the diff algorithm is a dirty checker itself but it is used to see if the DOM is dirty instead.**

**We aim to re-render the virtual tree only when the state changes.** So using an observable to check if the state has changed is an efficient way to prevent unnecessary re-renders, which would cause lots of unnecessary tree diffs. If nothing has changed, we do nothing.

**A virtual DOM is nice because it lets us write our code as if we were re-rendering the entire scene.** Behind the scenes we want to compute a patch operation that updates the DOM to look how we expect. So while the virtual DOM diff/patch algorithm is probably not the optimal solution, it gives us a very nice way to express our applications. **We just declare exactly what we want and React/virtual-DOM will work out how to make your scene look like this. We don't have to do manual DOM manipulation or get confused about previous DOM state.** We don't have to re-render the entire scene either, which could be much less efficient than patching it.
