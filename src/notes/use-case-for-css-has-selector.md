---
layout: main.njk
tags: posts
pubDate: 2 January, 2022
title: Use case for :has() CSS selector
---

<a href="/">← Back Home</a>

# Use case for :has() CSS selector

To highlight internal interactive elements of some bigger interactive element. For example post card that opens post, but button on that card will add post to favorites.

<img width="565" height="106" src="/assets/images/use-case-example.gif">

Previously for this was either using javascript or more complex layout trick with sibling layer overlaying bigger element.

Here is how to do it with few lines of CSS

```css
.outer,
.outer:hover:has(.inner:hover) {
  background-color: white;
}
.outer:hover {
  background-color: #eee;
}
.inner:hover {
  background-color: #eee;
}
```

Although click event handler still should be captured and stop propagation.

Selector already available in Safari TP and should be added to Firefox and Chromium based browsers this year.
