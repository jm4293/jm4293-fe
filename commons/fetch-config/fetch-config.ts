import { ResponseConfig } from '@/types/interface';

interface IRequest {
  method: string;
  url: string;
  params?: number;
  queryString?: Record<string, string | number>;
  body?: unknown;
  headers?: Record<string, string>;
}

interface IGetRequest {
  url: string;
  params?: number;
  queryString?: Record<string, string | number>;
  headers?: Record<string, string>;
}

interface IPostRequest {
  url: string;
  body: unknown;
  headers?: Record<string, string>;
}

interface IPutRequest {
  url: string;
  params?: number;
  body: unknown;
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
  body: unknown;
  headers?: Record<string, string>;
}

export class FetchConfig {
  private static _baseURL = `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/${process.env.NEXT_PUBLIC_GLOBAL_PREFIX}`;
  private static _headers: Record<string, string> = { 'Content-Type': 'application/json' };

  private static async _request<T>({
    method,
    url,
    params,
    queryString,
    body,
    headers,
  }: IRequest): Promise<ResponseConfig<T>> {
    let fullUrlPath = `${this._baseURL}${url}`;

    if (params) {
      fullUrlPath += `/${params}`;
    }

    const fullUrl = new URL(fullUrlPath);

    if (queryString) {
      Object.entries(queryString).forEach(([key, value]) => fullUrl.searchParams.append(key, String(value)));
    }

    const options: RequestInit = {
      method,
      headers: {
        ...this._headers,
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
    };

    try {
      const response = await fetch(fullUrl.toString(), options);

      return await response.json();
    } catch (error) {
      console.error('fetch 호출 중 에러 발생', error);
      throw error;
    }
  }

  static async get<T>({ url, params, queryString, headers = {} }: IGetRequest): Promise<ResponseConfig<T>> {
    return await this._request<T>({ method: 'GET', url, params, queryString, headers });
  }

  static async post<T>({ url, body, headers = {} }: IPostRequest): Promise<ResponseConfig<T>> {
    return await this._request<T>({ method: 'POST', url, body, headers });
  }

  static async put<T>({ url, params, body, headers = {} }: IPutRequest): Promise<ResponseConfig<T>> {
    return await this._request<T>({ method: 'PUT', url, params, body, headers });
  }

  static async delete<T>({ url, params, headers = {} }: IDeleteRequest): Promise<ResponseConfig<T>> {
    return await this._request<T>({ method: 'DELETE', url, params, headers });
  }

  static async patch<T>({ url, params, body, headers = {} }: IPatchRequest): Promise<ResponseConfig<T>> {
    return await this._request<T>({ method: 'PATCH', url, params, body, headers });
  }
}
