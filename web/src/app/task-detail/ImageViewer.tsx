// The image viewer of a phone shell (OpenSpec change attachment-viewer): the shell has no
// tabs, and saving a photo is not looking at it, so an image attachment opens here.
import { useEffect, useState } from 'react'
import { AttachmentError } from '../../lib/attachments'
import { imageFile, openAttachment } from '../../lib/attachmentOpen'
import { t } from '../../lib/i18n'
import type { Attachment } from '../../lib/types'
import { Button, Dialog } from '../../ui'

const failed = (err: unknown) => err instanceof AttachmentError ? err.message : t('This file could not be opened.')

export function ImageViewer({ a, onClose }: { a: Attachment; onClose: () => void }) {
  const [image, setImage] = useState<{ file: File; src: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    let src = ''
    let live = true
    imageFile(a).then((file) => { if (live) { src = URL.createObjectURL(file); setImage({ file, src }) } })
      .catch((err) => { if (live) setError(failed(err)) })
    return () => { live = false; if (src) URL.revokeObjectURL(src) }
  }, [a])
  // Save (D4): the system share sheet, which offers Save Image and Save to Files, called
  // within the tap with bytes already here; a web view without it saves as before.
  async function save() {
    const files = image ? [image.file] : []
    if (files.length && navigator.canShare?.({ files })) {
      try { await navigator.share({ files }) } catch (err) {
        if ((err as Error)?.name !== 'AbortError') setError(t('This file could not be opened.'))
      }
      return
    }
    try { await openAttachment(a, { download: true }) } catch (err) { setError(failed(err)) }
  }
  return (
    <Dialog title={a.name} onClose={onClose} size="xl" testId="image-viewer"
      actions={<Button variant="secondary" icon="download" disabled={!image} onClick={() => void save()}>{t('Save')}</Button>}>
      {error ? <p role="alert" className="text-meta text-danger">{error}</p>
        : image && <img src={image.src} alt={a.name} className="mx-auto max-h-[70dvh] w-auto max-w-full object-contain" />}
    </Dialog>
  )
}
