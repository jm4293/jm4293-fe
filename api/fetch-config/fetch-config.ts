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

  private static async _request({ method, url, params, queryString, body, headers }: IRequest) {
    let fullUrlPath = `${this._baseURL}/${url}`;

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
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
    };

    console.log('fetch url', fullUrl.toString());
    console.log('fetch headers', headers);

    try {
      const response = await fetch(fullUrl.toString(), options);

      // if (!response.ok) {
      //   throw new Error(String(response.status));
      // }

      // const result = await response.json();
      // return result.data || result;

      return await response.json();
    } catch (error: unknown) {
      // switch (error.message) {
      //   case '400':
      //     break;
      //   case '401':
      //     break;
      //   case '404':
      //     break;
      //   case '500':
      //     break;
      //   default:
      //     break;
      // }

      throw error;
    }
  }

  static async get<T>({ url, params, queryString, headers = {} }: IGetRequest): Promise<ResponseConfig<T>> {
    return await this._request({ method: 'GET', url, params, queryString, headers });
  }

  static async post<T>({ url, body, headers = {} }: IPostRequest): Promise<ResponseConfig<T>> {
    return await this._request({ method: 'POST', url, body, headers });
  }

  static async put<T>({ url, params, body, headers = {} }: IPutRequest): Promise<ResponseConfig<T>> {
    return await this._request({ method: 'PUT', url, params, body, headers });
  }

  static async delete<T>({ url, params, headers = {} }: IDeleteRequest): Promise<ResponseConfig<T>> {
    return await this._request({ method: 'DELETE', url, params, headers });
  }

  static async patch<T>({ url, params, body, headers = {} }: IPatchRequest): Promise<ResponseConfig<T>> {
    return await this._request({ method: 'PATCH', url, params, body, headers });
  }

  static setAuthorizationHeader(token: string) {
    document.cookie = `Authorization=${token}; path=/; max-age=300`;
  }
}
