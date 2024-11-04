export interface IBoardCreateReq {
  title: string;
  content: string;
}

export interface IBoardModifyReq {
  seq: number;
  title: string;
  content: string;
}

export interface IBoardDeleteReq {
  seq: number;
}
