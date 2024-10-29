import { AxiosConfig } from '@/commons/api';
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
      return undefined;
    }

    return response.data.data;
  }

  static async signUp<T, D>(data: D) {
    const response: AxiosResponse<ResponseConfig<T>, D> | undefined = await AxiosConfig.post({
      url: `${this._baseUrl}/sign-up`,
      data,
    });

    if (!!response) {
      return response.data.data;
    }
  }

  static async verifyEmail<T, D>(data: D) {
    const response: AxiosResponse<ResponseConfig<T>, D> | undefined = await AxiosConfig.post({
      url: `${this._baseUrl}/verify-id`,
      data,
    });

    return !!response;
  }

  static async findEmail<T, D>(data: D) {
    const response: AxiosResponse<ResponseConfig<T>, D> | undefined = await AxiosConfig.post({
      url: `${this._baseUrl}/find-email`,
      data,
    });

    if (!!response) {
      return response.data.data;
    }
  }

  static async changePassword<T, D>(data: D) {
    const response: AxiosResponse<ResponseConfig<T>, D> | undefined = await AxiosConfig.patch({
      url: `${this._baseUrl}/change-password`,
      data,
    });

    return !!response;
  }
}
