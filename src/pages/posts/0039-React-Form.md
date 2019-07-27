---
title: "Controlled Components Example"
date: "2019-07-26 17:39:00"
author: "Han Sim"
category: "React"
tags:
  - JavaScript
  - React
  - Controlled-Component
---

**Instead of using the own state of `input`, `textarea` or `select`, React gets the entire control over these form elements. This is a `controlled component`.**

This is possible because `React` or using virtual DOM is super FAST! Every single moment an user inputs text into `input` or `textarea`, this event invokes `this.state()` to change the state and read it to display (using `value={this.state.....}`).

# Example

```JavaScript
import React, { Component } from "react"

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "write title...",
      body: "write contents..."
    }
  }

  inputHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = event => {
    event.preventDefault()

    const post = {
      title: this.state.title,
      body: this.state.body
    }

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(post)
    })
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(data => console.log(data))
  }

  render() {
    return (
      <div>
        <h1>Add Post</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Title: </label>
            <br />
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.inputHandler}
            />
          </div>
          <div>
            <label>Body: </label>
            <br />
            <textarea
              name="body"
              value={this.state.body}
              onChange={this.inputHandler}
            />
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default PostForm
```
