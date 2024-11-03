import {
  IAuthChangePasswordReq,
  IAuthFindEmailReq,
  IAuthSignInReq,
  IAuthSignUpReq,
  IAuthVerifyEmailReq,
} from '@/types/interface/auth';
import { AxiosConfig } from '@/api/axios-config';

export class AuthApi extends AxiosConfig {
  static _baseUrl = `${process.env.NEXT_PUBLIC_GLOBAL_PREFIX}/auth`;

  static async signIn(data: IAuthSignInReq) {
    return await AxiosConfig.post({ url: `${this._baseUrl}/sign-in`, data });
  }

  static async signUp(data: IAuthSignUpReq) {
    return await AxiosConfig.post({ url: `${this._baseUrl}/sign-up`, data });
  }

  static async verifyEmail(data: IAuthVerifyEmailReq) {
    return await AxiosConfig.post({ url: `${this._baseUrl}/verify-id`, data });
  }

  static async changePassword(data: IAuthChangePasswordReq) {
    return await AxiosConfig.patch({ url: `${this._baseUrl}/change-password`, data });
  }

  static async findEmail(data: IAuthFindEmailReq) {
    return await AxiosConfig.post({ url: `${this._baseUrl}/find-email`, data });
  }
}
