---
title: "Web app built with Knockout.js (MVVM design pattern)"
date: "2019-06-28 04:11:00"
author: "Han Sim"
category: "JavaScript"
tags:
  - Portfolio
  - JavaScript
  - Web
  - Node.js
  - Knockout.js
  - jQuery
  - Frontend
  - Bootstrap
  - MVVM
---

# Web Application working with REST API

**Client-side JavaScript code** using `the MVVM pattern` using `Knockout.js`, `jQuery` and `Bootstrap`.

**Source code**: https://github.com/Han-Sim/web-mvvm-knockoutjs

## main.js

- AJAX communication: `PUT` and `GET` request to the REST API
  - Used `jQuery`: `$.ajax(...)`
- Applied the knockout bindings when DOM gets safe to be manipulated (`$function(){...}`)

```JavaScript
$(function() {
  //create a DOM ready handler
  console.log("jQuery working");

  //promise chain
  initializeTeams()
    .then(initializeEmployees)
    .then(initializeProjects)
    .then(() => {
      ko.applyBindings(viewModel);
      $("select.multiple").multipleSelect({ filter: true });
      $("select").multipleSelect({ single: true, filter: true });
    })
    .catch(err => {
      showGenericModal("Error", err);
    });
});
```

## index.html

Used `Bootstrap3` framework
