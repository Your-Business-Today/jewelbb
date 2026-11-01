# Refactor audit — baseline v2, after round 1

Generated 2026-11-01 from `refactor/round-1`, replacing the v1 baseline.

Designs: no design index (`docs/design/widgets.json`) exists and no catalogue is set in `rules.json`, so the brand and widget checks are *not set up*. They are run by `widget-design` (*"Check the site against the brand"*, *"Check the widgets against their designs"*); a round reports them and does not run them.

## Headline

**Code quality score 71.6% → 81.2%.** **37 of 226 source files are over the 100-line limit (16.4%)**, down from 42 of 156; the worst file is 447 lines, down from 1,048.

## Code quality score


| Element | Reading | Score | Weight | 0% at |
| --- | --- | --- | --- | --- |
| **Standard baseline checks** | | **75.6%** | **60** | |
| Files over the line limit | 37 in 226 files | 67.3% | 10 | 50% of files |
| Worst file, in limits over | 3.47 | 61.4% | 5 | 9 |
| Functions over the line limit | 11 in 265 functions | 83.4% | 8 | 25% of functions |
| Else blocks | 6 in 417 branches | 97.1% | 5 | 50% of branches |
| Duplication % | 1.36 | 93.2% | 8 | 20 |
| Explanatory comment lines | 115 in 16.81 thousand lines | 86.3% | 4 | 50 per thousand lines |
| Inline magic values | 225 in 16.81 thousand lines | 33.1% | 4 | 20 per thousand lines |
| Orphan components and functions | 11 in 344 components and functions | 68.0% | 4 | 10% of components and functions |
| Long member chain lines | 94 in 16.81 thousand lines | 81.4% | 4 | 30 per thousand lines |
| Deeply indented lines | 273 in 16.81 thousand lines | 45.9% | 4 | 30 per thousand lines |
| Overlong function names | 0 in 265 functions | 100.0% | 4 | 10% of functions |
| **Design pattern file count** | | **100.0%** | **10** | |
| Files the patterns predict but are missing | 0 in 66 predicted files | 100.0% | 10 | 50% of predicted files |
| Entities outside their expected file count | not measured | not measured | — | 50% of entities |
| **Prose** | | **88.8%** | **20** | |
| Conditions with calls tangled inside calls | 3 in 417 branches | 97.1% | 8 | 25% of branches |
| Conditions compared to a raw literal | 35 in 417 branches | 66.4% | 6 | 25% of branches |
| Accessor names that want to be a property | 0 in 265 functions | 100.0% | 6 | 10% of functions |
| **Widget adoption** | | **not measured** | **0** | |
| Markup written by hand where a widget should be | not measured | not measured | — | 50% of widget slots |
| **Input validation** | | **not measured** | **0** | |
| Doors that write without checking their input against the columns | not measured | not measured | — | 50% of write doors |


## Summary


| Check | Key figures |
| --- | --- |
| fileLength | limit: 100, filesOverLimit: 37, totalFiles: 226, totalLines: 16814, worstFileLines: 447, worstFileTimesOverLimit: 3.47 |
| functionShape | limit: 30, functionsOverLimit: 11, totalFunctions: 265, elseBlocks: 6, ifBlocks: 417, measurementIsHeuristic: True |
| functionNames | overlongFunctionNames: 0, maxWords: 5, maxLength: 40 |
| accessorNames | gluedAccessorNames: 0, measurementIsHeuristic: True |
| duplication | clones: 21, duplicatedLines: 336, totalLines: 24785, duplicatedPercentage: 1.36 |
| naming | bannedAbbreviationHits: 162, unprefixedBooleans: 38 |
| comments | explanatoryCommentLines: 115, filesWithComments: 47, taskMarkers: 0 |
| magicValues | inlineHexColours: 222, inlineStyleAttributes: 3, repeatedStringLiterals: 0 |
| prose | longMemberChainLines: 94, deeplyIndentedLines: 273, overlongLines: 99, measurementIsHeuristic: True |
| conditions | tangledConditionLines: 3, literalComparisonLines: 35, measurementIsHeuristic: True |
| orphans | orphanFunctions: 0, functionsExamined: 265 |
| designPatterns | roleFamilies: 7, predictedFiles: 66, predictedFilesMissing: 0, entities: 0, entitiesOutOfRange: 0, measurementIsHeuristic: True |
| inventory | pages: 34, components: 79, orphanComponents: 11, averagePageLines: 158 |
| siteDefinition | skipped: no siteDefinition catalogue in rules.json |
| inputValidation | schemaTables: 11, limitedColumns: 0, writeDoors: 0, unvalidatedDoors: 0, looserLimits: 0 |
| fileAreas | totalFiles: 659, frontend: 244, tooling: 233, shared: 50, backend: 46, tests: 28, docs: 26, infrastructure: 12, database: 9, api: 9, other: 2 |


## Round 1 — the five longest views

The round took the plan's first five steps, all Pass 2 component breakouts, worst file first. Every step was checked against the untouched staging branch running side by side: the public pages by pixel-comparing screenshots at desktop and phone widths, the Right to Work tool by driving three complete checks through both and comparing the register row, the saved log entry and the printed record, and the two admin pages against a mock database by comparing screenshots, computed styles and every form post. The type-check and the production build pass.

- **`src/routes/demo/+page.svelte` 1048 → 89**: the copy panel (brand, slides, slide actions, counter), the house scene (defs, backdrop, groundworks, frame, envelope, glazing, finishes, landscape as SVG components), the stage rail, the scroll hint and the about section become components under `lib/components/demo`. The 165-line `onMount` becomes named modules: `houseParts` finds the SVG parts, `renderShell` and `renderFinishing` render each build stage, `renderBuild` runs them in order, `scrollDriver` turns scrolling into progress, and `buildProgress` holds the easing and stage arithmetic. Each component took its own styles and its own mobile rules with it.
- **`src/routes/rtw/+page.svelte` 1011 → 37**: each of the six steps, the rail, the print heading and the completed record become components under `lib/components/rtw`, composed by `RtwCheckTool`. The tool's imperative logic moves verbatim in meaning into `lib/rtw` (terms, state, page helpers, radio groups, step wiring, progress, validation, the record, the register row, the result, the register log, copying), each a named module; Jeremy's sign-off note travels with the terms. The tool's styles, all `:global` under `.rtwp` because the tool re-classes elements at runtime, move into six plain stylesheets by concern; the page keeps the hero chip and the print rule that hides the site chrome.
- **`src/routes/admin/brochure/[id]/page/[pageId]/+page.svelte` 671 → 73**: the content edits (`arrayOf`, `listOf`, `removeAt`, the group add/move/remove, `linesOf`, `setLines`, `isFilled`, assigning a picked photo) move onto a `PageContentEditor` class with the content as its state. The crumbs, heading, fields form, each field kind (image, images, group list, group item, group sub-field), the delete form and the live preview become components under `lib/components/admin/brochure`. The group sub-field's styles state the cascade the old nested `.field` rules produced, so the inputs render exactly as before.
- **`src/routes/admin/enquiries/+page.svelte` 480 → 99**: the tabs, the empty state, each enquiry (summary, sender, detail, actions) and the pager become components under `lib/components/admin/enquiries`; `when` and `initials` move to `lib/enquiries/enquiryDisplay` as `whenReceived` and `initials`. The expanded state stays on the page, keyed by enquiry, as before.
- **`src/routes/subcontractor-terms/+page.svelte` 463 → 34**: the terms text moves to `lib/legal/subcontractor-terms.html`, beside the privacy notice, and the page renders it; the heading and the client note stay in the page.
- **Held**: functions over the limit (11), orphan components and functions (11 and 0), overlong and accessor names (0), files the patterns predict but are missing (0). Else blocks 10 → 6, tangled conditions 9 → 3, literal comparisons 40 → 35, member chains 100 → 94 and comment lines 148 → 115 all fell, because the moved code was named rather than copied with its tangles.
- **Division signature**: audited source files rose from 156 to 226 as five long views became 70 short files. Duplication reads 1.27% → 1.36% only because the measured total fell (26,957 → 24,785 lines): clones fell 22 → 21 and duplicated lines 342 → 336. Two readings fell partly by moving rather than fixing, and are marked †: inline hex colours 244 → 222, mostly the RTW tool's colours now in `.css` stylesheets; and deeply indented lines 724 → 273, partly the terms' nested lists now in an `.html` file and the house's SVG now in shallower components.

## The journey so far

| Figure | v1 | v2 |
| --- | --- | --- |
| Code quality score | 71.6% | **81.2%** |
| Worst file | 1,048 | **447** |
| Average page length | 256 | **158** |
| Duplication % | 1.27 | 1.36 † |
| Else blocks | 10 | **6** |
| Functions over the limit | 11 | **11** |
| Files over the limit | 42 of 156 | **37** of 226 |

v1 is the reading this round started from (the gate was green against the committed baseline).

## Worst files by length

| File | Lines |
| --- | --- |
| `src/routes/admin/+page.svelte` | 447 |
| `src/routes/admin/projects/[id]/+page.svelte` | 383 |
| `src/routes/admin/brochure/[id]/+page.svelte` | 378 |
| `src/lib/content/pages.ts` | 334 |
| `src/lib/brochure/defaults.ts` | 321 |
| `src/routes/admin/brochure/+page.svelte` | 310 |
| `src/lib/brochure/templates.ts` | 303 |
| `src/lib/server/db.ts` | 301 |
| `src/lib/server/brochures.ts` | 300 |
| `src/routes/admin/content/[page]/+page.svelte` | 300 |
| `src/routes/admin/badges/+page.svelte` | 298 |
| `src/routes/admin/slideshow/+page.svelte` | 288 |
| `src/lib/data/projects.ts` | 269 |
| `src/routes/admin/rtw/+page.svelte` | 249 |
| `src/routes/+page.svelte` | 247 |

## Next round, named

1. Break `src/routes/admin/+page.svelte` (447 lines) into components.
2. Break `src/routes/admin/projects/[id]/+page.svelte` (383 lines) into components.
3. Break `src/routes/admin/brochure/[id]/+page.svelte` (378 lines) into components.
4. Break `src/routes/admin/brochure/+page.svelte` (310 lines) into components.
5. Break `src/routes/admin/content/[page]/+page.svelte` (300 lines) into components.

The worst file is now the admin dashboard at 447 lines; every file above 300 lines is an admin view or a data module, so the next round stays in Pass 2 on the admin area.
