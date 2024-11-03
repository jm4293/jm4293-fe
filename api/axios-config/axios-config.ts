import axios from 'axios';

interface IRequest {
  method: string;
  url: string;
  params: Record<string, string | number> | null;
  data: unknown | null;
  headers: {};
}

interface IGetRequest {
  url: string;
  params?: Record<string, string | number>;
  headers?: {};
}

interface IPostRequest {
  url: string;
  data: unknown;
  headers?: {};
}

interface IPutRequest {
  url: string;
  data: unknown;
  headers?: {};
}

interface IDeleteRequest {
  url: string;
  headers?: {};
}

interface IPatchRequest {
  url: string;
  data: unknown;
  headers?: {};
}

export class AxiosConfig {
  private static _axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}`,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  private static async _request({ method, url, params, data, headers }: IRequest) {
    try {
      return await this._axiosInstance.request({ method, url, data, params, headers });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        switch (error.response?.status) {
          case 400:
            break;
          case 401:
            break;
          case 404:
            break;
          case 500:
            break;
          default:
            break;
        }
      }

      throw error;
    }
  }

  static async get({ url, params = {}, headers = {} }: IGetRequest) {
    return await this._request({ method: 'get', url, params, data: null, headers });
  }

  static async post({ url, data, headers = {} }: IPostRequest) {
    return await this._request({ method: 'post', url, params: null, data, headers });
  }

  static async put({ url, data, headers = {} }: IPutRequest) {
    return await this._request({ method: 'put', url, params: null, data, headers });
  }

  static async delete({ url, headers = {} }: IDeleteRequest) {
    return await this._request({ method: 'delete', url, params: null, data: null, headers });
  }

  static async patch({ url, data, headers = {} }: IPatchRequest) {
    return await this._request({ method: 'patch', url, params: null, data, headers });
  }

  static setAuthorizationHeader(token: string) {
    this._axiosInstance.defaults.headers.common['Authorization'] = `${token}`;
  }

  static setEmailCookie(email: string) {
    document.cookie = `EMAIL=${email}; path=/; max-age=300`;
  }
}
