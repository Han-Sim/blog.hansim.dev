---
title: "React: Props and State in a nutshell"
date: "2019-07-04 01:30:00"
author: "Han Sim"
category: "Web Development"
tags:
  - JavaScript
  - React
---

# So what's `props` and `state` in React?

> The `state` is a data structure that is local, and starts with a default value when a Component mounts.
> `Props` (short for properties) are a Component’s configuration. Props are how components talk to each other. They are received from above component and shouldn't be mutated by the child component.

Simply, **Props** and **State** are two different types of data that controls **component**.

The biggest difference between props and states is that props is meant to set by its _parents_(or _caller_) and hence the value is fixed and never changed, while state can be changed by `setState()`.

So, if we don't need to change its value over time, just define it as a field on the component instance! State is needed because we need to change its value.

For most of the case, **state** is initialized within `cosntructor()`, which means this will be initialized for the very first phase of its lifecycle hook.

![Screen Shot 2019-07-03 at 11.07.51 PM.png](https://i.loli.net/2019/07/04/5d1d6d976f01319289.png)

http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

```JavaScript{3}
constructor(props) {
  super(props);
  this.state = { counter: 0 }; //state here
  this.handleClick = this.handleClick.bind(this); //binding
}
```

## You can still use `props` instead of `state` by lifting states up

Even when the component may alter some variables depending on events (say you need to build a `controlled component` https://reactjs.org/docs/lifting-state-up.html), it doesn't need to be `state`.

Still, using `state` can be a nice and simple solution, for example, when you need to toggle a modal, you can simply build an internal state and put the boolean property such as `showModal`, and simply flip it by an event handler function and define such as `setState(prevState => { showModal: !prevState.showModal})`.

However, if you need to implement `single source of truth` or maintain different states in sync (**when different components need to notify changes in state**), you can `lift state up` which is one of those React Techniques; you just lift state up to the ancestor, and get `props` instead, and whenever you need to change `props`, you just call such as `this.props.handleClick` which is a event handler that is passed from the parent.

> Of course, you can go fot `Redux` to handle this situation.

This official document gives a perfect explanation about `lift state up` and `singe source of truth`: https://reactjs.org/docs/lifting-state-up.html

# Functional vs Class-Based Component

## Functional (Stateless) Component

- Receive props as an argument.
  - just `props`, not `this.props`
- No internal state
- No Lifecycle Methods
- Use as often as possible! (It is recommended as it is highly readable and light)
  - `Presentational Components`

## Class (Stateful) Component

- Can get props as an argument as well, but use `this.props`!
- Manage its own internal state (`this.state`)
- Can use Lifecycle Methods
- It is recommended to use it only when its needed.
  - only when we need to use a local state or lifecycle methods from React.Component
  - used for `Container Components` (logics for `Presentational Components`)

# `setState()`

## `setState()` runs asynchronously

```JavaScript
this.setstate({
  counter: this.state.counter++
})
```

Because it runs asynchronously, `this.state.counter` may not have the value that we expected it to have; there is no guarantee that the old state has reflected any updates. That's why you should `callback` instead

```JavaScript
this.setState((prevState, props) => {
  return {
    counter: prevState.counter + 1
  }
})
```

This way, we can be guaranteed that `prevState.counter` holds the last valid value which we expected.

# References

- https://reactjs.org/docs/components-and-props.html
- https://reactjs.org/docs/state-and-lifecycle.html
