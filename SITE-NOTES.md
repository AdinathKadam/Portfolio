# adinathkadam.github.io/Portfolio

Two pages, one shared stylesheet, one shared data file.

```
index.html        the portfolio — thesis, two case studies, method, research,
                  recognition, media, background, contact
record.html       the evidence ledger — every entry with its source and
                  a note on who decided it
files/site.css    all styling for both pages
files/data.js     all record and press content (edit here, both pages update)
files/app.js      behaviour for both pages
files/interactive.js  the quiz and the reconciliation drill (home page only)
files/*.webp      optimized images, lazy-loaded except the hero portrait
```

## Installing

**Merge this into your repo — do not replace the whole `files/` folder.**
Your existing `files/Adinath_Kadam_Resume.pdf` must stay where it is; both
pages link to it and the link breaks if the folder is overwritten.

1. Copy `index.html` and `record.html` to the repo root (replacing the old
   `index.html`).
2. Copy the contents of this `files/` folder into your existing `files/`.
3. Confirm `files/Adinath_Kadam_Resume.pdf` is still there.
4. Commit and push.

## Editing

| To change | Edit |
|---|---|
| Hero, case studies, the five layers, bio, contact | `index.html` |
| A record or press entry | `files/data.js` |
| What appears on the home page's short lists | `home: true` on an entry in `files/data.js` |
| Quiz questions | the `QUIZ` array at the top of `files/interactive.js` |
| Drill difficulty | the `ROUNDS` array in the same file (rows, mismatches, seconds) |
| Colours, type, spacing | the token block at the top of `files/site.css` |

Type discipline, if you edit the CSS: **Archivo** is display only (uppercase,
heavy). **IBM Plex Sans** carries everything read as language, labels included.
**IBM Plex Mono** is numerals and codes only — years, figure numbers, stage
numbers. Mono used for words is what makes a page look generated.

Colour is semantic, not decorative. Amber marks something an external body
decided; grey marks something authored, built or placed by Adinath. Do not
spend amber on hover states or ordinary emphasis, or the code stops meaning
anything.

## Before publishing — verify these

The site's main asset is that every claim can be checked. One inflated
sentence undoes it.

- **ISAFM (Wiley)** is written as **under review**, and marked as your own
  work rather than an external decision. When a formal acceptance is issued,
  change it in three places: the entry in `files/data.js` (kind, dek, body,
  ev, note — and flip `own:` to `false`), the Case 02 sidebar, and the Case 02
  research paragraph. Then it can go back into the hero credential list.
- **IBAC proceedings** — currently written as *forthcoming*. Change to
  published once the proceedings are actually issued.
- **"In production use"** (Case 01) — the case study names no employer or
  client and describes only sanitized architecture. Keep it that way.
- **Case 02** — says "a hosted inference layer". Name the actual service if
  you want it stated.
- **Links** — confirm `ssrn.com/abstract=6091647` and
  `zenodo.org/records/20263655` both resolve. Dead links on the two entries
  labelled *open* and *citable* would be worse than not listing them.
- **Google Drive evidence folders** — check the sharing setting. Three
  entries link to Drive; private-by-default folders read as no evidence.

## Performance

`index.html` is ~24 KB. Total page weight on first load is about 61 KB plus
the hero portrait (36 KB); the other five images are lazy-loaded and only
fetched if a reader opens the entry that uses them. CSS and JS are cached
across both pages.

Fonts come from Google Fonts. If you'd rather not depend on that, download
Archivo, IBM Plex Sans and IBM Plex Mono into `files/fonts/`, and replace the
`<link>` in both pages with local `@font-face` rules.
