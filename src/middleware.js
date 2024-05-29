import { NextResponse } from 'next/server';

export function middleware(request) {
  let token = request.cookies.get('token')?.value;
  const url = request.nextUrl.clone();
  const path = request.nextUrl.pathname;
  if (!token && path!= '/auth/login') {
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }
}

/**
 * Add action middlware paths here to access with validation
 */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|layout/|themes/).*)'],
};

