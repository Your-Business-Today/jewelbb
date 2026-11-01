# Jewel Bespoke Build — jewelbb.co.uk

Rebuild of [jewelbb.co.uk](https://www.jewelbb.co.uk) in **SvelteKit** (Svelte 5), replacing the old Wix site. Deploys to **Vercel**.

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build
npm run preview    # preview the production build
npm run check      # type-check svelte + ts
```

## Project structure

```
src/
  lib/
    data/          # ALL site content lives here — edit these to change the site
      site.ts        # contact details, social links, navigation
      services.ts    # the six services
      team.ts        # team member bios
      projects.ts    # the 14 project/area pages (galleries, descriptions)
      testimonials.ts
      images.ts      # central image registry (currently Wix CDN URLs)
    posts/         # blog posts — one markdown file each; add a file to publish
    components/    # header, footer, gallery, contact form, etc.
  routes/          # one folder per page; [area] renders all project pages
```

### Publishing a blog post

Add `src/lib/posts/my-new-post.md`:

```markdown
---
title: "My New Post"
date: 2026-08-07
slug: my-new-post
author: Jewel Bespoke Build
description: "Short summary shown on the news page and in Google results."
---

Post body in markdown…
```

Commit and push — the post appears at `/post/my-new-post` and in the sitemap automatically.

## Admin area & Supabase content

The site has a lightweight CMS at **`/admin`** (not linked from the public site — bookmark it):

- **Staff** — add/edit/reorder/delete team members shown on `/about`, including photo uploads.
- **Projects** — edit portfolio projects and galleries. Reorder with the ▲/▼ arrows on the list, and **Hide** a project to take it off the site (portfolio, homepage, sitemap and its own page) without deleting it — **Show** brings it back.
- **Slideshow** — the rotating photos at the top of the homepage. Add photos from any project gallery or upload new ones, reorder, hide, or give each one a description. With no photos showing, the homepage falls back to its standard hero photo.
- **Page text** — edit the headings, intros and SEO titles/descriptions of the homepage, About, Services (including each service's title and description), Portfolio, Our community, Contact, News and the call-to-action band. Only changed fields are stored; anything untouched keeps the built-in copy from `src/lib/content/pages.ts`, and each field or whole page can be restored to the original.
- **Badges** — the accreditation/partnership logo strip on the homepage (Considerate Constructors, SafeContractor, etc.). Add, hide, reorder, replace or delete badges; hiding keeps the badge on file so it can be brought back later. Requires the `badges` table — on an existing database run the additive migration `supabase/2026-08-31-badges.sql` once (fresh setups get it from `schema.sql`).
- **Testimonials** — the client quotes on the homepage, the contact page and the brochure's testimonials page. Add, edit, reorder (sort order), **Hide**/**Show** or delete a testimonial, and tick where each one appears. The brochure's testimonials page takes its quotes from here; its heading is still edited in the brochure builder. Requires the `testimonials` table from `supabase/2026-10-20-testimonials.sql` (until it exists the site shows the built-in testimonials from `src/lib/data/testimonials.ts`).
- **Brochures** — a full brochure builder. Compose print-quality brochures page by page from designed templates (cover, philosophy, team, services, three-page project spreads, process, testimonials, back cover), keep them in draft, and make one **active** — that's what visitors see at `/brochure` and download as a PDF. PDFs are rendered server-side with headless Chromium, so the output is identical to the designed A4 pages every time (no browser print dialogs involved). Photos upload straight to Supabase Storage at full resolution via signed URLs. Requires running `supabase/2026-08-19-brochures.sql` once (see below).

Content lives in Supabase; uploaded images go to a public `media` storage bucket.

**Setup (once):**

1. In the Supabase dashboard open **SQL Editor**, paste the contents of `supabase/schema.sql`, and Run. This creates the tables, locks them down with RLS, creates the storage bucket, and seeds the current team + a starter brochure. Then run `supabase/2026-08-19-brochures.sql` the same way — it adds the `brochures` / `brochure_pages` tables used by the brochure builder. (Existing database? Don't re-run `schema.sql` — see *Database migrations* below.)
2. In **Project Settings → API**, copy the **Project URL** and the **service_role** key into the `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` env vars (locally in `.env`, and on Vercel).
3. Set `ADMIN_USERNAME` / `ADMIN_PASSWORD` (and ideally `ADMIN_SESSION_SECRET`) env vars for the admin login.

If Supabase isn't configured the public site still works — `/about` falls back to the static team data in `src/lib/data/team.ts` and `/brochure` renders a basic fallback.

The service_role key bypasses row-level security — it must only ever live in env vars (never commit it; `.env` is gitignored).

### Database migrations

`schema.sql` is for a **fresh** database. The live database changes through migrations, which run themselves: when a pull request merges into `main`, the `run migrations` workflow (`.github/workflows/run-migrations.yml`, `scripts/run-added-migrations.sh`) runs every `migrations/*.sql` file the merge added, in filename order, each in one transaction, against the repository secret `SUPABASE_DB_URL`. A file already on `main` never runs again, so a correction is a new file, and every migration is additive and safe to run twice.

New migrations go in the top-level `migrations/` folder, named `YYYY-MM-DD-<what-it-adds>.sql`. The dated files below, in `supabase/`, came before the workflow and were all run by hand on the live database; they stay where they are so the workflow never sees them:

| File | Adds |
| --- | --- |
| `2026-08-12-enquiries.sql` | `enquiries` table (quote form inbox) |
| `2026-08-19-brochures.sql` | `brochures` + `brochure_pages` (brochure builder) |
| `2026-08-31-badges.sql` | `badges` table + seed |
| `2026-09-04-security-hardening.sql` | RLS on every table, public API roles revoked, `admin_login_attempts` table (see Security) |
| `2026-09-25-page-content.sql` | `page_content` table (Page text editor) + `projects.visible` (hide projects) |
| `2026-09-25-home-slides.sql` | `home_slides` table (homepage slideshow) + seed |
| `2026-10-20-testimonials.sql` | `testimonials` table (Admin → Testimonials) + seed from the live homepage and active brochure, leaving out the withdrawn MVL endorsement |

## Security

**Database.** Every table has row-level security enabled with **no policies**. The site's server code authenticates with the `service_role` key, which bypasses RLS; the public `anon`/`authenticated` keys are never used and see nothing. As a second layer, `2026-09-04-security-hardening.sql` also revokes the table privileges Supabase grants those public roles by default (and stops future tables getting them), so even if RLS were switched off by mistake the public keys still couldn't read or write anything. The script ends with a report — every table should show `rls_enabled = true`, `policies = 0`, `anon_access = false`, `service_role_access = true`. If a table is ever meant to be read with the anon key, it needs both a policy *and* an explicit `grant select on public.<table> to anon`.

**Admin area (`/admin`).** Guarded in `src/hooks.server.ts` for every request whose path starts with `/admin` (except the login page): the `jb_admin` cookie must carry a valid, unexpired HMAC-SHA256 signature. The cookie is `HttpOnly`, `Secure`, `SameSite=Lax` and lasts 8 hours; SvelteKit's built-in origin check protects the login/logout forms from CSRF. Credentials and signatures are compared in constant time. The login is rate-limited — after **5 failed attempts from one IP within 15 minutes** further attempts are refused until the window passes (attempts are logged in `admin_login_attempts`, so the limit survives redeploys; a wrong password also costs a one-second delay). Every `/admin` response is sent with `Cache-Control: no-store`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: same-origin` and `X-Robots-Tag: noindex`. Failed and refused logins appear in the Vercel function logs as `Admin login failed for <ip>` / `Admin login refused for <ip>`.

To sign every admin out at once (e.g. after a shared laptop goes missing), change `ADMIN_SESSION_SECRET` in Vercel and redeploy.

## Deploying to Vercel (first time)

1. Push this repo to GitHub.
2. In [vercel.com](https://vercel.com) → **Add New → Project** → import the repo. Vercel auto-detects SvelteKit; no settings needed.
3. **Environment variables** (Project → Settings → Environment Variables) — needed for the contact form:
   - `RESEND_API_KEY` — from [resend.com](https://resend.com) (free tier). Verify the `jewelbb.co.uk` domain in Resend so email lands reliably.
   - `CONTACT_TO_EMAIL` — e.g. `sales@jewelbb.co.uk`
   - `CONTACT_FROM_EMAIL` — e.g. `website@jewelbb.co.uk` (must be on the verified domain; until then omit and the Resend test sender is used)
4. Deploy, then check the preview URL thoroughly.

### Pointing the domain

In Vercel → Project → Settings → Domains, add `www.jewelbb.co.uk` and `jewelbb.co.uk`. Then at your DNS provider (currently managed via Wix):

- `www` → CNAME → `cname.vercel-dns.com`
- apex (`jewelbb.co.uk`) → A record → `76.76.21.21`

Vercel shows the exact records to set and verifies them live. Old Wix URLs are preserved (`/copy-of-privacy-policy` 301-redirects to `/subcontractor-terms`, as does the former `/terms-and-conditions` address).

## Images

All site images are self-hosted — nothing depends on Wix any more:

- `static/images/` — logo, hero shots, accreditation badges, team photos and the
  seeded project galleries (served straight from Vercel's CDN).
- Supabase Storage (`media` bucket) — photos uploaded through `/admin`
  (staff photos and new project gallery images).

The Wix account can be cancelled once DNS has been moved.

## Notes

- The old Wix "Members" area was intentionally not migrated.
- Portfolio projects are editable in `/admin` → Projects (stored in Supabase;
  `src/lib/data/projects.ts` is the fallback used until Supabase is connected).
- All pages are prerendered (static) except `/api/contact` (serverless function for the form).
- The sitemap is generated at build time at `/sitemap.xml`.

<!-- code-quality:start -->
## Code quality

<table><tr><td align="center">
<strong>Code quality score</strong><h2>81.2%</h2>
<sub>measured 2026-11-01 · project-process kit 1.37.0</sub>
</td></tr></table>

659 files · frontend 244 · tooling 233 · shared 50 · backend 46 · tests 28 · docs 26 · infrastructure 12 · database 9 · api 9 · other 2

<details>
<summary><strong>How the 81.2% is made up</strong></summary>

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

Each element scores 100% with no offenders and falls in a straight line to 0% when its offenders, measured against the size of the codebase, reach the figure in the last column. The score is the weighted average of the elements that could be measured; an element that could not be measured lends its weight to the rest. Weights and zero points are set in `tools/refactor/rules.json` under `score.elements`. The offenders behind every reading are in `tools/refactor/audit-output/audit.json`.

</details>

<details>
<summary><strong>The repository by area: 659 files</strong></summary>

| Area | Files | Of which audited source | Source lines |
| --- | --- | --- | --- |
| frontend | 244 | 123 | 11,005 |
| tooling | 233 | 0 | 0 |
| shared | 50 | 48 | 2,488 |
| backend | 46 | 46 | 2,977 |
| tests | 28 | 0 | 0 |
| docs | 26 | 0 | 0 |
| infrastructure | 12 | 0 | 0 |
| database | 9 | 0 | 0 |
| api | 9 | 9 | 344 |
| other | 2 | 0 | 0 |
| **whole repository** | **659** | **226** | **16,814** |

</details>

<details>
<summary><strong>The refactoring plan: 47 steps, in order</strong></summary>

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

… and 37 more steps. The whole plan, with the measured detail, is in [`tools/refactor/refactor-plan.md`](tools/refactor/refactor-plan.md).

</details>

<!-- code-quality:end -->
