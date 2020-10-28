---
title: "Reactive Programming Basics"
date: "2020-09-13 16:00:00"
author: "Han Sim"
category: "Web"
tags:
  - Reactive Programming
  - RxJS
  - Observable
---

[This post on GitHub](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754#reactive-programming-is-programming-with-asynchronous-data-streams) literally the greatest explanation of reactive programming I have found on Internet and I get to decide to summarize it here into several important points.

# Reactive Programming is programming with asynchronous data stream.

![](../images/image-001.png)

- A **stream**, or an **observable**, is a sequence of ongoing events ordered in time which can emit three things:
  - a value of some type
  - an error
  - a 'completed' signal.
- stream is nothing by itself. we must **subscribe** it.
  - https://www.freecodecamp.org/news/blitz-tips-RxJS-pipe-is-not-a-subscribe-125c89437a2c/
- We capture these values only **asynchronously**.
  - Means we don't get to decide when to execute each function. We just define each that will execute when a value / an error / a completed signal is emitted.
- The "listening" to the stream is called **subscribing**.
  - By subscribing a stream, we can do something when a value is emitted.
- The functions we are defining are **observers**.
- The stream is the subject (or "**observable**") being observed.
- Reactive Programming raises the level of abstraction of your code so you can focus on the interdependence of events that define the business logic, rather than having to constantly fiddle with a large amount of implementation details. Code in RP will likely be more concise. **Apps nowadays have an abundance of real-time events of every kind that enable a highly interactive experience to the user. We need tools for properly dealing with that, and Reactive Programming is an answer.**

# Promise is an Observable.

This RxJS function called `fromPromise` will convert a Promise to an Observable. _Note that this operator is deprecated and replaced with `from`_

```JavaScript
// Create a stream from promise.
const stream = Rx.Observable.fromPromise(promise);
```

A Promise is simply an Observable with one single emitted value. Rx streams go beyond promises by allowing many returned values.

# Asynchronous API call.

# Example

http://jsfiddle.net/staltz/8jFJH/48/

- Don't get confused with `startWith`. This makes this stream start from the initial load of the screen. As long as the next `map()` operator does not take any argument, the previous operator `startWith(x)` can have anything for its x.
- By calling `combineLatest` method, we combine two streams here - `closeClickStream` and `responseStream`. [Reference](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/combinelatest.md)

# Refined example here.

[See the example on CodePen](https://codepen.io/han-sim/pen/GRZVEVJ?editors=1111)

I've created an example page on my own that has almost the same logic with the example above but more simplified with the updated RxJS library. These are what I refined:

- Used `pipe` to define a chain of RxJS operators. This is recommended instead of using dot-chaining from an Observable(stream) since RxJS 5.5.
  - Check this official document about `pipe`: https://RxJS.dev/guide/v6/pipeable-operators
- Used `from` instead of `fromPromise`. `fromPromise` is deprecated and wrapped in `from` as of RxJS 6.0.0.
- We don't really need to create another stream out of `refreshClick$` again that emits the data `null`. I found it quite confusing to read and came up with simpler codes for each suggestion stream.

```JavaScript
const request$ = refreshClick$.pipe(
  startWith("let this stream start from the initial load of the screen"),
  // map returns data of any type.
  map(() => {
    const randomOffset = Math.floor(Math.random() * 500);
    return "https://api.github.com/users?since=" + randomOffset;
  })
);

const response$ = request$.pipe(
  // flatMap must return a stream, not a data.
  flatMap((requestUrl) => {
    return from($.getJSON(requestUrl));
  })
);

const suggestionStreamGenerator = (responseStream, closeClickStream) => {
  return merge(
    // Pipe to the response stream that returns a promise stream ($.getJson()) to map the data.
    responseStream.pipe(
      map((listUsers) => {
        return listUsers[Math.floor(Math.random() * listUsers.length)];
      }),
    ),
    combineLatest(responseStream, closeClickStream).pipe(
      map(([listUsers, _event]) => {
        return listUsers[Math.floor(Math.random() * listUsers.length)];
      }),
    ),
  );
}

const suggestion1$ = suggestionStreamGenerator(response$, close1Click$);
```
