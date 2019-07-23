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

- `Fast Performance` using static site genertaor `GatsbyJS`
- `Markdown Language` | `Syntax Highlighting`
  - I customized `prism.css` and `markdown.css(GitHub)`
- Recent Post Sections, Tags
- Comments using Social Media
  - by `DisQus` Plugin
- `SPA` (Single Page Application) with `GatsbyJS`
- User-friendly paths(`Post Slug`) to each post
- Responsive design with `Bootstrap` and `ReactStrap`

## Deployment

- **Amazon Web Service: AWS Amplify** (Static Web Host)
- DNS: **Google Domains**

# Notes

## June 28, 2019

Finished deploying the final version

- Completed redesigning to achieve modern UI
  - Removed 'index' page: **`Post` and `PostList` components are the only pages now!**
  - **No more grid design with Row and Col**: Contents take up the entire screen (responsively)
  - Warm toned color scheme (see `_variable.scss` file in the [source code](https://github.com/Han-Sim/blog.hansim.dev/blob/master/src/styles/_variables.scss))
- Refactored codes: enhanced readability and maintainability

Planning to add more features

- Add Categories
- 'More Postings related to this post' kind of feature
- Search Engine plugin

## June 30, 2019

- Added **Category** and **All Posts**
- Updated SCSS files
- Fixed minor design errors in mobile environment

## July 3, 2019

- Added line highlighting. https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/

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

## July 10-18, 2019

- Changed `post-header-area`: now each post has its own `category`!
- Changed **Sidebar** component: changed Tags inline css property
- Code refactoring
- Enhanced readibility of the `markdown-body` area
  - increased the font size and adjusted margins.

## July 23, 2019

### Major update in `Pagination`

- Now it has its own `recent posts` section in each posts!
  - Four recent posts of all, and four recent posts of the same category.
  - Removed pagination from `ReactStrap`; there is no more pages in this blog.


--------------

# Needs to be done

- *Planning to have `subcategory` as well if it gets too complex*
- `Tags` gets messier: build an independent 'tags' page.
- `More posts` (relate to this post) component
- `Search` plug-in
- Better readibility in markdown-body.