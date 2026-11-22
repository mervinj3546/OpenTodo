## Context

Density is `user_prefs.density`, a free string (`internal/sync/ops.go`), read by `readAppearance` and applied as `data-density` on `<html>` by `applyAppearance`. Rows take their padding from `.row-pad`.

## Decisions

### D1. Roomy rows are cards drawn by the stylesheet

Under `:root[data-density="roomy"]` a `.row-pad` row gets a fill, the `--radius-surface` radius, 0.75 rem inline padding and a 4 px bottom margin. The fill is one tone from what the list sits on: `--ot-raised` on the inset content surface, `--ot-surface` on a phone's canvas, so a card is visible in every theme without a border. The fill rule has zero specificity (`:where`) inside the components layer, so the hover, selected and ticked states still paint over it; the shape and type rules are unlayered, after the phone row rules, because they must outrank the row's utilities (`rounded-control`, `px-2`, `text-body`, `h-5`).

Rejected: a `card` prop on `TaskRow` (the board's card shape). It changes markup, drag and the row cache for a presentational choice, and the board card carries a border and metadata layout that a list does not want.

### D2. Sizes

Title: `--ot-text-list + 0.125rem`, line 1.5 rem; on a phone `max(1.0625rem, …)`, so the default 13 px list size gives 17 px and a theme's 15 px gives 17 px. Check: 24 px with a 1.5 px ring. Rows: 0.75 rem block padding with a fine pointer (48 px), 1 rem on the phone row's open area (56 px). The side controls are offset to sit on the title's first line.

### D3. Additive value

`DENSITIES` becomes `['compact', 'comfortable', 'roomy']` (the order of the control, smallest first). `readAppearance` accepts any listed value; anything else still reads as comfortable and is not rewritten. A client from before this change reads `roomy` as comfortable.

### D4. Fewer marks on a roomy card

On a coarse pointer the grip (`[data-row-grip]`) is hidden: the row body's long press then a move already drags (action-menus), and Select tasks in the page menu shows the checkboxes (bulk-actions), so only the grip's one-tap select and its instant drag are given up, in a density chosen for reading. The fold arrow's slot (`[data-leading-slot]`) is hidden in a list with no fold button (`:not(:has([data-leading-slot] > button))`), so the check sits at the card's padding; a list with subtasks keeps every slot so checks line up across rows.

Rejected: hiding the grip in every density (it is the phone's selection control by spec), and dropping the slot per row (checks would zigzag in a list with subtasks).

### D5. A large title on a roomy phone

On a phone (below the desktop header width) with Roomy, `ProjectHeader` passes `kind="day"` to `PageHeader`: the head Today and Upcoming already use (precision-phone D1), with the title at the display step in the page and a bar of buttons only. Its lead is the phone line without the member count; members stay one tap away under Share in the project menu. The head scrolls with the list; the bar does not bring the title back on scroll.

Interface budget: the head is a row in the page, as on a day page, so a roomy project on a phone has the bar, the head and the quick add above the first task: the same as Today, one more than a project in the other densities. Desktop and the other densities are unchanged.

Rejected: a large-title mode for every page in Roomy (Inbox, labels and filters have no progress and other leads; a later change can extend it), and bringing the title into the bar on scroll (a scroll observer for a cosmetic step).

### D6. Project groups in a roomy sidebar

A project row carries its tree level (`li[role="treeitem"][aria-level]`, a flat list indented by padding), so the stylesheet styles levels apart without markup changes: level 1 gets the list size plus 0.125 rem (17 px with a 15 px theme) at weight 600 and the default text tone instead of the sidebar's faint tone; deeper levels are at least 16 px (`max(1rem, list size)`), one step under the 17 px heading. The selected row keeps its strong tone (`aria-current` excluded). The sizes follow the theme's list size, so a theme still moves them.

Rejected: a theme setting per level (a new key in the theme format, for one look), and dimming sub-projects (the sidebar's names are already at the faint tone, the lowest text tone).

## Data model impact

None: a new value of an existing string field. No op schema change.

## Size impact

About 1.2 KB of CSS before compression; no dependency; no runtime memory change.

## Interface budget

No chrome is added: the rows get taller, not more numerous. The phone list shows about nine rows instead of eleven on a 390 × 844 screen. Properties, sidebar destinations, scroll regions and shortcuts are unchanged.
