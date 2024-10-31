import axios, { AxiosResponse } from 'axios';

interface IRequest {
  method: string;
  url: string;
  data?: unknown;
  params?: number;
  headers: {};
}

interface IGetRequest {
  url: string;
  params: number;
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
  params: number;
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

      throw error;
    }
  }

  static async get<T>({ url, params, headers = {} }: IGetRequest): Promise<AxiosResponse<T, number> | undefined> {
    return await AxiosConfig.request({ method: 'get', url: `${url}/${params}`, headers });
  }

  static async post<T, D>({ url, data, headers = {} }: IPostRequest): Promise<AxiosResponse<T, D> | undefined> {
    return await AxiosConfig.request({ method: 'post', url, data, headers });
  }

  static async put({ url, data, headers = {} }: IPutRequest) {
    return await AxiosConfig.request({ method: 'put', url, data, headers });
  }

  static async delete<T>({ url, params, headers = {} }: IDeleteRequest): Promise<AxiosResponse<T, number> | undefined> {
    return await AxiosConfig.request({ method: 'delete', url: `${url}/${params}`, headers });
  }

  static async patch<T, D>({ url, data, headers = {} }: IPatchRequest): Promise<AxiosResponse<T, D> | undefined> {
    return await AxiosConfig.request({ method: 'patch', url, data, headers });
  }

  static setAuthorizationHeader(token: string) {
    this.axiosInstance.defaults.headers.common['Authorization'] = `${token}`;
  }

  static setEmailCookie(email: string) {
    // this.axiosInstance.defaults.headers.common['EMAIL'] = `${email}`;
    document.cookie = `EMAIL=${email}; path=/; max-age=10`;
  }
}
