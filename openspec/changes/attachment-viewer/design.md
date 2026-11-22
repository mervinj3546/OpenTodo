## Context

`openAttachment` (web/src/lib/attachmentOpen.ts) saves every file in a shell (#1654), because a web view has no tabs and the system browser has no session. That is right for a PDF or an archive and wrong for a photo.

## Decisions

### D1 Which attachments the viewer opens

An uploaded file whose type is an image the server serves inline (`isImage`), opened in a shell. Links keep the system browser; other files keep the save; a browser keeps the new tab, which already shows images. The check is `viewsInApp(a)`, so each place that opens an attachment asks the same question.

### D2 Where the image comes from

The device's copy as an object URL, also offline; for an encrypted account the decrypted file, since the server holds an envelope only; else the server's copy, fetched with the app's own cookie. The viewer holds the bytes as a `File` and shows them as an object URL, revoked when it closes.

### D3 The viewer is a Dialog

The existing `Dialog` at size `xl` is a full-screen sheet on a phone with the safe areas, a title and Close, and Escape and Back close it. Its one action is **Save** (D4). No new strings.

### D4 Save is the share sheet

On iOS the save path (an anchor with `download`, which WebKit turns into a `WKDownload`) ends on "Frame load interrupted" in the App Store app, for the viewer and for the row's Download alike. `navigator.share({ files })` needs no navigation and offers Save Image, which is what a person saving a photo wants. It is called within the tap with bytes already held, so the gesture is not lost to a fetch. Without `canShare` for files it falls back to `openAttachment(a, { download: true })`. In a shell the row's Download for an image opens the viewer, whose Save is one tap away.

### D5 The thumbnail opens the file

On a phone the thumbnail is the obvious target; it opens the file as the name and eye do. It stays out of the tab order, since the name is the item's one stop.

## Risks

- A very large image is decoded in the web view; the same image already shows as the row's thumbnail.
