# Refactor audit

Generated 2026-11-05 22:07 UTC.

## Headline

**Code quality score 81.3%.** **37 of 227 source files are over the 100-line limit (16.3%)**; the worst file is 447 lines.

## Code quality score

| Element | Reading | Score | Weight | 0% at |
| --- | --- | --- | --- | --- |
| **Standard baseline checks** | | **75.7%** | **60** | |
| Files over the line limit | 37 in 227 files | 67.4% | 10 | 50% of files |
| Worst file, in limits over | 3.47 | 61.4% | 5 | 9 |
| Functions over the line limit | 11 in 268 functions | 83.6% | 8 | 25% of functions |
| Else blocks | 6 in 418 branches | 97.1% | 5 | 50% of branches |
| Duplication % | 1.35 | 93.2% | 8 | 20 |
| Explanatory comment lines | 115 in 16.85 thousand lines | 86.4% | 4 | 50 per thousand lines |
| Inline magic values | 225 in 16.85 thousand lines | 33.2% | 4 | 20 per thousand lines |
| Orphan components and functions | 11 in 347 components and functions | 68.3% | 4 | 10% of components and functions |
| Long member chain lines | 94 in 16.85 thousand lines | 81.4% | 4 | 30 per thousand lines |
| Deeply indented lines | 273 in 16.85 thousand lines | 46.0% | 4 | 30 per thousand lines |
| Overlong function names | 0 in 268 functions | 100.0% | 4 | 10% of functions |
| **Design pattern file count** | | **100.0%** | **10** | |
| Files the patterns predict but are missing | 0 in 66 predicted files | 100.0% | 10 | 50% of predicted files |
| Entities outside their expected file count | not measured | not measured | — | 50% of entities |
| **Prose** | | **88.8%** | **20** | |
| Conditions with calls tangled inside calls | 3 in 418 branches | 97.1% | 8 | 25% of branches |
| Conditions compared to a raw literal | 35 in 418 branches | 66.5% | 6 | 25% of branches |
| Accessor names that want to be a property | 0 in 268 functions | 100.0% | 6 | 10% of functions |
| **Widget adoption** | | **not measured** | **0** | |
| Markup written by hand where a widget should be | not measured | not measured | — | 50% of widget slots |
| **Input validation** | | **not measured** | **0** | |
| Doors that write without checking their input against the columns | not measured | not measured | — | 50% of write doors |

Each element scores 100% with no offenders and falls in a straight line to 0% when its offenders, measured against the size of the codebase, reach the figure in the last column. The score is the weighted average of the elements that could be measured; an element that could not be measured lends its weight to the rest. Weights and zero points are set in `tools/refactor/rules.json` under `score.elements`. The offenders behind every reading are in `tools/refactor/audit-output/audit.json`.

## The repository by area

| Area | Files | Of which audited source | Source lines |
| --- | --- | --- | --- |
| frontend | 244 | 123 | 11,011 |
| tooling | 104 | 0 | 0 |
| shared | 51 | 49 | 2,518 |
| backend | 46 | 46 | 2,977 |
| docs | 27 | 0 | 0 |
| tests | 15 | 0 | 0 |
| infrastructure | 12 | 0 | 0 |
| database | 11 | 0 | 0 |
| api | 9 | 9 | 344 |
| other | 2 | 0 | 0 |
| **whole repository** | **521** | **227** | **16,850** |

## Summary

| Check | Key figures |
| --- | --- |
| fileLength | limit: 100, filesOverLimit: 37, totalFiles: 227, totalLines: 16850, worstFileLines: 447, worstFileTimesOverLimit: 3.47 |
| functionShape | limit: 30, functionsOverLimit: 11, totalFunctions: 268, elseBlocks: 6, ifBlocks: 418, measurementIsHeuristic: True |
| functionNames | overlongFunctionNames: 0, maxWords: 5, maxLength: 40 |
| accessorNames | gluedAccessorNames: 0, measurementIsHeuristic: True |
| duplication | clones: 21, duplicatedLines: 336, totalLines: 24833, duplicatedPercentage: 1.35 |
| naming | bannedAbbreviationHits: 162, unprefixedBooleans: 38 |
| comments | explanatoryCommentLines: 115, filesWithComments: 47, taskMarkers: 0 |
| magicValues | inlineHexColours: 222, inlineStyleAttributes: 3, repeatedStringLiterals: 0 |
| prose | longMemberChainLines: 94, deeplyIndentedLines: 273, overlongLines: 99, measurementIsHeuristic: True |
| conditions | tangledConditionLines: 3, literalComparisonLines: 35, measurementIsHeuristic: True |
| orphans | orphanFunctions: 0, functionsExamined: 268 |
| designPatterns | roleFamilies: 7, predictedFiles: 66, predictedFilesMissing: 0, entities: 0, entitiesOutOfRange: 0, entitiesAccepted: 0, measurementIsHeuristic: True |
| inventory | pages: 34, components: 79, orphanComponents: 11, averagePageLines: 158 |
| siteDefinition | skipped: no siteDefinition catalogue in rules.json |
| inputValidation | schemaTables: 11, limitedColumns: 0, writeDoors: 0, unvalidatedDoors: 0, looserLimits: 0 |
| fileAreas | totalFiles: 521, frontend: 244, tooling: 104, shared: 51, backend: 46, docs: 27, tests: 15, infrastructure: 12, database: 11, api: 9, other: 2 |

## Against the baseline

| Ratcheted figure | Baseline | Now | Verdict |
| --- | --- | --- | --- |
| code quality score | 81.2% | 81.3% | — |
| fileLength.filesOverLimit | 37 | 37 | held |
| fileLength.worstFileLines | 447 | 447 | held |
| functionShape.functionsOverLimit | 11 | 11 | held |
| functionShape.elseBlocks | 6 | 6 | held |
| duplication.duplicatedPercentage | 1.36 | 1.35 | better |
| comments.explanatoryCommentLines | 115 | 115 | held |
| magicValues.inlineHexColours | 222 | 222 | held |
| inventory.orphanComponents | 11 | 11 | held |
| orphans.orphanFunctions | 0 | 0 | held |
| prose.longMemberChainLines | 94 | 94 | held |
| prose.deeplyIndentedLines | 273 | 273 | held |
| functionNames.overlongFunctionNames | 0 | 0 | held |
| accessorNames.gluedAccessorNames | 0 | 0 | held |
| conditions.tangledConditionLines | 3 | 3 | held |
| conditions.literalComparisonLines | 35 | 35 | held |
| designPatterns.predictedFilesMissing | 0 | 0 | held |
| siteDefinition.handRolledElements | None | None | — |
| siteDefinition.boxedContentWidgets | None | None | — |
| inputValidation.unvalidatedDoors | 0 | 0 | held |
| inputValidation.looserLimits | 0 | 0 | held |

## Worst files by length

| File | Lines |
| --- | --- |
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
| src/lib/components/admin/ImagePicker.svelte | 243 |
| src/routes/admin/projects/+page.svelte | 232 |
| src/routes/admin/+layout.svelte | 216 |
| src/lib/components/ContactForm.svelte | 196 |
| src/routes/about/+page.svelte | 195 |

Full detail, including every offender list, is in `audit.json`.
