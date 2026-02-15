'use client'

import { useDraftModeEnvironment } from 'next-sanity/hooks'

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment()

  // Only show the disable button when in live preview mode
  // Don't show when in Presentation Tool (it has its own UI)
  if (environment !== 'live' && environment !== 'unknown') return null

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg hover:bg-primary/90 transition-colors z-50"
    >
      Disable Preview Mode
    </a>
  )
}
