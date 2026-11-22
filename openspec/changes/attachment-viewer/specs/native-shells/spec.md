## ADDED Requirements

### Requirement: Viewing an image attachment in the app
When the user opens an uploaded image attachment (PNG, JPEG, GIF, WebP, AVIF or SVG) in a shell, the web app SHALL show it in its own viewer instead of saving it: a full-screen sheet with the file's name, the image, Close and **Save**. The image's open button, its Download button and its thumbnail SHALL all open the viewer. The viewer SHALL show the device's copy when the device holds one, also offline; SHALL decrypt an encrypted file on the device; and SHALL otherwise load the server's copy, served inline. **Save** SHALL hand the file to the system share sheet when the web view offers one for files, and SHALL otherwise save it as "Saving a file from the app" says. Other files and links SHALL open as before, and in a browser an image SHALL still open in a new tab. Viewing changes no data and syncs nothing.

#### Scenario: A photo on iPhone
- **WHEN** the user taps a photo attached to a task in the iOS app
- **THEN** the photo is shown full screen in the app with its name, and no save dialog or error page appears

#### Scenario: Saving from the viewer
- **WHEN** the user taps Save in the viewer on iPhone
- **THEN** the share sheet opens with the photo, offering Save Image, and no error page appears

#### Scenario: Download on the row
- **WHEN** the user taps Download beside a photo in the iOS app
- **THEN** the viewer opens, with Save

#### Scenario: Offline
- **WHEN** the phone is offline and the device holds the photo
- **THEN** the viewer shows it

#### Scenario: A PDF
- **WHEN** the user opens a PDF attachment in a shell
- **THEN** it is saved through the save dialog, as before

#### Scenario: In a browser
- **WHEN** the user opens a photo attachment in a browser
- **THEN** it opens in a new tab, as before
