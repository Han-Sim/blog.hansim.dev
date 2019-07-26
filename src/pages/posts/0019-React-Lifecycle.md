---
title: "React Lifecycle Explanation in Simple English"
date: "2019-07-18 12:19:00"
author: "Han Sim"
category: "React"
tags:
  - JavaScript
  - React
  - Lifecycle
---

# React Lifecycle Methods

Before the explanation, note that React Lifecycel Methods has been changed many times. I'll explain the current React Lifecycle Methods after `React v16.4`.

We can break down `React Lifecycle Methods` into three phases. 

## Mounting Phase

This is where the component initially renders.

### 1. constructor

- It is to set an initial state. 
  - This is the only method that we can use `this.state={}`
- `constructor` runs only once during the initial phase.

### 2. static getDerivedStateFromProps

- When we need to set the state according to the changes of the props, we use this method.
- Why is this `static`?
  - Because `this` shouldn't be allowed here. Which means, you cannot directly set state using `this.state`.
  - Then, how we change the state? We simply return a `new state` or `null`.

### 3. render

- This is where we return `JSX`. This is a body of my component.
- This is `mandatory`
- **Do not use `setState()` here**, otherwise it goes into an infinite loop.

### 4. componentDidMount

- This runs after the component is actually mounted.
- This is to see if the DOM is ready. For example, if I want to use a third-part library and it has to be executed after the DOM is mounted, I can put those codes in this lifecycle method. 
  - This is the best lifecycle method for `making API calls`.

## Updating Phase

This is where something changes in your state or props and react component needs to re-render itself. This could happen everytime there is a change.

### 1. static getDerivedStateFromProps

- It does same things as it does in an initial render

### 2. shouldComponentUpdate(nextProps, nextState)

- This is where we make a decision if we really need to update this component or not. 
  - If it doesn't need to be updated, we can return `false` here to tell React that the update should be skipped.
- This method exists only for a `performance optimization`. For example, even though there is a change in the state, if the result is the same, we don't need to re-render the component. 

### 3. render

- It is the same as the mounting phase.

### 4. getSnapshotBeforeUpdate(prevProps, prevState)

- We can call this `pre-commit phase`: **`Mouting the DOM` really happens right after `getSnapshotBeforeUpdate`.**  
- It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed.

### 5. componentDidUpdate

- It really means "I'm done with updating this component"
- This does same things as `comoponentDidMount` in an intial phase; to make sure to do something after the component is updated 

## Unmounting Phase

### componentWillUnmount

- If we want to do something just before the component unmounts, we can use this lifecycle hook.

# Reference

- [React API Document: lifecycle methods](https://reactjs.org/docs/react-component.html#commonly-used-lifecycle-methods)