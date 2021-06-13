---
title: "REST API basics"
date: "2021-06-13 13:20:00"
author: "Han Sim"
category: "Web"
tags:
  - REST
  - API
  - HTTP
  - Stateless
  - Software Architectural Style
---

REST stands for Representational State Transfer. Any web service that obeys the REST constraints is informally described as **REST**ful. Note that REST is not HTTP, not a protocol, and not a official standard; REST is a guideline to build a performant and scalable system in web, whereas SOAP is a protocol and "official" standard.

# Architectural Constraints

> Source: [Wikipedia page](https://en.wikipedia.org/wiki/Representational_state_transfer#Architectural_constraints)

## 1. Client-server model

Should follow client-server model.

## 2. Stateless

Truly RESTful server is not allowed to retain information about the state of another machine. **Each request is independent** and the server does not remember client's activities. When we use a website, the server seems to remember that the request is made by me; this can be done by using **tokens** in REST API. Using tokens is a good way to have a stateless design that create an experience that seems remembering state to the user.

## 3. Cacheable

## 4. Uniform Interface

Regardless of the OS, each communication is always identical.

## 5. Layered System

If the clients make an api call to a RESTful API called `/api/customers`, the client does not know what is happening under the hood in this server. This end-point may call another API during the process, but this is not revealed to the client side. Those underlying complexities are all abstracted and not visible.

## 6. Code on Demand (Optional)

This is optional. With this constraints, a server can send executable code, such as JavaScript, to the client.

# Request and Response

## Request

Request consists of:

1. Header
2. HTTP Method
3. End-point i.e. `/api/customers'
4. PARAM/Body

Notice that `/api/*` is not compulsory but many follow this convention.

Possible HTTP Methods/Operations (**CRUD operations**):

1. Create: `POST`
2. Read: `GET`
3. Update: `PUT`
4. Delete: `DELETE`

```
POST /api/customers

{ id: 1 }
```

## Response

Response with `json`

# The advantages of REST API

- Simple to use.
- Scale and stateless
  - Easy to make modification as your service grows in complexity
  - No need to worry about which data is in which state since it's truly stateless. This also leads to high performance since it removes server load that can be caused by retention of session information.
- High performance - cache supports
