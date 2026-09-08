# The Olympic Record

A participation study built from the 70,000 athlete event rows in this repository. Filter by season, sport, and committee to inspect the timeline, distinct athlete count, committee distribution, and recorded medals.

[Open the website](https://ashishoutlier.github.io/EDA_Olympics_Dataset/).

The page uses Barlow Condensed headings, Public Sans body text, cobalt blue, and a restrained red accent. The charts keep their underlying counts in a readable table. The layout adapts to phones and wider screens.

## Data and interpretation

`scripts/prepare-data.py` converts the original CSV into `lib/records.json`. It preserves all 70,000 rows and selects the fields used by the interface. Athlete IDs can appear more than once. Medal counts refer to athlete event rows, including separate records for members of a winning team. This subset cannot establish official medal totals or total participation at each Games.

## Run locally

Use Node 22.13 or newer, then run these commands from `website`:

```sh
npm ci
npm run dev
```

To regenerate the data from the repository CSV:

```sh
python3 scripts/prepare-data.py
```

## Validate and publish

```sh
npm test
npx tsc --noEmit
NEXT_PUBLIC_BASE_PATH=/EDA_Olympics_Dataset npm run build
node scripts/prepare-pages.mjs EDA_Olympics_Dataset
```

The deployable files are in `dist/pages`. GitHub Pages serves them from the `gh-pages` branch. The preparation script places assets below the repository URL and includes `.nojekyll` so the scripts directory is served correctly.

Tests cover intersecting filters, distinct athletes, medal record counts, chronological grouping, empty results, and exported asset locations. Static rendering and referenced assets were checked. Visual browser review was unavailable in the working environment.

Fonts are included locally with their OFL notices in `public/fonts`. The application uses React, TypeScript, Vinext, and the retained Sites component library. GitHub Pages provides the public deployment because the Sites hosting service returned a deployment error during this work.

Lint checks the authored application and scripts. The page keeps full document navigation for its relative homepage link. SVG charts retain their accessible image roles. The corresponding framework style rules are disabled only for the page where they conflict with these choices.
