import { IBoardCreateReq, IBoardDeleteReq, IBoardModifyReq } from '@/types/interface';
import { AxiosConfig } from '@/commons/axios-config';

export class BoardApi extends AxiosConfig {
  static _baseUrl = '/board';

  static async boardDetail(params: number) {
    return await AxiosConfig.get({ url: `${this._baseUrl}/board-detail/${params}` });
  }

  static async boardCreate(data: IBoardCreateReq) {
    return await AxiosConfig.post({ url: `${this._baseUrl}/board-create`, data });
  }

  static async boardModify(data: IBoardModifyReq) {
    return await AxiosConfig.patch({ url: `${this._baseUrl}/board-modify`, data });
  }

  static async boardDelete(params: IBoardDeleteReq) {
    return await AxiosConfig.delete({ url: `${this._baseUrl}/board-delete/${params.boardSeq}` });
  }
}
