import { jwtVerify } from 'jose';

export async function verifyToken(token: string) {
  try {
    const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET_KEY);

    if (!secretKey) {
      console.error('JWT_SECRET_KEY is not defined.');
      return null;
    }

    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}
