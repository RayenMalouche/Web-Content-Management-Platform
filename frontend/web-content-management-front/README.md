# Web App Builder — the model kit

The Angular 19 frontend for the Web Content Management Platform. It talks to the
Spring Boot API on `http://localhost:8081`.

```bash
npm install --legacy-peer-deps   # the pinned Angular packages disagree on minor versions
npm start                        # http://localhost:4200
npm run build                    # production build → dist/
```

## The design

Building a website from parts is **assembling a model kit**, so every screen
borrows from one:

- **The box**: the landing page is the box lid. It has the kit number, the
  exploded view of a web page (`shared/kit/exploded-view.component.ts`: header,
  hero, cards and footer pulled apart with numbered callouts), what's in the box,
  and how it goes together.
- **The sprue** is the signature element. Every list is a grey runner frame, and
  each item is a part joined to it by a small gate, with a **part number** (W1,
  W2… for websites, P1… for projects, D1… for databases). The numbers come from a
  CSS counter on `.kit-grid`, set per list with `--sprue-letter`, so no component
  had to change to get them. The dashed slot at the end is where the next part goes.
- **The instruction sheet**: page sections are numbered steps with circled
  numbers, and the sidebar is the box's contents list (A–E).
- **The workbench** (`main`): the builder has a **parts tray** (the node
  templates from `/api/nodes/templates`, hung off one runner), an **assembly
  area** on a green self-healing **cutting mat**, and a **paint guide** (the
  selected part's name, size, background and border, or the layout's settings).
  The selected part is highlighted in decal yellow. *Preview* hides the tray and
  the guide.

**Palette**: defined once, as CSS custom properties in `src/styles.scss`. Each
colour has one job:

| Token | Hex | Role |
| --- | --- | --- |
| `--sheet` | `#F6F4EE` | page ground, the instruction sheet |
| `--plate` | `#E6E7E2` | part surfaces, grey kit plastic |
| `--sprue` | `#B5B8B1` | runners, frames, borders |
| `--ink` | `#1C1E22` | type, step numbers, the sidebar |
| `--kit-blue` | `#1E4FA0` | box-art blue: primary actions, links |
| `--kit-red` | `#CF3A2E` | destructive actions and errors only |
| `--decal` | `#F2C318` | the decal sheet: selection and highlights only |
| `--mat` | `#2B5A47` | the cutting mat under the builder |

**Type**: *Archivo* (heavy, uppercase) for box and step headings, *Manrope* for
reading, and *Space Mono* for part numbers and labels. All are self-hosted
through `@fontsource`, and Font Awesome is loaded once, globally.

The whole look is one global stylesheet (`kit-*` classes: shell, page head,
steps, grid and parts, buttons, fields, search, modals). Component styles only
hold what is unique to the component, which keeps every one under the
component-style budget.

## Reused from component-lab

The lab components are React. These are hand ports to Angular standalone
components, in `src/app/shared/kit/`:

| Component | Ported as | Used for |
| --- | --- | --- |
| `animated-grid-pattern.tsx` | `cutting-mat.component.ts` | the cutting mat under the builder, and the grid on the landing page's box lid. framer-motion's per-square animation became a CSS keyframe with a staggered delay; squares hop to a new cell on `animationiteration` |
| `text-effect.tsx` | `text-effect.component.ts` | the landing headline's word-by-word reveal (CSS `animation-delay` per segment, full text kept for screen readers) |

Hand-built for this design instead: the sprue, the exploded view, the sidebar,
the workbench, the parts list table and the modals. Considered and rejected:
`be-ui-tilt-card` (parts on a sprue shouldn't wobble; they lift 2px on hover
instead) and `interactive-folder-gallery` (the websites → pages hierarchy is
already a route).

## Fixes made along the way

- **`main.ts` replaced the app config.** It bootstrapped with its own route list
  and providers, so `app.config.ts` and `app.routes.ts` were never used. It now
  bootstraps with `appConfig`, and the two route lists are merged in
  `app.routes.ts`. Added: `/dashboard` without an ID, `/databases` and
  `/signup`, plus a catch-all back to `/home`.
- **List pages never showed their data.** The root `AppComponent` used `OnPush`
  change detection, so routed pages didn't re-render when their data arrived. The
  dashboard worked only because it called `detectChanges()` by hand; Websites,
  Projects and Users stayed empty. The root component uses default change
  detection now.
- **Selecting a part crashed the paint guide.** The Type field was bound to a
  form control named `ntype`; the control is `type`.
- **The paint guide's tabs didn't switch.** They relied on Bootstrap's
  JavaScript, which was never loaded. They are Angular state now.
- **The production build failed.** Three components imported all of Font Awesome
  into their own styles, each about 80 KB against the 8 KB budget, and the
  initial bundle was 1.36 MB against the 1 MB limit. Font Awesome is global now,
  Bootstrap and Tailwind are gone, and the initial bundle is about 775 KB.
- **Missing stylesheets.** `add-table` and `options` pointed at stylesheet files
  that didn't exist.
- **Non-functional controls removed.** The builder's "Containers" tab listed
  parts with no drag bindings, the undo/redo buttons had no handlers, and the
  database page showed a made-up MySQL / 245 MB / `db.example.com` card. The page
  now shows only the real database ID and table count.
