import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const redirectTo = searchParams.get('redirectTo') || '/'
  
  // Enable draft mode
  ;(await draftMode()).enable()
  
  // Redirect to the preview page
  return NextResponse.redirect(new URL(redirectTo, request.url))
}
