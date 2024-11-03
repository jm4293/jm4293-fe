import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({ message: 'sign-out' });

  response.cookies.set('accessToken', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  });

  response.cookies.set('refreshToken', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  });

  return response;
}
