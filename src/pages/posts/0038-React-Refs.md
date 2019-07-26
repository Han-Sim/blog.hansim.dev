---
title: "Refs and the DOM in React"
date: "2019-07-26 15:39:00"
author: "Han Sim"
category: "React"
tags:
  - JavaScript
  - React
  - DOM
  - Ref
---

Basically, `refs` makes it possible to access DOM nodes directly. `ref` is an object and it has a property `current`; it points to the actual DOM node.

# Two Ways to Use `Refs`

## 1. `React.creatRef()`

```JavaScript{5, 12, 20}
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.inputRef = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.inputRef.current.focus();
  }

  render() {
    // tell React that we want to associate the <input> ref
    // with the `textInput` that we created in the constructor
    return (
      <div>
        <input type="text" ref={this.inputRef} />

        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

1. Define ref using `React.createRef()`: `this.inputRef = React.createRef()`. We define ref in `constructor` so that the component can use this ref variable throughout its entire life time.
2. In `JSX` code, we can get the DOM reference from putting `ref={this.inputRef}`.
3. By now, `this.inputRef` is an object who has a reference to this input element.
4. We can use raw DOM APIs. i.e. we can use the HTML DOM `focus()` method(https://www.w3schools.com/jsref/met_html_focus.asp) by writing this: `this.inputRef.current.focus()`

## 2. Creating `callback refs`

Another way to set refs in React is to use callback refs. With this method, instead of passing a ref attribute created by createRef(), **you pass a function that, when called, receives the React component instance or HTML DOM node as its argument, which can be stored and accessed elsewhere.** Here’s what that looks like:

```JavaScript{7-9, 27}
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = null;

    this.setTextInputRef = element => {
      this.inputRef = element;
    };

    this.focusTextInput = () => {
      // Focus the text input using the raw DOM API
      if (this.inputRef) this.inputRef.focus();
    };
  }

  componentDidMount() {
    // autofocus the input on mount
    this.focusTextInput();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <div>
        <input type="text" ref={this.setTextInputRef} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

You can use callback instead; the first argument represent the element you want to assign to your `ref`: `ref={element => this.inputRef = element}`

# Don't overuse Refs!

Refs are useful when we needs to use some raw DOM API. When it comes to input element and `focus()`, many developers just use `ref` because it is simple and handy.

However, basically, you should not be writing code that imperatively manipulates the raw DOM. According to the official [doc](https://reactjs.org/docs/refs-and-the-dom.html), we can use `refs` in these occasions:

- Managing focus, text selection, or media playback.
- Triggering imperative animations.
- Integrating with third-party DOM libraries.

When it can be done declaratively, you shouldn't use `refs`.

> Always try to do things declaratively first. In general, you avoid using refs for things that can be done declaratively. An example is updating the background colour of a div, in response to a click event. In this scenario, you should pass a backgroundColour prop to your component, instead of exposing a () method (which you then call via access to a Ref) on it.

# References

- Official document by Facebook: https://reactjs.org/docs/refs-and-the-dom.html
- https://medium.com/@mrewusi/a-gentle-introduction-to-refs-in-react-f407101a5ea6
