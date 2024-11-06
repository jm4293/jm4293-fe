'use client';

import koLocaleDayjs from '@/utils/dayjs/koLocaleDayjs';
import { IBoardListRes } from '@/types/interface/board/board.response.interface';
import { useRouter } from 'next/navigation';

interface IProps {
  board: IBoardListRes;
}

export default function BoardList({ board }: IProps) {
  const router = useRouter();

  const onRowCLickHandler = (e: React.MouseEvent<HTMLLIElement>, boardSeq: number) => {
    e.preventDefault();

    router.push(`/board/detail/${boardSeq}`);
  };

  return (
    <li key={board.seq} onClick={(e) => onRowCLickHandler(e, board.seq)}>
      <div className="flex justify-between">
        <p>
          {board.seq}. {board.title}
        </p>
        <div className="flex gap-2">
          <p className="whitespace-nowrap">{board.writerName}</p>
          <p className="whitespace-nowrap">{koLocaleDayjs(board.createdAt).format('YYYY-MM-DD')}</p>
        </div>
      </div>
    </li>
  );
}
