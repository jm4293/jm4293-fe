// 1. 미들웨어의 역할
//
// 	•	미들웨어는 클라이언트의 요청을 가로채고, 필요에 따라 요청이나 응답을 수정하거나 리다이렉션 할 수 있는 기능을 제공합니다.
// 	•	미들웨어는 주로 인증이나 권한 검사, 요청 기록, 리다이렉트 등의 작업에 사용됩니다.

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// async function getNewAccessToken(refreshToken: string) {
//   const res = await fetch(`${process.env.AUTH_URL}/refresh`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${refreshToken}`,
//     },
//   });
//
//   if (!res.ok) throw new Error('Failed to refresh token');
//
//   const data = await res.json();
//   return data.accessToken;
// }

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  const cookieStore = cookies();

  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  if (!accessToken) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  // if (!accessToken && refreshToken) {
  //   try {
  //     accessToken = await getNewAccessToken(refreshToken.value);
  //     cookieStore.set('accessToken', String(accessToken));
  //   } catch (error) {
  //     return NextResponse.redirect(new URL('/auth', req.url));
  //   }
  // }

  // response.headers.set('Authorization', `Bearer ${accessToken.value}`);

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/board-list'],
};
