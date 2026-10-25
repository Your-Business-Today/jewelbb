# Refactor audit

Generated 2026-10-25 10:13 UTC.

## Headline

**Code quality score 69.4%.** **42 of 156 source files are over the 100-line limit (26.9%)**; the worst file is 1,048 lines.

## Code quality score

| Element | Reading | Score | Weight | 0% at |
| --- | --- | --- | --- | --- |
| **Standard baseline checks** | | **57.6%** | **52** | |
| Files over the line limit | 42 in 156 files | 46.2% | 10 | 50% of files |
| Worst file, in limits over | 9.48 | 0.0% | 5 | 9 |
| Functions over the line limit | 11 in 239 functions | 81.6% | 8 | 25% of functions |
| Else blocks | 10 in 414 branches | 95.2% | 5 | 50% of branches |
| Duplication % | not measured | not measured | — | 20 |
| Explanatory comment lines | 148 in 17.13 thousand lines | 82.7% | 4 | 50 per thousand lines |
| Inline magic values | 247 in 17.13 thousand lines | 27.9% | 4 | 20 per thousand lines |
| Orphan components and functions | 11 in 272 components and functions | 59.6% | 4 | 10% of components and functions |
| Long member chain lines | 100 in 17.13 thousand lines | 80.5% | 4 | 30 per thousand lines |
| Deeply indented lines | 724 in 17.13 thousand lines | 0.0% | 4 | 30 per thousand lines |
| Overlong function names | 0 in 239 functions | 100.0% | 4 | 10% of functions |
| **Design pattern file count** | | **100.0%** | **10** | |
| Files the patterns predict but are missing | 0 in 66 predicted files | 100.0% | 10 | 50% of predicted files |
| Entities outside their expected file count | not measured | not measured | — | 50% of entities |
| **Prose** | | **84.9%** | **20** | |
| Conditions with calls tangled inside calls | 9 in 414 branches | 91.3% | 8 | 25% of branches |
| Conditions compared to a raw literal | 40 in 414 branches | 61.4% | 6 | 25% of branches |
| Accessor names that want to be a property | 0 in 239 functions | 100.0% | 6 | 10% of functions |
| **Widget adoption** | | **not measured** | **0** | |
| Markup written by hand where a widget should be | not measured | not measured | — | 50% of widget slots |
| **Input validation** | | **not measured** | **0** | |
| Doors that write without checking their input against the columns | not measured | not measured | — | 50% of write doors |

Each element scores 100% with no offenders and falls in a straight line to 0% when its offenders, measured against the size of the codebase, reach the figure in the last column. The score is the weighted average of the elements that could be measured; an element that could not be measured lends its weight to the rest. Weights and zero points are set in `tools/refactor/rules.json` under `score.elements`. The offenders behind every reading are in `tools/refactor/audit-output/audit.json`.

## The repository by area

| Area | Files | Of which audited source | Source lines |
| --- | --- | --- | --- |
| tooling | 232 | 0 | 0 |
| frontend | 185 | 70 | 11,915 |
| backend | 46 | 46 | 2,977 |
| shared | 32 | 31 | 1,897 |
| tests | 28 | 0 | 0 |
| docs | 26 | 0 | 0 |
| infrastructure | 11 | 0 | 0 |
| database | 9 | 0 | 0 |
| api | 9 | 9 | 344 |
| other | 2 | 0 | 0 |
| **whole repository** | **580** | **156** | **17,133** |

## Summary

| Check | Key figures |
| --- | --- |
| fileLength | limit: 100, filesOverLimit: 42, totalFiles: 156, totalLines: 17133, worstFileLines: 1048, worstFileTimesOverLimit: 9.48 |
| functionShape | limit: 30, functionsOverLimit: 11, totalFunctions: 239, elseBlocks: 10, ifBlocks: 414, measurementIsHeuristic: True |
| functionNames | overlongFunctionNames: 0, maxWords: 5, maxLength: 40 |
| accessorNames | gluedAccessorNames: 0, measurementIsHeuristic: True |
| duplication | skipped: jscpd is not installed (npm install -g jscpd) |
| naming | bannedAbbreviationHits: 167, unprefixedBooleans: 40 |
| comments | explanatoryCommentLines: 148, filesWithComments: 44, taskMarkers: 0 |
| magicValues | inlineHexColours: 244, inlineStyleAttributes: 3, repeatedStringLiterals: 0 |
| prose | longMemberChainLines: 100, deeplyIndentedLines: 724, overlongLines: 99, measurementIsHeuristic: True |
| conditions | tangledConditionLines: 9, literalComparisonLines: 40, measurementIsHeuristic: True |
| orphans | orphanFunctions: 0, functionsExamined: 239 |
| designPatterns | roleFamilies: 6, predictedFiles: 66, predictedFilesMissing: 0, entities: 0, entitiesOutOfRange: 0, measurementIsHeuristic: True |
| inventory | pages: 34, components: 33, orphanComponents: 11, averagePageLines: 256 |
| siteDefinition | skipped: no siteDefinition catalogue in rules.json |
| inputValidation | schemaTables: 11, limitedColumns: 0, writeDoors: 0, unvalidatedDoors: 0, looserLimits: 0 |
| fileAreas | totalFiles: 580, tooling: 232, frontend: 185, backend: 46, shared: 32, tests: 28, docs: 26, infrastructure: 11, database: 9, api: 9, other: 2 |

## Against the baseline

| Ratcheted figure | Baseline | Now | Verdict |
| --- | --- | --- | --- |
| code quality score | 71.6% | 69.4% | — |
| fileLength.filesOverLimit | 42 | 42 | held |
| fileLength.worstFileLines | 1048 | 1048 | held |
| functionShape.functionsOverLimit | 11 | 11 | held |
| functionShape.elseBlocks | 10 | 10 | held |
| duplication.duplicatedPercentage | 1.27 | None | — |
| comments.explanatoryCommentLines | 148 | 148 | held |
| magicValues.inlineHexColours | 244 | 244 | held |
| inventory.orphanComponents | 11 | 11 | held |
| orphans.orphanFunctions | 0 | 0 | held |
| prose.longMemberChainLines | 100 | 100 | held |
| prose.deeplyIndentedLines | 724 | 724 | held |
| functionNames.overlongFunctionNames | 0 | 0 | held |
| accessorNames.gluedAccessorNames | 0 | 0 | held |
| conditions.tangledConditionLines | 9 | 9 | held |
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
