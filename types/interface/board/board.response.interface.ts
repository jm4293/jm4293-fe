export interface IBoardListRes {
  seq: number;
  title: string;
  writerName: string;
  createdAt: Date;
}

export interface IBoardCreateRes {
  seq: number;
  title: string;
  content: string;
  writer: string;
  createdAt: Date;
}
