import { AxiosConfig } from '@/commons/api';

export class BoardCommentApi extends AxiosConfig {
  static _baseUrl = `${process.env.NEXT_PUBLIC_GLOBAL_PREFIX}/board-comment`;

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
}
