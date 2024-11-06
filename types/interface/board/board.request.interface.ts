export interface IBoardCreateReq {
  title: string;
  content: string;
}

export interface IBoardModifyReq {
  boardSeq: number;
  title: string;
  content: string;
}

export interface IBoardDeleteReq {
  seq: number;
}
