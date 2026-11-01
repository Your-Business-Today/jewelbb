# Refactoring plan

Written by the code quality check at a score of 81.2%. These are the steps a refactor of this repository follows, in this order; a round takes the next steps from the top. The plan is measured, so a finished step is gone the next time the check runs. The facts are measured; the judgement is the round's.

## The order

**Pass 2 — Component breakout**

1. Break `src/routes/admin/+page.svelte` (447 lines) into components. Component-sized blocks: lines 99–113 (15 lines); lines 115–142 (28 lines); lines 144–158 (15 lines, taking when); lines 162–179 (18 lines).
2. Break `src/routes/admin/projects/[id]/+page.svelte` (383 lines) into components. Component-sized blocks: lines 34–94 (61 lines); lines 96–146 (51 lines).
3. Break `src/routes/admin/brochure/[id]/+page.svelte` (378 lines) into components. Component-sized blocks: lines 22–56 (35 lines); lines 58–79 (22 lines); lines 81–130 (50 lines, taking pageTitle).
4. Break `src/routes/admin/brochure/+page.svelte` (310 lines) into components. Component-sized blocks: lines 20–32 (13 lines); lines 52–76 (25 lines); lines 78–134 (57 lines, taking fmtDate).
5. Break `src/routes/admin/content/[page]/+page.svelte` (300 lines) into components. Component-sized blocks: lines 45–63 (19 lines, taking changed, rows); lines 121–132 (12 lines).
6. Break `src/routes/admin/badges/+page.svelte` (298 lines) into components. Component-sized blocks: lines 37–94 (58 lines); lines 97–109 (13 lines).
7. Break `src/routes/admin/slideshow/+page.svelte` (288 lines) into components. Component-sized blocks: lines 64–121 (58 lines).
8. Break `src/routes/admin/rtw/+page.svelte` (249 lines) into components. Component-sized blocks: lines 40–114 (75 lines, taking ukDate, ukDateTime, outcomeClass).
9. Break `src/routes/+page.svelte` (247 lines) into components. Component-sized blocks: lines 45–58 (14 lines); lines 61–76 (16 lines); lines 79–98 (20 lines); lines 101–116 (16 lines).
10. Break `src/lib/components/admin/ImagePicker.svelte` (243 lines) into components. Component-sized blocks: lines 64–130 (67 lines, taking pick, uploadFiles).
11. Break `src/routes/admin/projects/+page.svelte` (232 lines) into components. Component-sized blocks: lines 24–79 (56 lines).
12. Break `src/routes/admin/+layout.svelte` (216 lines) into components. Component-sized blocks: lines 30–62 (33 lines, taking isActive).
13. Break `src/lib/components/ContactForm.svelte` (196 lines) into components. Component-sized blocks: lines 43–107 (65 lines, taking submit).
14. Break `src/routes/about/+page.svelte` (195 lines) into components. Component-sized blocks: lines 24–35 (12 lines); lines 37–57 (21 lines); lines 59–80 (22 lines).
15. Break `src/routes/admin/staff/[id]/+page.svelte` (195 lines) into components. Component-sized blocks: lines 21–55 (35 lines).
16. Break `src/lib/components/HeroSlideshow.svelte` (184 lines) into components. Component-sized blocks: lines 39–78 (40 lines, taking go).
17. Break `src/lib/components/Header.svelte` (169 lines) into components. Component-sized blocks: lines 14–49 (36 lines).
18. Break `src/lib/components/Footer.svelte` (165 lines) into components. Component-sized blocks: lines 14–68 (55 lines).
19. Break `src/lib/components/brochure/PageProjectDetail.svelte` (155 lines) into components. Component-sized blocks: lines 15–57 (43 lines).
20. Break `src/lib/components/Gallery.svelte` (145 lines) into components. Component-sized blocks: lines 42–60 (19 lines).
21. Break `src/lib/components/brochure/PageBackCover.svelte` (140 lines) into components. Component-sized blocks: lines 6–47 (42 lines).
22. Break `src/routes/contact/+page.svelte` (139 lines) into components. Component-sized blocks: lines 47–83 (37 lines).
23. Break `src/routes/portfolio/+page.svelte` (139 lines) into components. Component-sized blocks: lines 19–39 (21 lines); lines 41–58 (18 lines).
24. Break `src/routes/admin/login/+page.svelte` (134 lines) into components. Component-sized blocks: lines 13–61 (49 lines).
25. Break `src/lib/components/brochure/PageTeam.svelte` (127 lines) into components. Component-sized blocks: lines 14–44 (31 lines).
26. Break `src/routes/post/[slug]/+page.svelte` (125 lines) into components. Component-sized blocks: lines 24–61 (38 lines).
27. Break `src/routes/admin/content/+page.svelte` (117 lines) into components. Component-sized blocks: lines 25–40 (16 lines).
28. Break `src/routes/[area]/+page.svelte` (111 lines) into components. Component-sized blocks: lines 18–32 (15 lines); lines 42–54 (13 lines).
29. Break `src/routes/admin/staff/+page.svelte` (102 lines) into components. Component-sized blocks: lines 18–40 (23 lines).

**Pass 3 — Utility function identification**

30. Remove the 11 components and functions nothing calls. Listed in audit.json under details.orphans and details.inventory.offenders.orphans; confirm each has no caller before it goes.

**Pass 4 — Design pattern identification**

31. Divide `src/lib/content/pages.ts` (334 lines) into the units its pattern names. 7 functions; the longest is 12 lines.
32. Divide `src/lib/brochure/defaults.ts` (321 lines) into the units its pattern names. 1 functions; the longest is 300 lines.
33. Divide `src/lib/brochure/templates.ts` (303 lines) into the units its pattern names. 1 functions; the longest is 3 lines.
34. Divide `src/lib/server/db.ts` (301 lines) into the units its pattern names. 17 functions; the longest is 22 lines.
35. Divide `src/lib/server/brochures.ts` (300 lines) into the units its pattern names. 19 functions; the longest is 41 lines.
36. Divide `src/lib/data/projects.ts` (269 lines) into the units its pattern names. 0 functions; the longest is 0 lines.
37. Divide `src/routes/admin/projects/[id]/+page.server.ts` (144 lines) into the units its pattern names. 3 functions; the longest is 8 lines.
38. Divide `src/lib/server/auth.ts` (134 lines) into the units its pattern names. 13 functions; the longest is 13 lines.

**Pass 5 — The sweep to zero**

39. Inline magic values: 225 to zero. Scores 33.1% at weight 4; the offenders are in audit.json under details.magicValues, fifty at a time.
40. Deeply indented lines: 273 to zero. Scores 45.9% at weight 4; the offenders are in audit.json under details.prose, fifty at a time.
41. Conditions compared to a raw literal: 35 to zero. Scores 66.4% at weight 6; the offenders are in audit.json under details.conditions, fifty at a time.
42. Long member chain lines: 94 to zero. Scores 81.4% at weight 4; the offenders are in audit.json under details.prose, fifty at a time.
43. Functions over the line limit: 11 to zero. Scores 83.4% at weight 8; the offenders are in audit.json under details.functionShape, fifty at a time.
44. Explanatory comment lines: 115 to zero. Scores 86.3% at weight 4; the offenders are in audit.json under details.comments, fifty at a time.
45. Duplication %: 1.36 to zero. Scores 93.2% at weight 8; the offenders are in audit.json under details.duplication, fifty at a time.
46. Else blocks: 6 to zero. Scores 97.1% at weight 5; the offenders are in audit.json under details.functionShape, fifty at a time.
47. Conditions with calls tangled inside calls: 3 to zero. Scores 97.1% at weight 8; the offenders are in audit.json under details.conditions, fifty at a time.

## The detail behind the first targets

### `src/routes/admin/+page.svelte` — 447 lines

| Block opens with | Lines | Range | Functions that move with it |
| --- | --- | --- | --- |
| `{#if !data.configured}` | 15 | 99–113 | — |
| `<a class="card hero" href="/admin/enquiries" class:hero--alert={data.newEnquiryC` | 28 | 115–142 | — |
| `{#if data.recentEnquiries.length > 0}` | 15 | 144–158 | when |
| `<div class="tiles">` | 18 | 162–179 | — |

| Function | Line | Lines | Imported by | Same body also in |
| --- | --- | --- | --- | --- |
| when | 11 | 7 | — | — |

### `src/routes/admin/projects/[id]/+page.svelte` — 383 lines

| Block opens with | Lines | Range | Functions that move with it |
| --- | --- | --- | --- |
| `<form class="card editor" method="POST" action="?/save" use:enhance>` | 61 | 34–94 | — |
| `<section class="card gallery-card">` | 51 | 96–146 | — |

### `src/routes/admin/brochure/[id]/+page.svelte` — 378 lines

| Block opens with | Lines | Range | Functions that move with it |
| --- | --- | --- | --- |
| `<div class="head">` | 35 | 22–56 | — |
| `<div class="adders">` | 22 | 58–79 | — |
| `{#if pages.length === 0}` | 50 | 81–130 | pageTitle |

| Function | Line | Lines | Imported by | Same body also in |
| --- | --- | --- | --- | --- |
| pageTitle | 11 | 3 | — | — |

### `src/lib/content/pages.ts` — 334 lines

| Function | Line | Lines | Imported by | Same body also in |
| --- | --- | --- | --- | --- |
| seo | 35 | 12 | — | — |
| hero | 48 | 7 | — | — |
| getContentPage | 292 | 3 | `src/routes/admin/content/[page]/+page.server.ts` | — |
| pageText | 297 | 12 | `src/lib/components/CtaBand.svelte`, `src/routes/+page.svelte`, `src/routes/about/+page.svelte`, `src/routes/blog/+page.svelte` +4 | — |
| servicesWithText | 311 | 8 | `src/routes/+page.svelte`, `src/routes/services/+page.svelte` | — |
| paragraphs | 321 | 6 | `src/routes/about/+page.svelte`, `src/routes/blog/+page.svelte`, `src/routes/contact/+page.svelte`, `src/routes/ourcommunity/+page.svelte` +2 | — |
| lines | 329 | 6 | `src/routes/about/+page.svelte` | — |

### `src/lib/brochure/defaults.ts` — 321 lines

| Function | Line | Lines | Imported by | Same body also in |
| --- | --- | --- | --- | --- |
| defaultBrochurePages | 22 | 300 | `src/lib/server/brochures.ts` | — |

### `src/routes/admin/brochure/+page.svelte` — 310 lines

| Block opens with | Lines | Range | Functions that move with it |
| --- | --- | --- | --- |
| `<div class="head">` | 13 | 20–32 | — |
| `{#if showCreate}` | 25 | 52–76 | — |
| `{#if data.brochures.length === 0 && !showCreate}` | 57 | 78–134 | fmtDate |

| Function | Line | Lines | Imported by | Same body also in |
| --- | --- | --- | --- | --- |
| fmtDate | 7 | 7 | — | — |

### `src/lib/brochure/templates.ts` — 303 lines

| Function | Line | Lines | Imported by | Same body also in |
| --- | --- | --- | --- | --- |
| templateName | 297 | 3 | `src/routes/admin/brochure/[id]/+page.svelte` | — |

### `src/lib/server/db.ts` — 301 lines

| Function | Line | Lines | Imported by | Same body also in |
| --- | --- | --- | --- | --- |
| baseUrl | 113 | 3 | — | — |
| serviceKey | 117 | 3 | — | — |
| dbConfigured | 121 | 3 | `src/lib/server/badges.ts`, `src/lib/server/brochures.ts`, `src/lib/server/calculator.ts`, `src/lib/server/content.ts` +22 | — |
| headers | 125 | 8 | — | — |
| restUrl | 134 | 3 | — | — |
| check | 138 | 7 | — | — |
| dbSelect | 146 | 5 | `src/lib/server/badges.ts`, `src/lib/server/brochures.ts`, `src/lib/server/calculator.ts`, `src/lib/server/content.ts` +17 | — |
| dbCount | 153 | 10 | `src/routes/admin/+layout.server.ts`, `src/routes/admin/+page.server.ts`, `src/routes/admin/enquiries/+page.server.ts`, `src/routes/admin/rtw/+page.server.ts` | — |
| dbInsert | 164 | 10 | `src/lib/server/brochures.ts`, `src/lib/server/login-attempts.ts`, `src/routes/admin/badges/+page.server.ts`, `src/routes/admin/projects/+page.server.ts` +5 | — |
| dbUpdate | 175 | 12 | `src/lib/server/brochures.ts`, `src/routes/admin/badges/+page.server.ts`, `src/routes/admin/brochure/[id]/+page.server.ts`, `src/routes/admin/enquiries/+page.server.ts` +5 | — |
| dbUpdateWhere | 189 | 12 | `src/lib/server/brochures.ts` | — |
| dbUpsert | 203 | 15 | `src/routes/admin/calculator/+page.server.ts`, `src/routes/admin/content/[page]/+page.server.ts` | — |
| dbDelete | 219 | 7 | `src/lib/server/brochures.ts`, `src/routes/admin/badges/+page.server.ts`, `src/routes/admin/enquiries/+page.server.ts`, `src/routes/admin/projects/[id]/+page.server.ts` +3 | — |
| dbDeleteWhere | 231 | 8 | `src/lib/server/login-attempts.ts`, `src/routes/admin/calculator/+page.server.ts`, `src/routes/admin/content/[page]/+page.server.ts` | — |
| storageSignedUpload | 246 | 19 | `src/routes/admin/api/media/+server.ts` | — |
| storageList | 267 | 22 | `src/lib/server/brochures.ts` | — |
| storageUpload | 291 | 11 | `src/routes/admin/badges/+page.server.ts`, `src/routes/admin/projects/[id]/+page.server.ts`, `src/routes/admin/staff/[id]/+page.server.ts` | — |

### `src/lib/server/brochures.ts` — 300 lines

| Function | Line | Lines | Imported by | Same body also in |
| --- | --- | --- | --- | --- |
| listBrochures | 33 | 9 | `src/routes/admin/brochure/+page.server.ts` | — |
| getBrochure | 43 | 12 | `src/routes/admin/brochure/[id]/+page.server.ts`, `src/routes/admin/brochure/[id]/page/[pageId]/+page.server.ts`, `src/routes/admin/brochure/[id]/pdf/+server.ts`, `src/routes/brochure/print/[id]/+page.server.ts` | — |
| getActiveBrochure | 57 | 14 | `src/routes/brochure/+page.server.ts`, `src/routes/brochure/pdf/+server.ts` | — |
| fallbackBrochure | 73 | 20 | `src/routes/brochure/+page.server.ts`, `src/routes/brochure/print/[id]/+page.server.ts` | — |
| createBrochure | 96 | 18 | `src/routes/admin/brochure/+page.server.ts` | — |
| duplicateBrochure | 115 | 17 | `src/routes/admin/brochure/+page.server.ts` | — |
| touchBrochure | 133 | 3 | — | — |
| setActiveBrochure | 138 | 4 | `src/routes/admin/brochure/+page.server.ts`, `src/routes/admin/brochure/[id]/+page.server.ts` | — |
| setDraftBrochure | 143 | 3 | `src/routes/admin/brochure/+page.server.ts`, `src/routes/admin/brochure/[id]/+page.server.ts` | — |
| deleteBrochure | 147 | 3 | `src/routes/admin/brochure/+page.server.ts`, `src/routes/admin/brochure/[id]/+page.server.ts` | — |
| nextSortOrder | 153 | 3 | — | — |
| addPage | 157 | 16 | `src/routes/admin/brochure/[id]/+page.server.ts` | — |
| addProjectPages | 179 | 41 | `src/routes/admin/brochure/[id]/+page.server.ts` | — |
| updatePage | 221 | 8 | `src/routes/admin/brochure/[id]/page/[pageId]/+page.server.ts` | — |
| deletePage | 230 | 4 | `src/routes/admin/brochure/[id]/+page.server.ts`, `src/routes/admin/brochure/[id]/page/[pageId]/+page.server.ts` | — |
| duplicatePage | 235 | 12 | `src/routes/admin/brochure/[id]/+page.server.ts` | — |
| movePage | 249 | 18 | `src/routes/admin/brochure/[id]/+page.server.ts` | — |
| siteImageLibrary | 276 | 14 | `src/routes/admin/brochure/[id]/page/[pageId]/+page.server.ts`, `src/routes/admin/slideshow/+page.server.ts` | — |
| uploadedImageLibrary | 292 | 9 | `src/routes/admin/brochure/[id]/page/[pageId]/+page.server.ts`, `src/routes/admin/slideshow/+page.server.ts` | — |

### `src/routes/admin/content/[page]/+page.svelte` — 300 lines

| Block opens with | Lines | Range | Functions that move with it |
| --- | --- | --- | --- |
| `{#snippet field(f: ContentField)}` | 19 | 45–63 | changed, rows |
| `{#if Object.keys(data.saved).length > 0}` | 12 | 121–132 | — |

| Function | Line | Lines | Imported by | Same body also in |
| --- | --- | --- | --- | --- |
| initial | 11 | 5 | — | — |
| changed | 30 | 3 | — | — |
| rows | 34 | 5 | — | — |
