## 1. Viewer

- [x] 1.1 `viewsInApp` and `imageFile` in `attachmentOpen.ts` (verify: `npx vitest run src/lib/attachmentOpen.test.ts`)
- [x] 1.2 `ImageViewer` opens from the task's Attachments row and from a comment's attachments in a shell, from the eye, Download and the thumbnail; Save uses the share sheet (verify: `npx vitest run src/app/task-detail/attachmentsRow.test.tsx`)

## 2. Release

- [x] 2.1 Changelog fragment `changelog.d/Fixed/attachment-viewer.md`

## 3. On a device

- [ ] 3.1 In the iOS app from the App Store: a photo opens in the viewer from its thumbnail, eye and Download; Save shows the share sheet and Save Image writes it to Photos; a PDF still saves as before
