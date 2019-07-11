---
title: "Markdown Blog with Gatsby/GraphQL"
date: "2019-07-01 02:13:00"
author: "Han Sim"
category: "React | React Native"
tags:
  - Portfolio
  - JavaScript
  - React
  - Gatsby
  - GraphQL
  - Serverless
  - Web
  - Frontend
  - Bootstrap
  - Blog
  - Design
---

# https://blog.hansim.dev

Welcome to my dev blog!

**Source Code**: https://github.com/Han-Sim/blog.hansim.dev

# How I built the blog

## Frameworks/libraries

**Serverless**/**static PWA** with `GatsbyJS` and `GraphQL`.

- `GatsbyJS`
- `React`
- `GraphQL`
- `Bootstrap/ReactStrap`

## Key Features

This is a fully featured blog

- Markdown Language | Syntax Highlighting
  - I customized `prism.css` and `markdown.css(GitHub)`
- Recent Post Sections, Tags
  - by `GatsbyJS/GraphQL`
- Comments using Social Media
  - by `DisQus` Plugin
- `SPA` (Single Page Application) supported by `GatsbyJS`
- User-friendly paths(`Post Slug`) to each post
- Responsive design
  - by `Bootstrap` and `ReactStrap`

## Deployment

- **Amazon Web Service: AWS Amplify** (Static Web Host)
- DNS: **Google Domains**

# Notes

## June 28, 2019

Finished deploying the final version

- Completed redesigning to achieve modern design
  - Removed 'index' page: **`Post` and `PostList` components are the only pages now!**
  - **No more grid design with Row and Col**: Contents take up the entire screen (responsively)
  - Warm toned color scheme
- Refactored codes: enhanced readability and maintainability

Planning to add more features

- Add Categories
- 'More Postings related to this post' kind of feature
- Search Engine plugin

## June 30, 2019

Added **Category** and **All Posts**

Updated SCSS files

Fixed minor design errors in mobile environment

## July 3, 2019

Added line highlighting. https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/

```CSS
.gatsby-highlight-code-line {
  background-color: #feb;
  display: block;
  margin-right: -1em;
  margin-left: -1em;
  padding-right: 1em;
  padding-left: 0.75em;
  border-left: 0.25em solid $highlight-1;
}
```

## July 10, 2019

Changed post-header-area: now it shows its category!

Changed **Sidebar** component: increased width and changed Tags inline css property

Code Refactoring

