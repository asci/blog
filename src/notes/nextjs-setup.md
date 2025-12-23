---
layout: main.njk
tags: posts
pubDate: 28 May, 2022
date: 2022-05-28
title: How I setup NextJS project
---

<a href="/">← Back Home</a>

# How I setup NextJS project

Quick guide on decoupling from framework's nudged approach

## What

I use [NextJS](https://nextjs.org/) for building a web application. It is not a blog or set of landing pages — it is more-less interactive. It has some API, client-side requests and so on, potentially can be even an Electron or React Native app.

NextJS is a remarkable framework to start. It provides countless features out of the box: perfect build system, performance optimization, routing and many others. Plus, using [Vercel](https://vercel.com) as hosting is a delightful experience — it provides many nice features even on the free account.

## Why

For the web application I want to keep some freedom. In case NextJS will not be the perfect match. Currently it's a full **vendor lock**. Which is not good for many reasons. Some of them:

- What if Vercel will rise prices?
- What if Vercel go bankrupt?
- What if Vercel decide to focus on some specific features and drop development of ones my project relies on?

These are just a few, but I believe they are important enough to play a bit safer and plan a bit more future-proof architecture for the project.

## How

My approach is simple — **keep pages as small as possible**. And it is inspired by domain-driven design and [layered architecture](https://en.wikipedia.org/wiki/Multitier_architecture).

So, I put in page files only code that should be there. And all other code that contains business logic, goes into outside files and folders.

Let's check flow from a data/backend perspective:

<picture>
  <source 
    srcset="/assets/images/backend-dark.webp" 
    media="(prefers-color-scheme: dark)">
  <img src="/assets/images/backend-light.webp">
</picture>

With clear boundaries, I can change underlaying technologies with less friction. Not only NextJS, but also DB (currently I use [Supabase](https://supabase.com/)) because all communication with DB is limited to `models`. And I can even add new clients, like mobile apps.

From frontend side it is a similar situation:

<picture>
  <source 
    srcset="/assets/images/frontend-dark.webp" 
    media="(prefers-color-scheme: dark)">
  <img src="/assets/images/frontend-light.webp">
</picture>

Separating NextJS features (files for `Page`, `App` and `Document`) from the rest of the app.

Page Component only accepts props that needed for rendering, exposing types and unaware of the parent features. Some components down the line might use React Context created in `App` component.

And I also prefer to separate UI kit layer, so it can be extracted, reused or replaced with less friction.

And my preferred folder structure is looking similar to this:

```
backend
  ⎣handlers
  ⎣models
client
  ⎣components
  ⎣pages
  ⎣api
pages
  ⎣_app.tsx
  ⎣posts.tsx
package.json

```

<div style="width: 100%; text-align: center">
  <open-likes icon="heart" color="#e91e1e" counter="bottom"></open-likes>
</div>
