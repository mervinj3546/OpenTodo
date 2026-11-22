## Context

`openAttachment` (web/src/lib/attachmentOpen.ts) saves every file in a shell (#1654), because a web view has no tabs and the system browser has no session. That is right for a PDF or an archive and wrong for a photo.

## Decisions

### D1 Which attachments the viewer opens

An uploaded file whose type is an image the server serves inline (`isImage`), opened in a shell. Links keep the system browser; other files keep the save; a browser keeps the new tab, which already shows images. The check is `viewsInApp(a)`, so each place that opens an attachment asks the same question.

### D2 Where the image comes from

The device's copy as an object URL, also offline; for an encrypted account the decrypted file, since the server holds an envelope only; else the server's content URL without `download=1`, served inline with the app's own cookie. The object URL is revoked when the viewer closes.

### D3 The viewer is a Dialog

The existing `Dialog` at size `xl` is a full-screen sheet on a phone with the safe areas, a title and Close, and Escape and Back close it. Its one action is **Download**, the same save as the row's Download button. No new strings.

## Risks

- A very large image is decoded in the web view; the same image already shows as the row's thumbnail.
