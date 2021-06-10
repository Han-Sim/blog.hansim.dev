---
title: "The difference between static and dynamic websites"
date: "2021-06-07 01:30:00"
author: "Han Sim"
category: "Web"
tags:
  - JavaScript
---

# Static website

Static website means it contains html, js, and css files; it may contain only html files, but it does not contain anything other than these three types of files.

It does not mean that page is not changing; DOM can be dynamically updated by JavaScript on the client side as user interacts with the website. **Static only means the page is not generated on the server**. Every static files are delivered to the client, and the server is not updating it. The raw source code won't be changed even when user send any other request to the server.

- HTML, CSS, and JS
- NOT dynamically rendered on a server, but still served by a server
- Page content can change via JavaScript files (that are already on the client's browser)
- The page can still change; it's just pre-built during development.

# Dynamic website

In dynamic websites, the server yields a different file when it gets a new request. While static website always has the same files, in dynamic websites those files can change.

- Server-side language such as Node
- The server returns dynamically generated HTML page
- The server can serve a JavaScript that can build HTML documents and render pages but the server is not involved in this page rendering anymore. That is not even possible.
- **Dynamic does not mean that there's no HTML page being served; they are just built dynamically for each request**

# Advantages and disadvantages

| Static                                                                                                            | Dynamic                                                                                               |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Rendering happens in browser, which leads higher reactivity but data needs to be fetched after initial rendering. | Rendering happens on Server. Finished page is served but it needs to be generated first on the server |
| Security can be more complex                                                                                      | Security tends to be easier                                                                           |
| Static host suffices, no complex server-side setup required                                                       | Host needs to run your server-side codes                                                              |

# Deployment

| Static                                                                          | Dynamic                                                                  |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Only a static host is needed, as it only needs to serve HTML, JS, and CSS files | Host needs to support the chosen server-side language and version        |
| Static hosts tend to be cheaper, and setup is easier                            | Dynamic hosts tend to be more complex to setup and can be more expensive |
| AWS s#, Firebase Hosting                                                        | AWS EC2/ Elastic Beanstalk, Heroku                                       |

# Trends?

Static websites are getting super popular because we can offer a native-app-like experience to users with JavaScript running on their browser. Static websites are also generally easier to maintain and update constantly.
