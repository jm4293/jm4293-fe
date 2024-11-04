export interface IBoardCommentCreateReq {
  content: string;
  board_seq: number;
}

export interface IBoardCommentDeleteReq {
  board_seq: number;
  comment_seq: number;
}
