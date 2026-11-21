## MODIFIED Requirements

### Requirement: Density preference
Each user SHALL have a density preference, `compact`, `comfortable` (default) or `roomy`, stored and synced like mode and theme as an additive preference, applied at once to task rows, group headers and the sidebar. Comfortable rows SHALL be 36 px and compact rows 32 px with a fine pointer. Under `roomy` each task row in a list SHALL be drawn as a separate card, distinguishable from the background it sits on in every theme, with the theme's surface radius and a gap between cards; roomy rows SHALL be at least 48 px with a fine pointer and 56 px on a phone, with the title larger than the list text size (at least 17 px on a phone) and a 24 px completion check. On a touch screen a roomy card SHALL NOT show the row's grip; a long press followed by movement SHALL still drag the row, and Select tasks in the page's menu SHALL still start a selection. In a list where no row has subtasks, a roomy card SHALL NOT reserve the subtask arrow's space before the check; where any row has subtasks the space SHALL be kept so the checks line up. Board cards, group headers and the sidebar SHALL keep the comfortable sizes under `roomy`. The hover, selected and ticked states SHALL remain visible on a roomy card. The preference SHALL be editable offline, apply at once on the editing device and converge on the user's other devices by last-writer-wins. A client SHALL treat an unknown value as `comfortable` and keep the stored value unchanged. Touch targets SHALL stay 44 px on coarse pointers in every density.

#### Scenario: Compact on two devices
- **WHEN** the user picks Compact on a laptop
- **THEN** rows are 32 px tall there at once and on the user's tablet after sync, where touch targets remain 44 px

#### Scenario: Roomy on a phone
- **WHEN** the user picks Roomy on their phone while offline
- **THEN** each task row is at once a separate 56 px card with a title of at least 17 px, and the user's laptop shows roomy 48 px cards after sync

#### Scenario: Reordering a roomy list on a phone
- **WHEN** the user long-presses a roomy card on a phone and moves their finger
- **THEN** the task is dragged, although the card shows no grip

#### Scenario: An older client
- **WHEN** a client from before Roomy reads a stored `roomy`
- **THEN** it shows comfortable rows and writes no change to the preference
