---
layout: main.njk
tags: posts
pubDate: 9 January, 2021
date: 2021-01-09
title: Rasterize HTML in browser
---

<a href="/">← Back Home</a>

# Rasterize HTML in browser

Exploration on how to rasterize HTML content locally on the client with browser extension

## Why client side

First of all let's clarify what is rasterization — it is a process of transforming HTML structure into an image. It's mostly the same as taking screenshot of a web page. But there is no easy way to take a screenshot of a web page automatically with some corresponding Web API.

So, there are some services & libraries that provide ability to take a screenshot of a page, for example for testing and visual diffing. Under the hood they usually have some headless browser that do the rasterization part and provides API to take a screenshot. Although this approach works for a lot of cases it has few disadvantages: we need to have a server and we need to pay for it (and if we need specific OS like MacOS it will cost a lot), secondly we're loosing access to web resources available to the user like fonts or some pages behind authorization. And in general it's pretty hard to get same image as what's on the user's screen.

Going with a client side rasterization we can save our money and provide to the users images that match what they see on the screen. But what's wrong with screenshots? Well, if we need to rasterize specific part of the page, sizing that part is a be a terrible user experience and also screenshots do not support transparency and we can't easy take screenshots with different resolution, like for retina displays

## Limitaions and approaches

Depending on your task there are different options available. Let's consider them before moving to the solution for my task.

### Canvas

There is implementaions for rendering HTML inside canvas element. Fonts rendering and antialiasing would differ with browser. No way to bypass security of iframes.
[Example](https://html2canvas.hertzen.com/)

### WebGL

Same issues as rendering to canvas, but allowing more GPU intense effects using sharers:
[Demo](http://pixelscommander.com/polygon/htmlgl/demo/filters.html#.X-m3AWT0lqs) and [Article](http://pixelscommander.com/web-applications-performance/render-html-css-in-webgl-to-get-highest-performance-possibl/)

### Render in SVG

Render HTML in SVG as foreing object and then use SVG as image and render it in canvas. Issues with external images and styles. No way to bypass security of iframes.

### Browser extension

Color profilies still might be a problem. Getting exports with transparency is tricky but possible.

~~I found 2 ways of rasterizing HTML content. Both methods share same preparations and setup for communication.~~

## Communication with extension

This part is not striclty related to rasterizing, but it's a nice to know what is required end-to-end for setting up system with extensiton rasterization.

We need "client" and "renderer" pages. The "client" will make requests to extension to perform rasterization on some HTML. The "renderer" page will be invisiblly created and will render HTML and will be used to take screenshot from, in case we need some additional operations like zoom or scroll.

Roughly communication steps are the following:

```mermaid
%%{init: {
  'themeVariables': {
    'fontFamily': '-apple-system',
    'lineColor': 'var(--text-main)',
    'textColor': 'var(--text-main)',
    'clusterBkg': 'var(--background-alt)',
    'clusterBorder': 'transparent',
    'mainBkg': 'var(--background-body)',
    'primaryBorder': 'var(--background-body)',
    'edgeLabelBackground': 'var(--background-body)',
    'primaryBorderColor': 'red',
    'labelBoxBorderColor': 'red',
    'secondaryBorderColor': 'red'
}}}%%
graph TB
    subgraph Renderer page
      injectedRenderer["Injected script"]
      render["Render with zoom"]
      readyEvent["Content Ready event"]
      injectedRenderer-->render
      render-..->readyEvent
    end
    readyEvent--runtime.sendMessage-->listenerRenderDone
    listenerRender-->openNewTab
    openNewTab--Renderer page URL-->injectedRenderer
subgraph Extension script
      listenerRender["Listener:Render"]
      openNewTab["Open new browser hidden tab"]
      listenerRenderDone["Listener:Render Complete"]
      takeScreenshot["Take screenshot"]
      saveImage["Save image"]
      listenerRenderDone-->takeScreenshot
      takeScreenshot-->saveImage
    end
    injectedClient--runtime.sendMessage-->listenerRender
    subgraph oooo [Client page]
      clientCode["Client App"]
      injectedClient["Injected script"]
      clientCode--"document.createEvent"-->injectedClient
    end

```

- Inject [content script](https://developer.chrome.com/docs/extensions/mv2/content_scripts/) that will allow to send messages to the extension by using custom document event [source](https://stackoverflow.com/a/13292994)
- When needed call content script method for sending message
- Message may contain base64 encoded HTML data that has to be rendered (although I did not find a way to get actual rendered image data if use it as URL)
- Extension creates new, not focused window
- Extension creates new tab with HTML that has to be rasterized
- Extension injects content script that will indicate when page is loaded

## Rasterize with tab screenshot

This is more-less standard approach that is being used by some of extensions that do screenshots.

Steps to achieve rasterizing with standard extension method that captures visible area of a tab.

- Apply zoom if specified (for HDPI screens, eg. Retina), for this my example I use query parameters
- Call `chrome.tabs.captureVisibleTab` to capture visible content of the page into base64 encoded image data URI
- If image is bigger then screen — image should be tiled and then capture will happen only on visible part. The visible part will be moved by using scrolling

### Limitations:

- No easy way to get transparency. Current exploration for the workaround is to take screenshot twice — with black background and with white, then make mask from the difference and render image on canvas applying mask. There is a promising idea: https://legacy.imagemagick.org/Usage/masking/#two_background

## Rasterize with debugger protocol

More exotic approach to rasterize HTML is to use Debugger protocol (https://chromedevtools.github.io/devtools-protocol/1-3/) from extension. Basically it is API for extensions that want to provide external debugger to the page (similar approach is used in VS Code for debugging pages remotely).

The big advantage of using this approach is ability to capture transparent background with ease. This is achieved by function that emulates devices and allows to set backgrounds with alpha channel. This also opens ability for better scaling without zoom.

But there is also a bit disadvantage — because debugger protocol is very powerful there are some security concerns, so Google Chrome team decided to put huge banner to all open pages about debugging.

So steps to rasterize HTML with debug protocol:

- First we attaching debugger to a tab
- Sending command to set device transparent background
- Sending command to capture screenshot
- Detaching debugger from the tab

First there has to be debugger attached to the page
Then we can send `Page.captureScreenshot` command to debugger instance - https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-captureScreenshot

### Limitations:

- No usage of DevTools while making screenshot: https://developer.chrome.com/docs/extensions/reference/debugger/#notes
- Huge banner in all tabs and windows telling that extension is started debugging this browser. No clear way how to get rid of it - https://bugs.chromium.org/p/chromium/issues/detail?id=1096262 apart from running Chrome with flag ` --silent-debugger-extension-api`

Save image

- After image is ready it could be saved using `chrome.downloads.download`
