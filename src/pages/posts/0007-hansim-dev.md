---
title: "hansim.dev: my first personal webpage"
date: "2019-07-01 01:50:00"
author: "Han Sim"
menu: "Web Development"
category: "JavaScript"
tags:
  - Portfolio
  - JavaScript
  - jQuery
  - Web
  - Frontend
  - CSS3
  - Design
---

# https://hansim.dev/

**This is my personal web page describing all about me!**

This web is built with plain `HTML5`, `CSS3`, and `JavaScript`/`jQuery`.

**Source Code**: https://github.com/Han-Sim/hansim.dev

**Screenshot**

![Screen Shot 2019-06-28 at 4.51.04 AM.png](https://i.loli.net/2019/06/28/5d15d51ec9d5429863.png)

## Design

### Parallax scrolling design

#### index.js

Opacity chaing effect on background image.

```JavaScript
//soldier-img opacity changing
$(document).scroll(function() {
  var s = $(window).scrollTop();
  var prevVal = s / topAbout;

  var opacityVal = 0;

  if (prevVal > 0.65) {
    opacityVal = prevVal - 0.5;
  }
  if (opacityVal > 0.5) {
    opacityVal = topAbout / Math.pow(s, 1.15);
  }
  if ($(window).height() + s > topAbout2) {
    opacityVal = topAbout / Math.pow(s, 1.35);
  }
  if ($(window).height() + s > topAbout4) {
    opacityVal = 0;
  }

  //console.log(s + ", " + topAbout + ", " + prevVal + ", " + opacityVal);
  $(".soldier-img").css("opacity", opacityVal);
});
```

### Responsive design

This webpage is built with plain `CSS3` to implement responsive design.

```CSS
/* mobile */
@media (max-width: 60rem) {
  #main {
    padding-top: 4em;
  }

  .main-textbox {
    font-size: 1.5rem;
    width: 90%;
    margin-top: 15%;
  }
  
  .main-linkbox {
    font-size: 1.2rem;
    padding-left: 0.1em;
  }

  #blurred-image-container .img-src {
    background-image: url("/img/main-hero-bg-mobile.jpg");
  }

  #blurred-image-container .blurred-img {
    background-image: url("/img/main-hero-bg-blurred-mobile.jpg");
  }
}
````

### Portfolio

Linked to my blog 'portfolio' tag page: https://blog.hansim.dev/tag/portfolio

## Deployment

I used `GitHub Page` to deploy this web page. I also used `Google Domains` to get the DNS.