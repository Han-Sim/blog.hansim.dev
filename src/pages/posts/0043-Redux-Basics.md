---
title: "Redux and Redux Thunk"
date: "2019-07-28 17:47:00"
author: "Han Sim"
category: "Web"
tags:
  - JavaScript
  - React
  - Redux
  - Redux Thunk
  - Redux Middleware
---

This app is based on this course: https://www.youtube.com/watch?v=93p3LxR9xfM, I also added more components just for practicing.

> Note that this tutorial did mutate on `props` directly(`this.props.posts.unshift(...)`), which you shouldn't do in any cases. Always dispatch the action to change the state.

> See the full source code here: https://github.com/Han-Sim/redux-basics

# Redux Basics

## Provider

It's a glue for React and Redux. It re-renders the entire application by wrapping them, whenever there is a change in the state.

This is my root component and I wrap it with `<Provider>` component.

```JavaScript
function App() {
  return (
    <Provider store={store}>
      <AppTemplate post={<Post />} postForm={<PostForm />} />
    </Provider>
  )
}

export default App
```

## Store

> https://redux.js.org/api/store
> A store holds the whole state tree of your application. The only way to change the state inside it is to dispatch an action on it. A store is not a class. It's just an object with a few methods on it. To create it, pass your root reducing function to createStore.

### `createStore(reducer, [preloadedState], [enhancer])`

- `preloadedState` is just an initial state.
- `enhancer`: i.e. middleware, chrome redux dev-tools, etc.

This will be just a dummy store, but it works. I used `export default configureStore()`, not `export default configureStore`, because I need to export the returned `store` object, not the function itself.

```JavaScript{8}
import { createStore } from "redux"
// import modules from "./modules"

const configureStore = () => {
  // This is to run DevTools on Chrome
  const devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  const store = createStore(() => [], {}, devTools)

  return store
}

export default configureStore()
```

To compose enhancers, we can use `composeEnhancer()`. I applied `thunk` middleware along with redux dev tool enhancer

```JavaScript
// use 'compose' to put enhancers together
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  () => [],
  initialState,
  composeEnhancer(applyMiddleware(...[thunk]))
)
```

## Action and Reducers

As I mentioned, I put them into one module (one file). Before this, note that I'll put all those constant strings representing action types into one file.

### How Redux Middleware Works?

https://www.youtube.com/watch?v=grZ4BVcFmeA

Without Redux Middleware, Redux works this way:

![Screen Shot 2019-07-26 at 5.34.19 PM.png](https://i.loli.net/2019/07/27/5d3b73095cba889349.png)

1. **Action** type `AGE_UP` is dispatched from a component(view) to the **store**: `dispatch("AGE_UP")`
2. **Store** provides previous state and action to **Reducers**
3. **Reducer** returns a new `state` to the **store**

#### However, what happens if we have an asynchronous operation in our application, such as `fetch`?

If you try to do some asynchronous operation in reducers, it won't work since reducer is designed to run only synchronous operations. That's why we need **middleware**.

Redux middleware does asynchronous operations in the middle before reducer is fired, and after (for example) it fetches data from API, then it passes it to reducer.

## `/actions/postAction.js`

**Actions** are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using store.dispatch().

### Action Creator w/ Redux Thunk

https://redux.js.org/basics/actions#action-creators

> Action creators are exactly that—functions that create actions. It's easy to conflate the terms “action” and “action creator”, so do your best to use the proper term.

```JavaScript
import { FETCH_POST, NEW_POST } from "./types"

// action creator function; returns a function with an argument 'dispatch'
export const fetchPosts = () => {
  console.log("fetching...")
  return function(dispatch) {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(posts =>
        dispatch({
          type: FETCH_POST,
          payload: posts
        })
      )
  }
}
```

- Note that here we return a function that **dispatch**s `FETCH_POST` action.
- The `dispatch()` function can be accessed directly from the store as `store.dispatch()`, but more likely you'll access it using a helper like react-redux's connect(). You can use bindActionCreators() to automatically bind many action creators to a `dispatch()` function.

**`fetchPost()` is a action creator; a function to create Action**. Inside this function, we did `fetch` first and after the asynchronous operation is done, then we _dispatch_ action with its _type_ and _payload_. In this case, we put the data we fetched into the payload.

_Redux Thunk_ allows action creators to perform side effect as per the example above.

### `/reducers/postReducer.js`

```JavaScript
import { FETCH_POST, NEW_POST } from "src/actions/types" // those constants are representing action "type"

const initialState = {
  items: [], // array of post objects
}

// Export default reducer
// Parameters: initialState and Action Types
// Must be a pure function
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POST:
      return {
        ...state,
        items: action.payload
      }
    default:
      return state
  }
}
```

### Put reducers together into `rootReducer` using `combineReducer(Object)`

This is `./store/modules/index.js` file

```JavaScript
/*
    Combining Reducers here
*/

import { combineReducers } from "redux"
import postReducer from "./postReducer"
// import counter from "./counterReducer";

export default combineReducers({
  postReducer
})
```

### `createStore()`, finally!

`./store/index.js`

```JavaScript
import { createStore, compose, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers"

const configureStore = () => {
  const initialState = {}

  // use 'compose' to put enhancers together
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(...[thunk]))
  )

  return store
}

export default configureStore()
```

## connect() to use action creator in the related view component.

It returns a function that connects our react component to the redux store.

```JavaScript
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { fetchPosts } from "src/store/actions/postAction"

class Post extends Component {
  // .....
}

// type-check with props
Post.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  posts: state.postReducer.items
})
export default connect(
  mapStateToProps,
  { fetchPosts }
)(Post)
```

> I did type-check too. I'm not discussing about it here.
> Reference: https://reactjs.org/docs/typechecking-with-proptypes.html

### 1st Parameter: `mapStateToProps`

**It is to `subscribe` state from the store; so that if there is a change on the state, UI can be updated.
**

```JavaScript
const mapStateToProps = state => ({
  posts: state.postReducer.items
})
```

This is related to `reducer`s; **what kind of state should be passed as props?**

In our application, it gets `state.postReducer.items`, because our `rootReducer` look like this:

```JavaScript{2}
export default combineReducers({
  postReducer
})
```

And in this `postReducer`, the state looks like this:

```JavaScript
const initialState = {
  items: [], // array of post objects
}
```

Our `postReducer` update this state when the `FETCH_POST` action is dispatched.

```JavaScript{3-7}
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POST:
      return {
        ...state,
        items: action.payload
      }
    default:
      return state
  }
}
```

We want to display this `items`. That's why we want pass `state.postReducer.items` as `props` to this component.

## 2nd Parameter: `mapDispatchToProps`

This is to update the state. Since the only way to update the state is by firing `dispatch(action)`, `connect()` passes down `dispatch` as props.

Example:

```JavaScript
const mapDispatchToProps = (dispatch) => {
  return {
    onNumberUp: () => dispatch({type:'AGE_UP', payload: 1})
  }
}
```

Because our action creators return a function that includes `dispatch()`, we just add them into the `connect()` instead of mapping them and add `dispatch()`.

---

This is basics of redux. I implemented more features here.

# Results of this React/Redux app

## createPost action creator

```JavaScript
export const createPost = postData => {
  console.log("cratePost action called")
  console.log(JSON.stringify(postData))
  return function(dispatch) {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
      .then(res => res.json())
      .then(post =>{
        console.log(post)
        dispatch({
          type: NEW_POST,
          payload: post
        })
      })
  }
}
```

## How to add this 'new' post to state?

Reducer goes like this:

```JavaScript{8-12}
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POST:
      return {
        ...state,
        items: action.payload
      }
    case NEW_POST:
      return {
        ...state,
        items: [action.payload, ...state.items]
      }
    default:
      return state
  }
}
```

## `PostForm` component

```JavaScript
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { createPost } from "src/store/actions/postAction"

class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "write title...",
      body: "write contents...",
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
      body: this.state.body,
    }

    console.log(post)
    this.props.createPost(post)
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

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.postReducer.item
})

export default connect(
  mapStateToProps,
  { createPost }
)(PostForm)
```

# References

- `connect()`: https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
