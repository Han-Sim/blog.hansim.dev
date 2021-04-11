---
title: "Ways to Prevent Components from Re-rendering"
date: "2019-07-26 14:55:00"
author: "Han Sim"
category: "Web"
tags:
  - JavaScript
  - React
  - PureComponent
  - Lifycycle
---

There can be three ways to prevent components from re-rendering.

> https://reactjs.org/docs/optimizing-performance.html#examples

# 1. `shouldComponentUpdate(nextProps, nextState)` for class components

1. returns `true`: should update(re-render)
2. returns `false`: should NOT update(re-render)

```JavaScript
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 1 };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

# 2. `React.PureComponent` for class components

`PureComponent` is exactly the same as Component except that **it handles the `shouldComponentUpdate` method for us**. When props or state changes, PureComponent will do a shallow comparison on both props and state. (Component on the other hand won't compare current props and state to next out of the box. Thus, the component will re-render by default whenever shouldComponentUpdate is called.)

```JavaScript
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { count: 1 };
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

> Most of the time, you can use `React.PureComponent` instead of writing your own shouldComponentUpdate. **It only does a `shallow comparison`, so you can’t use it if the `props` or `state` may have been mutated in a way that a shallow comparison would miss.**

# 3. `React.memo` for function components

This does same thing with `React.PureComponent` but this is for `Function Component`.

This sentence below is from React dev blog. [click](https://reactjs.org/blog/2018/10/23/react-v-16-6.html#reactmemo)

> Class components can bail out from rendering when their input props are the same using PureComponent or shouldComponentUpdate. Now you can do the same with function components by wrapping them in React.memo.

```JavaScript
const MyComponent = React.memo(function MyComponent(props) {
  /* only rerenders if props change */
});
```

React.memo is a `higher order component`([HoC](https://reactjs.org/docs/higher-order-components.html)). It’s similar to React.PureComponent but for function components instead of classes. We can use this with `High Order Component` pattern.

```JavaScript
function MyComponent(props) {
  /* render using props */
}

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}

export default React.memo(MyComponent, areEqual);
```

https://reactjs.org/docs/react-api.html#reactmemo
