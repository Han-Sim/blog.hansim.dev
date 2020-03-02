---
title: "Why Do We Use Arrow Function Syntax in React?"
date: "2019-07-18 14:19:00"
author: "Han Sim"
menu: "Web Development"
category: "React"
tags:
  - JavaScript
  - React
---

Note that this is still an experimental feature of `React` yet. However, this allows the code to be extremely simple and readable.

# It is because Arrow Functions do not have `this` itself!

**JavaScript doesn't have a `method` per se; it only has `functions`**([Prototype-based Inheritance](https://blog.hansim.dev/javascript-and-prototype-based-inheritance)). That is why we need to `bind` those functions in a `constructor` using `this` keyword.

If we don't use `arrow` syntax, we need to bind functions to the class so that it works as a method.

```JavaScript{4}
class Foo extends React.Component{
  constructor( props ){
    super( props );
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(event){
    // your event handling logic
  }
  
  render(){
    return (
      <button type="button" 
      onClick={this.handleClick}>
      Click Me
      </button>
    );
  }
}

ReactDOM.render(
  <Foo />,
  document.getElementById("app")
);
```

**However, if we use `arrow function` instead, it takes `this` from its lexical scope as it does not have its own `this`.**

```JavaScript
handleClick = (event) => {
  //codes...
}
```

# References

- [this in JS](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch2.md)
- [Why do we use arrow functions in React](https://frontarm.com/james-k-nelson/when-to-use-arrow-functions/)