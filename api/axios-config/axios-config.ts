import axios, { AxiosResponse } from 'axios';

interface IRequest {
  method: string;
  url: string;
  params?: number;
  queryString?: Record<string, string | number>;
  data?: unknown;
  headers: {};
}

interface IGetRequest {
  url: string;
  params?: number;
  queryString?: Record<string, string | number>;
  headers?: {};
}

interface IPostRequest {
  url: string;
  data: unknown;
  headers?: {};
}

interface IPutRequest {
  url: string;
  params?: number;
  data: unknown;
  headers?: Record<string, string>;
}

interface IDeleteRequest {
  url: string;
  params: number;
  headers?: Record<string, string>;
}

interface IPatchRequest {
  url: string;
  params?: number;
  data: unknown;
  headers?: Record<string, string>;
}

export class AxiosConfig {
  private static _axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}`,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  private static async _request({ method, url, params, queryString, data, headers }: IRequest) {
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

  static async get({ url, params, queryString, headers = {} }: IGetRequest) {
    return await this._request({ method: 'get', url, params, headers });
  }

  static async post({ url, data, headers = {} }: IPostRequest) {
    return await this._request({ method: 'post', url, data, headers });
  }

  static async put({ url, params, data, headers = {} }: IPutRequest) {
    return await this._request({ method: 'put', url, data, headers });
  }

  static async delete({ url, params, headers = {} }: IDeleteRequest) {
    return await this._request({ method: 'delete', url: `${url}/${params}`, headers });
  }

  static async patch({ url, params, data, headers = {} }: IPatchRequest) {
    return await this._request({ method: 'patch', url, data, headers });
  }

  static setAuthorizationHeader(token: string) {
    this._axiosInstance.defaults.headers.common['Authorization'] = `${token}`;
  }

  static setEmailCookie(email: string) {
    document.cookie = `EMAIL=${email}; path=/; max-age=300`;
  }
}
