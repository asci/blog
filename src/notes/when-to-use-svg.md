---
layout: main.njk
tags: posts
pubDate: 15 February, 2022
date: 2022-02-15
title: When to use SVG
---

<a href="/">← Back Home</a>

# When to use SVG

SVG are great choose for UI elements like icons and graphic elements that will scale. But if you need to use it as illustration with known dimensions — consider first trying PNG with doubled dimensions (for retina screens) after OxiPNG compression using [https://squoosh.app/](https://squoosh.app/). You can also reduce amount of colors if it makes sense. The app will show you difference in percentage and if it's not bigger then 25% increase good changes that PNG will perform better. The more elements you have in SVG the more changes that PNG will be better for that image.

The reason for this is performance of huge SVG elements might be not good — SVG adds a lot of complexity to the render pipeline and DOM structure.

If you need to animate or alter parts of SVG, consider extracting only those parts and render them over PNG.
