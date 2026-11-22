## 1. Preference

- [ ] 1.1 `DENSITIES` lists compact, comfortable, roomy; `readAppearance` accepts roomy; `applyAppearance` sets `data-density="roomy"` (verify: `npx vitest run src/app/density.test.tsx src/lib/appearance.test.ts`)
- [ ] 1.2 Settings → Appearance shows **Compact · Comfortable · Roomy** and writes one `density` op (verify: density.test.tsx)
- [ ] 1.3 The Go schema comment names the third value (verify: `go vet ./internal/sync`, or CI where Go is not installed)

## 2. Presentation

- [ ] 2.1 Roomy card, sizes and the phone row in `index.css` (verify: density.test.tsx stylesheet assertions; `Screens/Phone/Shopping list, roomy` in the workbench, both themes)
- [ ] 2.2 Contrast and tone lints still pass (verify: `npx vitest run src/ui/tokens`)

## 2b. Large title

- [ ] 2b.1 A roomy project on a phone uses the day head with the progress as its lead and no member count (verify: precisionPhone.test.tsx "with Roomy a project gets the large title"; `Screens/Phone/Shopping list, roomy`)

- [ ] 2b.2 A top-level project in a roomy sidebar is larger, heavier and in the default tone (verify: density.test.tsx; the drawer of `Screens/Phone/Shopping list, roomy`)

## 3. Docs and release

- [ ] 3.1 Settings copy, the Appearance docs and the translations name Roomy (verify: `make i18n-check`, `make docs-check`)
- [ ] 3.2 Changelog fragment `changelog.d/Added/roomy-density.md` (verify: `make news-check`)
- [ ] 3.3 `npm run build` and `npx openspec validate roomy-density --strict` pass
