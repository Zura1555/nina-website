import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /studio routes
  if (!pathname.startsWith('/studio')) {
    return NextResponse.next()
  }

  // Sanity Studio has its own built-in authentication system
  // Users must be logged into their Sanity account to access the studio
  // The studio will redirect to Sanity's login if not authenticated

  // Optional: Add custom authentication here if needed
  // For example, you could check for a session cookie:
  // const session = request.cookies.get('auth-session')
  // if (!session) {
  //   const loginUrl = new URL('/login', request.url)
  //   loginUrl.searchParams.set('redirect', pathname)
  //   return NextResponse.redirect(loginUrl)
  // }

  // For now, we allow access and let Sanity handle authentication
  return NextResponse.next()
}

export const config = {
  matcher: '/studio/:path*',
}
