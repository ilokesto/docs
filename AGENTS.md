# Docs Architecture

This file defines the canonical section structure for every library documentation in this project.
All contributors and AI agents must follow this structure when adding or editing docs pages.

## Common Section Structure

Every library doc uses the following section order in `meta.json`:

```json
{
  "title": "<Library Name>",
  "root": true,
  "pages": [
    "index",
    "---Getting Started---",
    "quick-start",
    "core-concepts",
    "---Reference---",
    "<api surface pages>",
    "---Guides---",
    "<task-oriented pages>",
    "---Advanced---",
    "<edge case / internals pages>",
    "troubleshooting"
  ]
}
```

### Section Definitions

| Section | Named Separator | Purpose |
|---|---|---|
| _(none)_ | — | `index` always comes first with no separator |
| Getting Started | `---Getting Started---` | `quick-start` + `core-concepts`. Entry path for new users. |
| Reference | `---Reference---` | One page per major API export or feature group. Spec-level. |
| Guides | `---Guides---` | Task and scenario-oriented how-to pages. |
| Advanced | `---Advanced---` | Edge cases, internal mechanics, building on the library. |
| _(none)_ | — | `troubleshooting` always comes last with no separator if present. |

### Page Conventions

- `index` — What the package is, what it is **not**, a minimal code example, navigation links to the next pages.
- `quick-start` — Fastest path to a working result. No theory, just steps.
- `core-concepts` — The mental model. How the package works and why it is shaped the way it is.
- `troubleshooting` — Diagnosed common mistakes. Add only when real failure patterns exist.

### Naming Rules

- Separator labels use title case: `---Getting Started---`, `---Reference---`, `---Guides---`, `---Advanced---`.
- Unnamed separators (`---`) are **not allowed**. Every separator must have a label.
- Page slugs use kebab-case.
- Korean translations live alongside English files as `<slug>.ko.mdx`.

## Folder Grouping

Use the common named separators for top-level structure. Do not add library-specific top-level separators such as `---Middleware---` or `---Utilities---` unless the project explicitly changes this architecture document first.

When a library has feature groups, represent them as folders inside the closest common section:

- API exports, middleware, utilities, and other spec-level surfaces belong under `---Reference---`.
- Task-oriented walkthroughs and recipes belong under `---Guides---`.
- Edge cases, internals, and implementation notes belong under `---Advanced---`.

For Fumadocs folder groups, prefer this shape:

```json
{
  "title": "Display Name",
  "defaultOpen": true,
  "collapsible": false,
  "pages": ["child-page"]
}
```

Keep `index.mdx` in the folder so the folder label can navigate to the overview page, but omit `"index"` from `pages` to avoid a duplicated child item.

## Current Library Map

```
docs/content/docs/
├── store/       @ilokesto/store    — framework-neutral vanilla store
├── state/       @ilokesto/state    — multi-framework adapters backed by Store
└── utilinent/   @ilokesto/utilinent — React rendering-logic utilities
```

### store — `meta.json` sections
`Getting Started` → `Reference` → `Guides` → `Advanced` → `troubleshooting`

### state — `meta.json` sections
`Getting Started` → `Reference` → `Guides` → `Advanced`

`middleware/` and `utils/` are folder groups under `Reference`, not separate top-level separators.

### utilinent — `meta.json` sections
`Getting Started` → _(feature category sections)_ → `Advanced`

## Adding a New Library

1. Create `docs/content/docs/<library-slug>/` directory.
2. Add `meta.json` following the common structure above.
3. Start with `index`, `quick-start`, `core-concepts` — these three are mandatory.
4. Add `troubleshooting` only once real failure patterns have been observed in practice.
5. Register the new slug in `docs/content/docs/meta.json`.
