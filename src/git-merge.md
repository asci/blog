---
layout: main.njk
title: How to quickly see what was merged in a timeframe (with CLI)
---

# How to quickly see what was merged in a timeframe (with CLI)

For that you'll need to use Github CLI client. First you need to authorize it.

```ts
const fruits = ["apple", "banana", "cherry", "orange"] as const;
type Fruit = typeof fruits[number];

const myFruit: Fruit = "cherry";

function isFruit(some: unknown): some is Fruit {
  return fruits.includes(some as any);
}
```

Ololo pish push

```js
(() => {
  const root = document.querySelector(":root");
  root.style.setProperty("--scroll-y", window.scrollY);
  document.addEventListener("scroll", () => {
    root.style.setProperty("--scroll-y", window.scrollY);
  });
})();
```

This will fetch all merged PRs from Github:

```bash
gh pr list --state merged --json mergedAt,title,url --limit 100 >> prs.json
```

This will select from fetched JSON only records within timeframe

```bash
jq --arg s '2021-10-15' --arg e '2021-10-19' '
[($s, $e) | strptime("%Y-%m-%d")[0:3]] as $r
  | map(select(
        (.mergedAt[:19] | strptime("%Y-%m-%dT%H:%M:%S")[0:3]) as $d
          | $d >= $r[0] and $d <= $r[1]
    ))
' prs.json
```

Found here: [https://stackoverflow.com/questions/40210276/how-to-select-a-date-range-from-a-json-string-by-using-jq](https://stackoverflow.com/questions/40210276/how-to-select-a-date-range-from-a-json-string-by-using-jq)
