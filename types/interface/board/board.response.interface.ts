export interface IBoardListRes {
  seq: number;
  title: string;
  writerName: string;
  createdAt: Date;
}

export interface IBoardDetailRes {
  seq: number;
  title: string;
  content: string;
  createdAt: Date;
  email: string;
  name: string;
}

export interface IBoardCreateRes {
  seq: number;
  title: string;
  content: string;
  writer: string;
  createdAt: Date;
}
