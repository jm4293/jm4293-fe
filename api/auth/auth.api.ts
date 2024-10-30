import { AxiosResponse } from 'axios';
import {
  IAuthChangePasswordReq,
  IAuthFindEmailReq,
  IAuthFindEmailRes,
  IAuthSignInReq,
  IAuthSignInRes,
  IAuthSignUpReq,
  IAuthSigUpRes,
  IAuthVerifyEmailReq,
} from '@/types/interface/auth';
import { ResponseConfig } from '@/types/interface';
import { AxiosConfig } from '@/api/axios-config';

export class AuthApi extends AxiosConfig {
  static _baseUrl = `${process.env.NEXT_PUBLIC_GLOBAL_PREFIX}/auth`;

  static async signIn(data: IAuthSignInReq) {
    try {
      const response: AxiosResponse<ResponseConfig<IAuthSignInRes>, IAuthSignInReq> | undefined =
        await AxiosConfig.post({ url: `${this._baseUrl}/sign-in`, data });

      if (!!response) {
        AxiosConfig.setEmailHeader(response.data.data.email);
        return response.data.data;
      }
    } catch (error) {
      throw error;
    }
  }

  static async signUp(data: IAuthSignUpReq) {
    const response: AxiosResponse<ResponseConfig<IAuthSigUpRes>, IAuthSignUpReq> | undefined = await AxiosConfig.post({
      url: `${this._baseUrl}/sign-up`,
      data,
    });

    if (!!response) {
      return response.data.data;
    }
  }

  static async verifyEmail(data: IAuthVerifyEmailReq) {
    const response: AxiosResponse<ResponseConfig<boolean>, IAuthVerifyEmailReq> | undefined = await AxiosConfig.post({
      url: `${this._baseUrl}/verify-id`,
      data,
    });

    return !!response;
  }

  static async changePassword(data: IAuthChangePasswordReq) {
    const response: AxiosResponse<ResponseConfig<boolean>, IAuthChangePasswordReq> | undefined =
      await AxiosConfig.patch({
        url: `${this._baseUrl}/change-password`,
        data,
      });

    return !!response;
  }

  static async findEmail(data: IAuthFindEmailReq) {
    const response: AxiosResponse<ResponseConfig<IAuthFindEmailRes>, IAuthFindEmailReq> | undefined =
      await AxiosConfig.post({
        url: `${this._baseUrl}/find-email`,
        data,
      });

    if (!!response) {
      return response.data.data;
    }
  }
}
