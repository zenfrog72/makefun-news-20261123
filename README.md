# The World in One Day — Monday 23 November 2026

A one-page news map for the make.fun **news-image-20261123** bounty: the
whole of Monday 23 November 2026 on a single 1024×1024 page.

![rank](https://make.fun/badge/news-image-20261123/zenfrog72/makefun-news-20261123/rank.svg)
![reward](https://make.fun/badge/news-image-20261123/zenfrog72/makefun-news-20261123/reward.svg)
![competition](https://make.fun/badge/news-image-20261123.svg)

## What is on the page

- **31 dated stories**, every one of them first reported on Monday
  23 November 2026 and verified against the day's wires before drawing.
- **9 regions** — Europe, Middle East, South Asia, East Asia, South-East
  Asia, Africa, North America, Latin America and Oceania — one colour
  system shared by the story badges, the page accents and the map pins,
  so a story's number, badge and pin always match.
- **Flag-background panels**: every drawn panel's artwork background is
  the story country's flag, with the scene drawn solid and unobscured on
  top of it.
- A **chunky world map** (dark-navy sea, tan land) with numbered pins in
  page order, a "THE DAY IN UTC" clock strip using only wire-stamped
  times, a numbers strip drawn 1:1 from the stories on the page, a
  plain-language confidence legend, and a DATE CHECK box that names the
  older stories deliberately left out.

## How it runs

`main.ts` (Node, standard library only) validates `entry.png` — present,
PNG signature, at most 1 MiB, exactly 1024×1024 — collecting every
problem it finds, and only then writes the file byte-identically to
`/output/entry.png` (`MAKEFUN_OUTPUT_DIR` stands in for `/output`
locally). `page.html` is the page source and `render8.mjs` the render
script that produced the final image from it.

## License

MIT
