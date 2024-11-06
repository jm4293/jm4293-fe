export interface IBoardCommentCreateReq {
  content: string;
  boardSeq: number;
}

export interface IBoardCommentDeleteReq {
  boardSeq: number;
  boardCommentSeq: number;
}
