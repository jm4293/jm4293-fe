import { AxiosConfig } from '@/api';

export class BoardApi extends AxiosConfig {
  static _baseUrl = `${process.env.NEXT_PUBLIC_GLOBAL_PREFIX}/board`;

  static async boardCreate<T, D>(data: D) {
    try {
      return await AxiosConfig.post<T, D>({ url: `${this._baseUrl}/board-create`, data });
    } catch (error) {
      throw error;
    }
  }

  static async boardDelete<T>(params: number) {
    try {
      return await AxiosConfig.delete<T>({ url: `${this._baseUrl}/board-delete`, params });
    } catch (error) {
      throw error;
    }
  }
}
