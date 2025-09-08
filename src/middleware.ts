import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  // TEMPORARIAMENTE DESABILITADO - só permitir tudo passar
  console.log(`Middleware: ${req.nextUrl.pathname} - PERMITINDO TUDO`)
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}