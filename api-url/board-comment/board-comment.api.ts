import { IBoardCommentCreateReq } from '@/types/interface';
import { AxiosConfig } from '@/commons/axios-config';

export class BoardCommentApi extends AxiosConfig {
  static _baseUrl = `${process.env.NEXT_PUBLIC_GLOBAL_PREFIX}/board-comment`;

  static async boardCommentList(params: number) {
    return await AxiosConfig.get({ url: `${this._baseUrl}/board-comment-list/${params}` });
  }

  static async boardCommentCreate(data: IBoardCommentCreateReq) {
    return await AxiosConfig.post({ url: `${this._baseUrl}/board-comment-create`, data });
  }

  static async boardCommentDelete(params: number) {
    return await AxiosConfig.delete({ url: `${this._baseUrl}/board-comment-delete/${params}` });
  }
}
