import axios from 'axios';
import { AuthApi } from '@/api-url/auth';

export async function POST(request: Request) {
  const { code, state } = await request.json();

  const response = await axios.get(
    `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_OAUTH_NAVER_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_OAUTH_NAVER_CLIENT_SECRET}&code=${code}&state=${state}`,
  );

  const data = await response.data;

  const { access_token, refresh_token } = data;

  try {
    const responseToken = await AuthApi.oauthNaverToken({ accessToken: access_token, refreshToken: refresh_token });

    console.log('responseToken', responseToken);

    const result = responseToken.data;
    console.log('result', result);
  } catch (error) {
    console.error('Error:', error);
    throw '불가능';
  }
}
