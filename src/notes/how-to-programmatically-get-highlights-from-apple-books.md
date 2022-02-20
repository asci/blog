---
layout: main.njk
tags: posts
pubDate: 20 February, 2022
title: How to programmatically get highlights from Apple Books
---

<a href="/">← Back Home</a>

# How to programmatically get highlights from Apple Books

If you, like me using Apple Books for reading and making notes you may notice that getting highlights is not easy — you can’t just export them using Share Sheet.

Without using third party apps there only one option I know — open Apple Books on desktop, open book highlights in UI and using Command key select highlights and then in context menu use Copy. It will copy highlights in text format with book name, date and copyright info.

It is possible to parse that text data, but there is still manual step — you need to copy highlights from each book. Not cool. Let’s automate it using Javascript and Node.js (well, actually using Typescript and [tsm](https://www.npmjs.com/package/tsm)).

First of all let’s create types that we will operate with:

```tsx
// Book, but could be a sample or an article in PDF
interface Book {
  id: string;
  title: string | null;
  author: string | null;
}

interface Annotation {
  assetId: string; // pointer to Book.id
  quote: string | null;
  comment: string | null;
  chapter: string | null;
  colorCode: number;
  modifiedAt: number;
  createdAt: number;
}
```

Next step is to extract raw data from origin. It is relatively easy — Apple stores highlights from Apple Books in SQLite DB, so we can access files and read from them everything we want.

We would need to read from 2 sources — one for annotations and another for info about book. We well produce denormalized data — each highlight item will contain book name and author, so it would be easier to process. But in some cases normalized data might be better, feel free to edit.

Let’s prepare out source files:

```tsx
import glob from "glob";
import os from "os";

const username = os.userInfo().username;
const ANNOTATION_DB_PATH = `/users/${username}/Library/Containers/com.apple.iBooksX/Data/Documents/AEAnnotation/`;
const BOOK_DB_PATH = `/users/${username}/Library/Containers/com.apple.iBooksX/Data/Documents/BKLibrary/`;
const annotationsFiles = glob.sync(`${ANNOTATION_DB_PATH}/*.sqlite`);
const booksFiles = glob.sync(`${BOOK_DB_PATH}/*.sqlite`);
```

Don’t forget to install dependency `glob` with

```tsx
npm i glob
```

it will help to get all file names in the folders

Next, create SQL query for fetching data in the format we defined earlier. This one will produce `Annotation`

```tsx
const SELECT_ALL_ANNOTATIONS_QUERY = `select 
  ZANNOTATIONASSETID as assetId,
  ZANNOTATIONSELECTEDTEXT as quote,
  ZANNOTATIONNOTE as comment,
  ZFUTUREPROOFING5 as chapter,
  ZANNOTATIONSTYLE as colorCode,
  ZANNOTATIONMODIFICATIONDATE as modifiedAt,
  ZANNOTATIONCREATIONDATE as createdAt
from ZAEANNOTATION
where ZANNOTATIONDELETED = 0 
  and ZANNOTATIONSELECTEDTEXT is not null 
  and ZANNOTATIONSELECTEDTEXT <> ''
order by ZANNOTATIONASSETID, ZPLLOCATIONRANGESTART;
`;
```

And another one for `Book`

```tsx
const SELECT_ALL_BOOKS_QUERY = `select 
  ZASSETID as id, 
  ZTITLE as title, 
  ZAUTHOR as author 
from ZBKLIBRARYASSET`;
```

store them in corresponding variables.

Now time to install something that will actually run this queries:

```sql
npm i sqlite sqlite3
```

Now we can create few helper functions that will handle connection to DB

```tsx
import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function createDB(filename: string) {
  return await open({
    filename: filename,
    driver: sqlite3.Database,
  });
}

async function getBooksFromDBFile(filename: string): Promise<Book[]> {
  const db = await createDB(filename);
  return await db.all<Book[]>(SELECT_ALL_BOOKS_QUERY);
}

async function getBooks() {
  const books = await Promise.all(booksFiles.map(getBooksFromDBFile));
  return books.flat();
}

async function getAnnotationsFromDBFile(filename: string) {
  const db = await createDB(filename);
  return await db.all<Annotation[]>(SELECT_ALL_ANNOTATIONS_QUERY);
}

async function getAnnotations() {
  const annotations = await Promise.all(
    annotationsFiles.map(getAnnotationsFromDBFile)
  );
  return annotations.flat();
}
```

And before we can combine everything in one function we need to create another helper for timestamps. Apple uses weird starting point for date, from 2001-01-01, in order to get more conventional unix epoch timestamp we need to convert them:

```tsx
const APPLE_EPOCH_START = new Date("2001-01-01").getTime();

function convertAppleTime(appleTime: number): number {
  return new Date(APPLE_EPOCH_START + appleTime * 1000).getTime();
}
```

Alright, now we’re ready to put everything together. We’ll start with fetching Books, then we’ll get Annotations, iterate over them to enrich with Book info and at the end will write JSON with results to `output.json` file.

```tsx
(async function main() {
  const books = await getBooks();
  const annotations = await getAnnotations();
  const booksByAssetId: Record<Book["id"], Book> = {};
  const output = annotations.map(
    ({ assetId, modifiedAt, createdAt, ...annotation }) => {
      if (booksByAssetId[assetId] === undefined) {
        booksByAssetId[assetId] = books.find((b) => b.id === assetId);
      }
      const book = booksByAssetId[assetId];
      return {
        ...annotation,
        modifiedAt: convertAppleTime(modifiedAt),
        createdAt: convertAppleTime(createdAt),
        author: book.author ?? "Unknown Author",
        title: book.title ?? "Unknown Title",
      };
    }
  );
  fs.writeFileSync("output.json", JSON.stringify(output));
  console.log("Exported", output.length, "items");
})();
```

That’s it.

You can find full script at [Github Gist](https://gist.github.com/asci/82ffbe53cf6b1933bb570b67006c88b4)

Thanks for reading
