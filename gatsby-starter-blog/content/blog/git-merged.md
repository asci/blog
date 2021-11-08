---
title: How to quickly see what was merged in a timeframe (with CLI)
date: "2021-11-07T22:12:03.284Z"
description: "Small guide on how to speed up checking what was merged during some period of time"
---

For that you'll need to use Github CLI client. First you need to authorize it.

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
