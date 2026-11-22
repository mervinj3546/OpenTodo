## Why

In the iPhone app, tapping a photo attached to a task does not show it. Since #1654 every attachment opened in a shell is saved through the shell's save path, and for an image that is the wrong answer: the person wanted to look at it. On iOS the save also starts as a navigation that the web view turns into a download, which can surface as the web view's "Frame load interrupted" error page.

## What Changes

- In a phone shell, opening an uploaded image (PNG, JPEG, GIF, WebP, AVIF, SVG) shows it in the app's own viewer: a full-screen sheet with the file's name, the image and **Save**. The image's eye, its Download button and its thumbnail all open it.
- The viewer shows the device's copy when it has one (also offline), decrypts an encrypted file on the device, and otherwise loads the server's copy, which the server already serves inline.
- **Save** hands the image to the system share sheet (Save Image, Save to Files, Messages…), with the bytes the viewer already holds, so no download navigation starts. Where the web view has no share sheet it saves as today.
- Other files, links, and every attachment in a browser open as today.

## Out of scope

- Zooming, swiping between images, and a viewer in the browser, which has tabs.
- Images embedded in a task's notes.

## Roadmap

Not a roadmap item: a fix to opening attachments in the phone apps.
