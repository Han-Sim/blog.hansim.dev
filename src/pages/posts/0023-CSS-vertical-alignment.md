---
title: "How to Verticall Align a Block Element"
date: "2019-07-18 18:29:00"
author: "Han Sim"
category: "CSS"
tags:
  - CSS
  - Design
---

# There can be many ways to do this

- Using `table`s
- Using CSS `grid`s
- Using `flexbox`
- Or I can even use just CSS `position`s to center it!

I'm gonna use `plain CSS` (old CSS) in this post.

# Example Code

https://codepen.io/han-sim/pen/JgoPqX

```HTML
<div class="out">
  <div class="in"> 
    I wanna be centered
  </div>
</div>
```

```CSS
.out {
  width: 600px;
  height: 600px;
  background-color: red;
}

.in {
  width: 400px;
  height: 100px;
  background-color: blue;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```