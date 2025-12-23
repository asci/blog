---
layout: main.njk
tags: posts
pubDate: 21 June, 2022
date: 2022-06-21
title: Using manual diagrams to learn new codebase
---

<a href="/">← Back Home</a>

## Using manual diagrams to learn new codebase

When exploring a new codebase, it is difficult to get all the entities and relations between them at the same time. Everything is new, and with each opened file, the brain gets bombarded with new information. That's why I think it is important to unload part of the information to an external carrier. Some kind of map, that will help to navigate the codebase.

### Why not automated?

In the past, I was trying to solve this with automated tools. I was looking for something that check all imports/exports and build an interactive graph of dependencies. My primary focus was Javascript (Typescript). And I managed to find tools that partially deliver, but then I realize that they have 3 big downsides.

#### Limited coverage

Firstly, tools cover only one part of the codebase. Most of what I found was focused on building just dependencies graph. So If you change language or build system — you need to find another solution.

#### Unidirectional

Tools are also limited because they are mostly unidirectional. They only generate something and that's it — no comments, no questions, no additional connections (the one that are not expressed directly via import/export, but for example calls via HTTP API). Feedback is limited. It is hard to add some additional layer of information.

#### Informational overload

Another thing, is that automated generation creates more information than needed. There is simply too much stuff happening on the map, and it's not helpful to learn or navigate. The connections in our brain cannot build so quickly, so I found it natural to slow down and to use manual diagrams.

### Manual

For each new task or project, I create a new diagram. I try to add some code pointers, like filenames, so I can easily open related files when required. I connect them with labeled lines, that represents call name or relationship status (for example: "extends", "implements", "generates").

Furthermore, I also like to add actors, or people that solving some problem with this code — is it a customer who wants to buy new car insurance, or is it a designer who would like to share their prototype? Sometime actors are mechanical — timer, or some other external event, but it is still helping to understand what is the starting point in the context of the task. And it also helps to understand what are the data shapes.

### Tooling

For quick start I use [tldraw](https://www.tldraw.com/), it's a simple and lightweight, but well-designed instrument. The downside — no way to share or embed diagram from website. Storage is limited to browser local storage or to file (which is handy to put in code repository and use it with [VS Code plugin](https://marketplace.visualstudio.com/items?itemName=tldraw-org.tldraw-vscode)). Ah, and sometimes bugs occur during image export, not critical, but a bit annoying.

For something more sophisticated, I prefer [diagrams.net](https://www.diagrams.net/) — it is a powerful, yet adjustable instrument for any kind of diagrams. It's even supporting SQL schema imports. I use it with "sketch" theme and created a set of elements to match ones from tldraw (basically using [Caveat Brush](https://fonts.google.com/specimen/Caveat+Brush) font for all texts).

I used to make diagrams with [mermaid](https://mermaid-js.github.io/mermaid/#/), but moved away from it, since it's very limiting expression. It's nice to be able to move something with mouse during exploration phase, to add some questions and comments. But it might be a good choice for documenting something established and well known, and put it in code repository — its text format is more readable than tldraw's.

### Process

I don't follow any strict process, but there are a few ideas I try to follow in each of the diagrams.

#### Start

Diagrams should have a start. If I document some process, and it has one or multiple entry points it is crucial to mark the where to start looking at diagram, it is the same place where process starts, or at least the most important part of the process. It can be form submission, it can be a webhook call, template for code generation, message from the message queue, etc.

<picture>
  <source 
    srcset="/assets/images/roles-dark.webp" 
    media="(prefers-color-scheme: dark)">
  <img src="/assets/images/roles-light.webp">
</picture>

#### Roles

Second — show roles or actors. As mentioned above. It's important to show (or at least imagine) goals of each actor in the process. For simple flows or codebase, it can be only one actor.

#### Questions and answers

<picture>
  <source 
    srcset="/assets/images/sticky-dark.webp" 
    media="(prefers-color-scheme: dark)">
  <img src="/assets/images/sticky-light.webp">
</picture>

Questions are a critical part of learning. If something is not clear, I immediately put a sticky note next to it with a question. I use yellow for questions. Later, when I continue to explore the system, I can find the answer to my question and just put a new sticky note (green one) next to the question with answer. Occasionally, I can't find a clear answer — then I try to find somebody more knowledgable in the area and setup a meeting to follow all remaining question stickies.

<div style="width: 100%; text-align: center">
  <open-likes icon="heart" color="#e91e1e" counter="bottom"></open-likes>
</div>
