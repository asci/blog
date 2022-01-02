---
layout: main.njk
title: Notes
---

<a href="/">← Back Home</a>

# Notes

<div>
{%- for post in collections.posts reversed -%}
  <article>
    <h2>
      <a href="{{ post.url}}">{{ post.data.title }}</a>
    </h2>
    <small>{{ post.data.pubDate }}</small>
  </article>
{%- endfor -%}
</div>
