---
layout: main.njk
title: Artem R.
---

<section class="pane">
  <h1>Intro</h1>
  <p>
    Hi, my name is Artem. I'm a software engineer with focus on web and frontend. I'm interested in design systems, product design and automations. I usually work with React and Typescript.
  </p>
  <p>
    You can contact me on <a rel="me" href="https://indieweb.social/@asci">Mastodon</a>
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
    <a href="https://znovu.app/" target="_blank">Znovu — habits tracker</a>
  </h2>
  <p>
  Mobile first PWA for tracking daily habit with gamification, focused on privacy.
  </p>
  <h2>
    <a href="https://ranok.app" target="_blank">Ranok — coffee app</a>
  </h2>
  <p>
  Mobile first PWA with guides, ratio calculator and timers for brewing filter coffee at home.
  </p>
  <h2>
    Visti — RSS reader (decommissioned)
  </h2>
  <p>
  Web based RSS reader, focused on privacy and respect of user's time.
  </p>
<section>

<section>
  <h1>Bookshelf</h1>
  <div class="book">
    <div class="left">
      <img src="/assets/images/book-ddia.jpg" width="125" height="auto" />
    </div>
    <div class="right">
      <h2>
        <a href="https://oku.club/book/designing-data-intensive-applications-by-martin-kleppmann-K70CZ" target="_blank">
          Designing Data Intensive Applications
        </a>
      </h2>
      <p>
        Good overview on how to build reliable and scalable systems. A lot of insights about distributed systems, databases and data processing.
      </p>
    </div>
  </div>
  <div class="book">
    <div class="left">
      <img src="/assets/images/book-et.jpg" width="125" height="auto" />
    </div>
    <div class="right">
    <h2>
    <a href="https://oku.club/book/effective-typescript-by-dan-vanderkam-FtAZz" target="_blank">
      Effective TypeScript
    </a>
    </h2>
    <p>
      A lot of useful tips and tricks for writing better TypeScript code. Especially useful for migration projects from legacy JS codebase.
    </p>
  </div>
  </div>
  <div class="book">
    <div class="left">
      <img src="/assets/images/book-pm.jpg" width="125" height="auto" />
    </div>
    <div class="right">
    <h2>
    <a href="https://www.goodreads.com/book/show/30014110-practical-monitoring" target="_blank">
      Practical Monitoring
    </a>
    </h2>
    <p>
      Good and abstract introduction into monitoring and observability. Ideas around how to build reliable systems and how to monitor them.
    </p>
  </div>
  </div>
<section>
