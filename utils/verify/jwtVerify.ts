import { decodeJwt, jwtVerify } from 'jose';

export async function verifyToken(token: string) {
  try {
    const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET_KEY);

    if (!secretKey) {
      console.error('JWT_SECRET_KEY가 업습니다.');
      return null;
    }

    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (err) {
    console.error('토큰이 만료되었습니다.', err);
    return null;
  }
}

export function decodeToken(token: string) {
  try {
    return decodeJwt(token);
  } catch (err) {
    console.error('JWT 디코딩 실패:', err);
    return null;
  }
}
