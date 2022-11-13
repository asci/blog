---
layout: main.njk
title: Artem R.
---

<section class="pane">
  <h1>Intro</h1>
  <p>
    Hi, my name is Artem. I'm a software engineer with focus on web and frontend. I'm interested in design systems, products design and automations. I usually work with React and Typescript.
  </p>

  <p>
    Currently I work at Meta. Recently I was working at <a href="https://www.framer.com/" target="_blank">Framer</a> — startup company that builds prototyping and designing tool with same name. In the past I worked at <a href="https://yandex.com/company/" target="_blank">Yandex</a> office in Kyiv.
  </p>

  <p>
    Since 2015 I live in Amsterdam, The Netherlands, but originally from Ukraine.
  </p>

  <p>
    You can contact me on <a href="https://indieweb.social/@asci">Mastadon</a> or on <a href="https://www.linkedin.com/in/artem-riasnianskyi-90b99830/">Linkedin</a>
  </p>
</section>

<section>
  <h1>Notes</h1>
  {%- for post in collections.posts reversed -%}
    <article>
      <h2>
        <a href="{{ post.url}}">{{ post.data.title }}</a>
      </h2>
      <small>{{ post.data.pubDate }}</small>
    </article>
  {%- endfor -%}
</section>
<section>
  <h1>Projects</h1>
  <h2>
    <a href="https://visti.app/" target="_blank">Visti — RSS reader</a>
  </h2>
  <p>
  Web based RSS reader, focused on privacy and respect of user's time.
  </p>
  <h2>
    <a href="https://ranok-web.netlify.app/" target="_blank">Ranok — coffee app</a>
  </h2>
  <p>
  Little web application with guides, ratio calculator and timers for brewing filter coffee at home.
  </p>
<section>
