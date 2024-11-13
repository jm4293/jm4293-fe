// 미들웨어의 역할
// 미들웨어는 클라이언트의 요청을 가로채고, 필요에 따라 요청이나 응답을 수정하거나 리다이렉션 할 수 있는 기능을 제공합니다.
// 미들웨어는 주로 인증이나 권한 검사, 요청 기록, 리다이렉트 등의 작업에 사용됩니다.

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/verify';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. 루트로 요청시 로그인 페이지로 이동
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  const renewNextResponse = NextResponse.next();
  const cookieStore = cookies();

  const refreshToken = cookieStore.get('refreshToken')?.value;

  // 2. refreshToken이 없을 경우 로그인 페이지로 이동
  if (!refreshToken) {
    return NextResponse.redirect(new URL('/auth?expired=2', req.url));
  }

  const verifyRefreshToken = await verifyToken(refreshToken);

  // 3. refreshToken이 유효하지 않을 경우 로그인 페이지로 이동
  if (!verifyRefreshToken) {
    return NextResponse.redirect(new URL('/auth?expired=3', req.url));
  }

  let accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/${process.env.NEXT_PUBLIC_GLOBAL_PREFIX}/auth/refresh-token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
        credentials: 'include',
      },
    );

    // 4. refreshToken으로 accessToken 재발급 실패시 로그인 페이지로 이동
    if (!response.ok) {
      return NextResponse.redirect(new URL('/auth?expired=4', req.url));
    }

    const responseData = await response.json();

    const renewAccessToken = responseData.data.accessToken;

    renewNextResponse.cookies.set('accessToken', renewAccessToken, { httpOnly: true, maxAge: 5 });
  }

  return renewNextResponse;
}

export const config = {
  matcher: ['/', '/board/:path*', '/chatting'],
};
