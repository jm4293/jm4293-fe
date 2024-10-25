// import { NextRequest, NextResponse } from 'next/server';
//
// export function middleware(req: NextRequest) {
//   if (req.nextUrl.pathname === '/') {
//     return NextResponse.redirect(new URL('/auth', req.url));
//   }
//
//   return NextResponse.next();
// }
//
// export const config = {
//   matcher: '/',
// };

import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // if (req.nextUrl.pathname === '/') {
  //   return NextResponse.redirect(new URL('/auth', req.url));
  // }

  console.log('111req', req);
  const token = req.cookies.get('token');

  console.log('222token', token);

  if (!token) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  const response = NextResponse.next();
  response.headers.set('Authorization', `Bearer ${token}`);

  return response;
}

export const config = {
  matcher: '/',
};
