---
title: "How Does GatsbyJS and NextJS Work?"
date: "2019-07-24 10:46:00"
author: "Han Sim"
category: "Web Development"
tags:
  - JavaScript
  - React
  - Gatsby
  - Next
  - GraphQL
---

React is basically a client-side JavaScript library; which means we needs surrounding environment for React, and we can choose lots of different technology such as PHP, Node,js, Express, and so on. In this post, I'm going to discuss about GatsbyJS and Next.js and why they are so popular these days. [This blog is also built with gastby](https://github.com/Han-Sim/blog.hansim.dev)

# Problems with a (plain) React Application (client-side rendering)

1. SEO(Search Engine Optimization): Search Engine will only see the blank page of your React web app because it is not rendered yet and that moment is when Search Engine catches your web app.
2. Performance: To load each page, the browser has to fetch data from your data source and it is going to make your web site slow. If the browser needs to render four different components, there will be four fetching requests. Imagine your data source is on the other side of Earth!

**What if your server does fetching instead of the client-side browsers or in terms of SEO, what if server does all the rendering first so that Google search engine can see the fully fleshed HTML page?** GatsbyJS and Next.js allow us to take advantages of React but solve those two problems with SEO and Performance. Both take its own approach to this.

# GatsbyJS is a static side generator; it statically generates

When you type `gatsby develop` on CLI, GatsbyJS does all the work to render every single possible page in your React application; **it goes through all the contents and generates every page beforehand**. So it can work with static web hosting service such as GitHub Pages or AWS Amplify.

Because it does all the job beforehand, it guarantees much faster performance. However, GatsbyJS is a solution that only perhaps few hundreds pages. I built this blog application with GatsbyJS because it is expected to have not a lot of pages. Think about a incredibly big web site. It'd be extremely inefficient to compile every page beforehand. That's when server-side rendering is needed.

> Also, there can be more benefits in SSR. Check my references at the bottom of this post.

When user types URL for the firs time to your web application, we just serve pre-rendered static files.

## GraphQL API and GatsbyJS

GatsbyJS forced GraphQL in order to only get the data that you need. Whatever API you use to fetch data from, we need to convert it into GraphQL.

# NextJS is basically a server-side renderer; it dynamically renders

We can still do server-side rendering with Express or any other server-side technology. Next.js is one of them but it is very neat and easy to set up; **it supports server-side rendering instead of client-side rendering without making server-side code.**

When user types URL for the firs time to your web application, this request goes into Node.js. After, Node.js renders all the content on the server and it serves it right down to the browser. For example, if user enters `/about`, Node.js server handles this request and fetch all the data and contents that is required and render the page.

## NextJS is a very flexible framework

The scope of Next.js is much smaller than the one of GatsbyJS. GatsbyJS comes with a total package including its own environment packed with tons of plugins. It has lots of benefits, for example, there is an image pre-loading plugin which resize every image in order to better the performance, which is really cool.

Wherever you go with GatsbyJS, it has to be convertible to a static site in GraphQL. However, Next.js is more flexible which means it can override Node.js or GatsbyJS and you can use GraphQL only if you need to. Next.js doesn't force anything upon compile-time.

# How routing works in NextJS and GatsbyJS

- GatsbyJS: You have a folder called pages and you put pages in it, however you can use some APIs including graphQL where you can dynamically create route. In this blog, I config routings within gatsby-node.js using Node.js syntax.
- Next.js: You have a folder called pages and you put pages such as index.js, about.js, etc. So there is no routing to config.

# References

- I found this post very helpful to grasp the concept: [What is difference between Client-side Rendering vs SSR](https://medium.com/@swazza85/ssr-with-react-9cb197cfe380)
- [YouTube: How Next.js and Gatsby work and their differences](https://www.youtube.com/watch?v=xC4Yq_mXvPM)
- [Client-side vs Server-side rendering in React](https://stackoverflow.com/questions/27290354/reactjs-server-side-rendering-vs-client-side-rendering)
- Reddit Post: https://www.reddit.com/r/reactjs/comments/992n2r/next_vs_gatsby/e4lrffl/
