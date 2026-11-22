// The image viewer of a phone shell (OpenSpec change attachment-viewer): the shell has no
// tabs, and saving a photo is not looking at it, so an image attachment opens here.
import { useEffect, useState } from 'react'
import { AttachmentError } from '../../lib/attachments'
import { imageSource, openAttachment } from '../../lib/attachmentOpen'
import { t } from '../../lib/i18n'
import type { Attachment } from '../../lib/types'
import { Button, Dialog } from '../../ui'

export function ImageViewer({ a, onClose }: { a: Attachment; onClose: () => void }) {
  const [src, setSrc] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    let release = () => {}
    let live = true
    imageSource(a).then((s) => { if (live) { release = s.release; setSrc(s.src) } else s.release() })
      .catch((err) => { if (live) setError(err instanceof AttachmentError ? err.message : t('This file could not be opened.')) })
    return () => { live = false; release() }
  }, [a])
  async function save() {
    try { await openAttachment(a, { download: true }) } catch (err) {
      setError(err instanceof AttachmentError ? err.message : t('This file could not be opened.'))
    }
  }
  return (
    <Dialog title={a.name} onClose={onClose} size="xl" testId="image-viewer"
      actions={<Button variant="secondary" icon="download" onClick={() => void save()}>{t('Download')}</Button>}>
      {error ? <p role="alert" className="text-meta text-danger">{error}</p>
        : src && <img src={src} alt={a.name} onError={() => setError(t('This file could not be opened.'))} className="mx-auto max-h-[70dvh] w-auto max-w-full object-contain" />}
    </Dialog>
  )
}
