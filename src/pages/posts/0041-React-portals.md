---
title: "When to Use React Portals"
date: "2019-07-28 00:01:00"
author: "Han Sim"
menu: "Web Development"
category: "React"
tags:
  - JavaScript
  - React
  - Portal
---

# How `Portal` looks like?

Our component will render this way using `ReactDOM.createPortal(jsx, domNode)`. This method gets two parameters. The first is something that React can render, i.e. `JSX`, `Component`, and the second parm is the dom node that it should be rendered.

```JavaScript
render() {
  // React does *not* create a new div. It renders the children into `domNode`.
  // `domNode` is any valid DOM node, regardless of its location in the DOM.
  return ReactDOM.createPortal(
    this.props.children,
    document.getElementById("div-modal")
  );
}
```

Note that you have to put this element first in the `index.html` file.

```HTML{4}
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <div id="div-modal"></div>
```

## When to Use Portals in React?

It can be used when our UI component shouldn't be included in our React Dom Tree; something shouldn't be rendered in `<div id=root>` - in case of `create-react-app` workflow. The most common example would be `modal` window.

Modal is a pop-up that works with `display` property in `CSS` (https://www.w3schools.com/howto/howto_css_modals.asp). It gets ready with `display: none` status, and when user clicks the button for example, it is set to be updated to `display: block` to pop up.

The problem is, when we include this modal window into our React DOM tree, modal window's style can make a mess with other components by cascading.

> example code: https://codesandbox.io/s/00254q4n6p

## Note that Portals work like other child components

https://reactjs.org/docs/portals.html#event-bubbling-through-portals

> Even though a portal can be anywhere in the DOM tree, it behaves like a normal React child in every other way. Features like context work exactly the same regardless of whether the child is a portal, as the portal still exists in the React tree regardless of position in the DOM tree.
> This includes `event bubbling`. An event fired from inside a portal will propagate to ancestors in the containing React tree, even if those elements are not ancestors in the DOM tree.

# References

- React Official Doc: https://reactjs.org/docs/portals.html
- YouTube Tutorial: https://www.youtube.com/watch?v=HpHLa-5Wdys
- YouTube - `Event Bubbling` and `Event Capturing`: https://www.youtube.com/watch?v=sfKDOOJgbSI
