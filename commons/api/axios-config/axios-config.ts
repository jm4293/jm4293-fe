import axios, { AxiosResponse } from 'axios';

interface IRequest {
  method: string;
  url: string;
  data: unknown | null;
  params: number | null;
  headers: {};
}

interface IPostRequest {
  url: string;
  data: unknown;
  headers?: {};
}

interface IPatchRequest {
  url: string;
  data: unknown;
  headers?: {};
}

export class AxiosConfig {
  static axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}`,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  private static async request({ method, url, data, params, headers }: IRequest) {
    try {
      return await this.axiosInstance.request({ method, url, data, params, headers });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const { message } = error.response?.data || '알 수 없는 오류입니다.';

        switch (error.response?.status) {
          case 400:
            alert(message);
            break;
          case 401:
            alert('로그인이 필요합니다.');
            window.location.href = '/';
            break;
          case 404:
            alert('찾을 수 없는 요청입니다.');
            break;
          case 500:
            alert('서버 오류입니다.');
            break;
          default:
            alert(message);
            break;
        }
      }

      // return undefined;
      throw error;
    }
  }

  static async get(url: string, params: number, headers = {}) {
    return await AxiosConfig.request({ method: 'get', url, data: null, params, headers });
  }

  static async post<T, D>({ url, data, headers = {} }: IPostRequest): Promise<AxiosResponse<T, D> | undefined> {
    // if (!!headers) {
    //   return await AxiosConfig.request({ method: 'post', url, data, params: null, headers });
    // } else {
    //   return await AxiosConfig.request({ method: 'post', url, data, params: null, headers });
    // }

    return await AxiosConfig.request({ method: 'post', url, data, params: null, headers });
  }

  static async put(url: string, data: unknown, headers = {}) {
    return await AxiosConfig.request({ method: 'put', url, data, params: null, headers });
  }

  static async delete(url: string, params: number, headers = {}) {
    return await AxiosConfig.request({ method: 'delete', url, data: null, params, headers });
  }

  static async patch<T, D>({ url, data, headers = {} }: IPatchRequest): Promise<AxiosResponse<T, D> | undefined> {
    return await AxiosConfig.request({ method: 'patch', url, data, params: null, headers });
  }

  static setAuthorizationHeader(token: string) {
    this.axiosInstance.defaults.headers.common['Authorization'] = `${token}`;
  }
}
