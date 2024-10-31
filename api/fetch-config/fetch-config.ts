import { cookies } from 'next/headers';

export class FetchConfig {
  private apiURL = `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/${process.env.NEXT_PUBLIC_GLOBAL_PREFIX}`;
  private accessToken = cookies().get('accessToken')?.value;

  private buildUrl(endpoint: string, queryParams?: Record<string, string | number>) {
    const url = new URL(`${this.apiURL}/${endpoint}`);

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => url.searchParams.append(key, String(value)));
    }

    return url.toString();
  }

  private async request(
    method: string,
    endpoint: string,
    body?: Record<string, any>,
    queryParams?: Record<string, string | number>,
  ): Promise<any> {
    const url = this.buildUrl(endpoint, queryParams);

    const options: RequestInit = {
      method,
      headers: {
        Cookie: `accessToken=${this.accessToken}`,
        'Content-Type': 'application/json',
      },

      credentials: 'include',
    };

    try {
      const res = await fetch(url, options);

      if (!res.ok) {
        throw new Error(String(res.status));
      }

      const { data } = await res.json();

      return data;
    } catch (error) {
      switch (error) {
        case 400:
          alert('400');
          break;
        case 401:
          break;
        case 404:
          alert('404');
          break;
        case 500:
          alert('500');
          break;
        default:
          alert('default');
          break;
      }

      throw error;
    }
  }

  async get(endpoint: string, queryParams: Record<string, string | number> = {}) {
    return this.request('GET', endpoint, undefined, queryParams);
  }

  async post(endpoint: string, body: Record<string, any>) {
    return this.request('POST', endpoint, body);
  }

  // async patch(endpoint: string, body: Record<string, any>) {
  //   return this.request('PATCH', endpoint, body);
  // }

  // async put(endpoint: string, body: Record<string, any>) {
  //   return this.request('PUT', endpoint, body);
  // }
  //

  // async delete(endpoint: string, body?: Record<string, any>) {
  //   return this.request('DELETE', endpoint, body);
  // }
}
