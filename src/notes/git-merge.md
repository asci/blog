---
layout: main.njk
title: How to quickly see what was merged in a timeframe (with CLI)
---

<a href="/">← Back Home</a>

# How to quickly see what was merged in a timeframe (with CLI)

Let's say you see some change in chart of your app performance on specific date, and want to know what might be the cause. You can go to Github and check manually merged pull requests sorted by date but you can also speed it up by simple script.

For that you'll need to use [Github CLI](https://cli.github.com/) client. Install it with your favorite package manager and then autorize by running `gh auth login`

After this go to the folder with repo with you want to check for merges. Then run following command to fetch all merged pull requests in JSON format:

```bash
gh pr list --state merged --json mergedAt,title,url --limit 100 >> prs.json
```

It will create `prs.json` file that we will use to filter using `jq`. If you don't have it installed find how to install it on [this page](https://stedolan.github.io/jq/download/) To do so run the following command replacing dates with the timeframe you're looking for:

```bash
jq --arg s '2021-10-15' --arg e '2021-10-19' '
[($s, $e) | strptime("%Y-%m-%d")[0:3]] as $r
  | map(select(
        (.mergedAt[:19] | strptime("%Y-%m-%dT%H:%M:%S")[0:3]) as $d
          | $d >= $r[0] and $d <= $r[1]
    ))
' prs.json
```

<small>
Source: <a href="https://stackoverflow.com/questions/40210276/how-to-select-a-date-range-from-a-json-string-by-using-jq">Stackoverflow</a>
</small>
