import { AxiosConfig } from '@/commons/api';
import { IAuthFindPassword, IAuthSignUp } from '@/types/interface/auth';
import { AxiosResponse } from 'axios';
import { ResponseConfig } from '@/types/interface/dto/response.config';

export class AuthApi extends AxiosConfig {
  static _baseUrl = `${process.env.NEXT_PUBLIC_GLOBAL_PREFIX}/auth`;

  static async signIn<T, D>(data: D) {
    const response: AxiosResponse<ResponseConfig<T>, D> | undefined = await AxiosConfig.post({
      url: `${this._baseUrl}/sign-in`,
      data,
    });

    if (!response) {
      return null;
    }

    const token: string = response.headers['authorization'];

    AxiosConfig.setAuthorizationHeader(token);

    return response.data.data;
  }

  static async signUp(data: IAuthSignUp) {
    try {
      // return await AxiosConfig.post(`${this._baseUrl}/sign-up`, data);
      return await AxiosConfig.post({
        url: `${this._baseUrl}/sign-up`,
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  static async findPassword(data: IAuthFindPassword) {
    try {
      return await AxiosConfig.patch(`${this._baseUrl}/change-password`, data);
    } catch (error) {
      throw error;
    }
  }
}
