import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hostname = request.headers.get('host')?.split(':')[0]?.toLowerCase()

  // Serve the standalone AffilixWP product page on its dedicated subdomain.
  if (hostname === 'affilixwp.beveeztech.com' && pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/affilixwp-landing'
    return NextResponse.rewrite(url)
  }

  if (pathname.startsWith('/admin') && !pathname.includes('/login')) {
    const token = request.cookies.get('admin_token')?.value

    if (token !== process.env.ADMIN_SECRET) {
      return NextResponse.redirect(
        new URL('/admin/login', request.url)
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
