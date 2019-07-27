---
title: "Image Gallery with Redux-Saga/React"
date: "2019-06-28 08:42:00"
author: "Han Sim"
category: "Redux"
tags:
  - Portfolio
  - JavaScript
  - React
  - Redux
  - Redux-Saga
  - Frontend
---

This is to teach myself `Redux` and `Redux-Saga`. I followed [this tutorial](https://www.youtube.com/watch?v=0L99n06F2rU&list=PLMV09mSPNaQlWvqEwF6TfHM-CVM6lXv39) on Youtube.

# Image Gallery Web Page

**Source Code**: https://github.com/Han-Sim/redux-simple-image-gallery/

Clone the repository and run `npm start`.

![Screen Shot 2019-07-03 at 8.47.42 AM.png](https://i.loli.net/2019/07/03/5d1ca449e3b4514303.png)

# What I learned

## How `Redux-Saga` works?

```JavaScript
import { take } from "redux-saga/effects";

//worker saga
function* loginSaga() {
  console.log("User logged in");
}

function* logoutSaga() {
  console.log("User logged out ");
}

//watcher saga
function* rootSaga() {
  yield take("LOGIN");
  yield call(loginSaga);
  yield take("LOGOUT");
  yield call(logoutSaga);
}

export default rootSaga;
```

If action `action.type==="HELLO"` has been dispatched, `watcher saga` gets it and calls the `worker saga` accordingly.

1. Watcher saga is watching if any action is dispatched.
2. If the action has been dispatched, watcher saga calls a worker saga as the code describes. It is bound with `take`; it will takes the very first dispatch only once, of action `type==="LOGIN"`.
3. The worker saga works.

### Blocking or Non-blocking calls

The order of `yield` code matters here because it is `take`; user makes login first and after logout. If `LOGOUT` action is dispatched **before** `LOGIN`, it won't be watched by `rootSaga()`.

## redux-saga/effects

`import { put } from "redux-saga/effects";`

`put` is one example of what we call an `Effect`. Effects are plain JavaScript objects which contain instructions to be fulfilled by the middleware. When a middleware retrieves an Effect yielded by a Saga, the Saga is paused until the Effect is fulfilled.

https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html

**It is Promise; whenever saga comes across Promises, saga stops working until it is fulfilled.**

## React: `Fragment`

`Fragment` block is required as only `<Provider>` can have only one child in App.js

```JavaScript
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Header />
          <ImageGrid />
        </Fragment>
      </Provider>
    );
  }
}
```

https://reactjs.org/docs/fragments.html

## JavaScript: Generator Functions

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
