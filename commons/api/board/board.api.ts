import { AxiosConfig } from '@/commons/api';

export class BoardApi extends AxiosConfig {
  static _baseUrl = `${process.env.NEXT_PUBLIC_GLOBAL_PREFIX}/board`;

  static async boardCreate<T, D>(data: D) {
    try {
      return await AxiosConfig.post<T, D>({
        url: `${this._baseUrl}/board-create`,
        data,
      });
    } catch (error) {
      throw error;
    }
  }
}