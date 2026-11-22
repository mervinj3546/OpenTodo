## Why

On a phone the list is read at arm's length, often one-handed in a shop: 14.5 px titles on hairline-divided 44 px rows read as dense, and the open-and-tick loop of a shopping or packing list wants larger targets and clear separation. People who move from list apps that draw each task as a card ask for that look; the dense default stays right for desk work.

## What Changes

- The density preference gains a third value, `roomy`, offered in Settings → Appearance as **Compact · Comfortable · Roomy**.
- Under Roomy every task row in a list is a card of its own: a fill one step from what it sits on, the theme's surface radius and a 4 px gap, with no divider. Rows are 48 px with a fine pointer and 56 px on a phone; the title is two steps above the list size (at least 17 px on a phone) and the check is 24 px.
- On a phone a roomy card hides the drag grip (long press then move still drags; Select tasks in the page menu still selects), and a list without subtasks drops the subtask arrow's empty slot.
- On a phone a roomy project page opens with the project's name as a large title and its progress beside it in small text; the member count leaves the header (it stays under Share).
- Board cards, the sidebar and group headers keep the comfortable sizes.
- The value is an additive string on the existing `density` field: no op schema change. An older client reads it as comfortable and keeps it.

## Out of scope

- A per-device density (the preference syncs, as compact does).
- A background image behind lists, large titles on pages other than projects, and the folded Completed group's shape.
- Choosing Roomy by default on phones.

## Roadmap

Not a roadmap item: a refinement of the shipped appearance preferences.
