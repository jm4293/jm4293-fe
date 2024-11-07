import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decodeToken } from '@/utils/verify';

export async function GET() {
  const accessToken = cookies().get('accessToken')?.value || '';

  const decodeAccessToken = decodeToken(accessToken);

  return NextResponse.json({
    data: { accessToken, ...decodeAccessToken },
  });
}
