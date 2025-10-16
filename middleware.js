import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow login routes and static files
  const open = ['/login', '/api/login', '/favicon.ico'];
  if (open.includes(pathname) || pathname.startsWith('/_next') || pathname.startsWith('/assets') || pathname.startsWith('/public')) {
    return NextResponse.next();
  }

  const authed = req.cookies.get('passcode')?.value === 'ok';
  if (authed) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = '/login';
  url.searchParams.set('next', pathname);
  return NextResponse.redirect(url);
}

export const config = { matcher: ['/((?!_next|static).*)'] };