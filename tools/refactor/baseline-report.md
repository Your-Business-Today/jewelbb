# Refactor audit

Generated 2026-10-22 10:34 UTC.

## Headline

**Code quality score 68.6%.** **42 of 126 source files are over the 100-line limit (33.3%)**; the worst file is 1,048 lines.

## Code quality score

| Element | Reading | Score | Weight | 0% at |
| --- | --- | --- | --- | --- |
| **Standard baseline checks** | | **58.4%** | **60** | |
| Files over the line limit | 42 in 126 files | 33.3% | 10 | 50% of files |
| Worst file, in limits over | 9.48 | 0.0% | 5 | 9 |
| Functions over the line limit | 11 in 192 functions | 77.1% | 8 | 25% of functions |
| Else blocks | 10 in 382 branches | 94.8% | 5 | 50% of branches |
| Duplication % | 1.24 | 93.8% | 8 | 20 |
| Explanatory comment lines | 148 in 15.9 thousand lines | 81.4% | 4 | 50 per thousand lines |
| Inline magic values | 247 in 15.9 thousand lines | 22.4% | 4 | 20 per thousand lines |
| Orphan components and functions | 11 in 217 components and functions | 49.3% | 4 | 10% of components and functions |
| Long member chain lines | 100 in 15.9 thousand lines | 79.0% | 4 | 30 per thousand lines |
| Deeply indented lines | 724 in 15.9 thousand lines | 0.0% | 4 | 30 per thousand lines |
| Overlong function names | 0 in 192 functions | 100.0% | 4 | 10% of functions |
| **Design pattern file count** | | **100.0%** | **10** | |
| Files the patterns predict but are missing | 0 in 28 predicted files | 100.0% | 10 | 50% of predicted files |
| Entities outside their expected file count | not measured | not measured | — | 50% of entities |
| **Prose** | | **83.7%** | **20** | |
| Conditions with calls tangled inside calls | 9 in 382 branches | 90.6% | 8 | 25% of branches |
| Conditions compared to a raw literal | 40 in 382 branches | 58.1% | 6 | 25% of branches |
| Accessor names that want to be a property | 0 in 192 functions | 100.0% | 6 | 10% of functions |
| **Widget adoption** | | **not measured** | **0** | |
| Markup written by hand where a widget should be | not measured | not measured | — | 50% of widget slots |
| **Input validation** | | **not measured** | **0** | |
| Doors that write without checking their input against the columns | not measured | not measured | — | 50% of write doors |

Each element scores 100% with no offenders and falls in a straight line to 0% when its offenders, measured against the size of the codebase, reach the figure in the last column. The score is the weighted average of the elements that could be measured; an element that could not be measured lends its weight to the rest. Weights and zero points are set in `tools/refactor/rules.json` under `score.elements`. The offenders behind every reading are in `tools/refactor/audit-output/audit.json`.

## The repository by area

| Area | Files | Of which audited source | Source lines |
| --- | --- | --- | --- |
| tooling | 192 | 0 | 0 |
| frontend | 174 | 59 | 11,361 |
| backend | 38 | 38 | 2,657 |
| docs | 26 | 0 | 0 |
| tests | 22 | 0 | 0 |
| shared | 22 | 21 | 1,580 |
| infrastructure | 11 | 0 | 0 |
| database | 8 | 0 | 0 |
| api | 8 | 8 | 307 |
| other | 2 | 0 | 0 |
| **whole repository** | **503** | **126** | **15,905** |

## Summary

| Check | Key figures |
| --- | --- |
| fileLength | limit: 100, filesOverLimit: 42, totalFiles: 126, totalLines: 15905, worstFileLines: 1048, worstFileTimesOverLimit: 9.48 |
| functionShape | limit: 30, functionsOverLimit: 11, totalFunctions: 192, elseBlocks: 10, ifBlocks: 382, measurementIsHeuristic: True |
| functionNames | overlongFunctionNames: 0, maxWords: 5, maxLength: 40 |
| accessorNames | gluedAccessorNames: 0, measurementIsHeuristic: True |
| duplication | clones: 21, duplicatedLines: 314, totalLines: 25404, duplicatedPercentage: 1.24 |
| naming | bannedAbbreviationHits: 160, unprefixedBooleans: 37 |
| comments | explanatoryCommentLines: 148, filesWithComments: 44, taskMarkers: 0 |
| magicValues | inlineHexColours: 244, inlineStyleAttributes: 3, repeatedStringLiterals: 0 |
| prose | longMemberChainLines: 100, deeplyIndentedLines: 724, overlongLines: 99, measurementIsHeuristic: True |
| conditions | tangledConditionLines: 9, literalComparisonLines: 40, measurementIsHeuristic: True |
| orphans | orphanFunctions: 0, functionsExamined: 192 |
| designPatterns | roleFamilies: 4, predictedFiles: 28, predictedFilesMissing: 0, entities: 0, entitiesOutOfRange: 0, measurementIsHeuristic: True |
| inventory | pages: 31, components: 25, orphanComponents: 11, averagePageLines: 275 |
| siteDefinition | skipped: no siteDefinition catalogue in rules.json |
| inputValidation | schemaTables: 9, limitedColumns: 0, writeDoors: 0, unvalidatedDoors: 0, looserLimits: 0 |
| fileAreas | totalFiles: 503, tooling: 192, frontend: 174, backend: 38, docs: 26, tests: 22, shared: 22, infrastructure: 11, database: 8, api: 8, other: 2 |

## Against the baseline

| Ratcheted figure | Baseline | Now | Verdict |
| --- | --- | --- | --- |
| code quality score | 63.8% | 68.6% | — |
| fileLength.filesOverLimit | 43 | 42 | better |
| fileLength.worstFileLines | 1048 | 1048 | held |
| functionShape.functionsOverLimit | 11 | 11 | held |
| functionShape.elseBlocks | 10 | 10 | held |
| duplication.duplicatedPercentage | None | 1.24 | — |
| comments.explanatoryCommentLines | 148 | 148 | held |
| magicValues.inlineHexColours | 244 | 244 | held |
| inventory.orphanComponents | 11 | 11 | held |
| orphans.orphanFunctions | 0 | 0 | held |
| prose.longMemberChainLines | 101 | 100 | better |
| prose.deeplyIndentedLines | 727 | 724 | better |
| functionNames.overlongFunctionNames | 0 | 0 | held |
| accessorNames.gluedAccessorNames | 0 | 0 | held |
| conditions.tangledConditionLines | 10 | 9 | better |
| conditions.literalComparisonLines | 40 | 40 | held |
| designPatterns.predictedFilesMissing | 0 | 0 | held |
| siteDefinition.handRolledElements | None | None | — |
| siteDefinition.boxedContentWidgets | None | None | — |
| inputValidation.unvalidatedDoors | 0 | 0 | held |
| inputValidation.looserLimits | 0 | 0 | held |

## Worst files by length

| File | Lines |
| --- | --- |
| src/routes/demo/+page.svelte | 1048 |
| src/routes/rtw/+page.svelte | 1011 |
| src/routes/admin/brochure/[id]/page/[pageId]/+page.svelte | 671 |
| src/routes/admin/enquiries/+page.svelte | 480 |
| src/routes/subcontractor-terms/+page.svelte | 463 |
| src/routes/admin/+page.svelte | 447 |
| src/routes/admin/projects/[id]/+page.svelte | 383 |
| src/routes/admin/brochure/[id]/+page.svelte | 378 |
| src/lib/content/pages.ts | 334 |
| src/lib/brochure/defaults.ts | 321 |
| src/routes/admin/brochure/+page.svelte | 310 |
| src/lib/brochure/templates.ts | 303 |
| src/lib/server/db.ts | 301 |
| src/lib/server/brochures.ts | 300 |
| src/routes/admin/content/[page]/+page.svelte | 300 |
| src/routes/admin/badges/+page.svelte | 298 |
| src/routes/admin/slideshow/+page.svelte | 288 |
| src/lib/data/projects.ts | 269 |
| src/routes/admin/rtw/+page.svelte | 249 |
| src/routes/+page.svelte | 247 |

Full detail, including every offender list, is in `audit.json`.
