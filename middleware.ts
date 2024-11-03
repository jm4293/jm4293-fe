// 미들웨어의 역할
// 미들웨어는 클라이언트의 요청을 가로채고, 필요에 따라 요청이나 응답을 수정하거나 리다이렉션 할 수 있는 기능을 제공합니다.
// 미들웨어는 주로 인증이나 권한 검사, 요청 기록, 리다이렉트 등의 작업에 사용됩니다.

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/verify';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  const renewNextResponse = NextResponse.next();
  const cookieStore = cookies();

  const accessToken = cookieStore.get('accessToken')?.value || '';
  const refreshToken = cookieStore.get('refreshToken')?.value || '';

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/auth?expired=true', req.url));
  }

  const verifyAccessToken = await verifyToken(accessToken);
  const verifyRefreshToken = await verifyToken(refreshToken);

  if (!verifyRefreshToken) {
    return NextResponse.redirect(new URL('/auth?expired=true', req.url));
  }

  if (!verifyAccessToken && verifyRefreshToken) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/${process.env.NEXT_PUBLIC_GLOBAL_PREFIX}/auth/refresh-token`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        },
      );

      const responseData = await response.json();

      const renewAccessToken = responseData.data.accessToken;

      renewNextResponse.cookies.set('accessToken', renewAccessToken, { httpOnly: true, maxAge: 5 });
    } catch (error) {
      console.error('refresh token error', error);
    }
  }

  return renewNextResponse;
}

export const config = {
  matcher: ['/', '/board/:path*'],
};
