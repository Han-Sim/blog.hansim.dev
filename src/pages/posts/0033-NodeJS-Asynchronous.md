---
title: "Node.js and Asynchronous JavaScript"
date: "2019-07-25 19:45:00"
author: "Han Sim"
category: "Web"
tags:
  - JavaScript
  - Asynchronous
  - NodeJS
---

If you need to know more about Asynchronous, you can see related posts here: http://blog.hansim.dev/tag/asynchronous

# What is Node.js?

Node.js is a runtime environment for executing JavaScript code, outside of browser. This is used to build a back-end services(API; application programming interface) that power our client-side applications such as web app, mobile app, etc.

- Easy to start and requires relatively fewer lines of code
- Super fast and highly scalable
- Suitable for data-intensive and real-time apps
- JavaScript everywhere!
  - more consistent codebase is possible because we use JavaScript in client-side and back-end. i.e. same naming conventions, same best practices
- Large eco system including open-source libraries

## again, Node.js is a runtime environment

Every browser includes its own JS engine such as v8 engine in Chrome browser. This is why sometimes same code behaves differently on other browser.

**Browser provides runtime environment to JS code. i.e. window, document object. These objects allow us to work with an environment in which our codes are running.**

**Node.js took v8 engine from Chrome browser, and put it into C++ program instead of a browser. That is Node.js. So it works similar with browsers, but it provides certain runtime environment for the JS code.** For example, instead of window, Node.js provides global object. It gives many useful environment (modules) such as `os`, `fs`, `http`, and so on.

## Asynchronous JavaScript and Node.js

Node.js is highly scalable thanks to the Asynchronous nature of JavaScript; a single thread can work on multiple requests, instead of finishing first request and after moving on to the second request.

### Problem of Blocking or Synchronous architecture

i.e. ASP.NET, Ruby on Rails, etc.

These frameworks has blocking architecture. One thread is sitting on one request until the request is done. For example, say we need to query database to handle the request and of course it takes time. When a thread is assigned to this request, it just wait until it fetches all the data and deliver it to the browser. So if there is another request, we need another thread to handle that request.

If your web site become more popular, and at some point, server cannot handle the large number of requests. So the company needs to buy another server. This is not scalable, because in this synchronous way, we cannot utilize our resource effectively.

Of course, we can write asynchronous code with ASP.NET, but it requires a bunch of extra work while node.js is asynchronous by default.

### Node application is asynchronous by default

**Node application is single-threaded**.

> NodeJS is single threaded, but this is a half truth, actually it is event-driven and single-threaded with background workers. The main event loop is single-threaded but most of the I/O works run on separate threads, because the I/O APIs in Node.js are asynchronous/non-blocking by design, in order to accommodate the event loop. [Click...](https://codeburst.io/how-node-js-single-thread-mechanism-work-understanding-event-loop-in-nodejs-230f7440b0ea)

Back to the previous example, we needed to fetch data upon request, which takes quite some time. Instead of waiting for fetching, Node application put a message in message queue. Node.js is continuously watching and listening on this message queue; when Node hear back from message queue that the data is ready, it takes the result out and process the request again.

> In this process, it doesn't block event loop at all; it just interrupts the loop when the data is ready.

This asynchronous architecture makes node highly scalable and ideal for **I/O intensive applications** that includes a lot of disk or network access. We can serve more client without the need to throw more hardware.

However, when the application is **CPU-intensive** such as video encoding service, Node is not suitable since its single-threaded.

# The Beauty of Asynchronous

https://trello.com/c/5TzQwzMJ/80-what-is-asynchronous-programming-and-why-is-it-important-in-javascript

Synchronous programming means that, barring conditionals and function calls, code is executed sequentially from top-to-bottom, blocking on long-running tasks such as network requests and disk I/O.

**Asynchronous programming means that the engine runs in an event loop. When a blocking operation(that takes time to finish i.e. fetch) is needed, instead of blocking the event loop, the request is just started while the code keeps running without blocking for the result. When the response is ready, an interrupt is fired, which causes an event handler to be run, where the control flow continues.** In this way, **a single program thread can handle many concurrent operations.**

User interfaces are asynchronous by nature, and spend most of their time waiting for user input to interrupt the event loop and trigger event handlers.
Node is asynchronous by default, meaning that the server works in much the same way, waiting in the event loop for a network request, and accepting more incoming requests while the first one is being handled.

This is important in JavaScript, because it is a very natural fit for user interface code, and very beneficial to performance on the server.

Good to hear:

- An understanding of what blocking means, and the performance implications.
- An understanding of event handling, and why its important for UI code.

Red flags:

- Unfamiliar with the terms asynchronous or synchronous.
- Unable to articulate performance implications or the relationship between asynchronous code and UI code.

# References

- Event Loop: https://flaviocopes.com/javascript-event-loop/#blocking-the-event-loop
