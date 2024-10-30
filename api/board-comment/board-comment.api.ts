import { AxiosConfig } from '@/api/axios-config';

export class BoardCommentApi extends AxiosConfig {
  static _baseUrl = `${process.env.NEXT_PUBLIC_GLOBAL_PREFIX}/board-comment`;

  static async boardCommentList<T>(params: number) {
    try {
      return await AxiosConfig.get<T>({
        url: `${this._baseUrl}/board-comment-list`,
        params,
      });
    } catch (error) {
      throw error;
    }
  }

  static async boardCommentCreate<T, D>(data: D) {
    try {
      return await AxiosConfig.post<T, D>({
        url: `${this._baseUrl}/board-comment-create`,
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  static async boardCommentDelete<T>(params: number) {
    try {
      return await AxiosConfig.delete<T>({
        url: `${this._baseUrl}/board-comment-delete`,
        params,
      });
    } catch (error) {
      throw error;
    }
  }
}
