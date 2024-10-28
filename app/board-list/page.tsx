import { cookies } from 'next/headers';
import dayjs from 'dayjs';
import BoardListHeader from '@/app/board-list/components/board-list-header';
import Pagination from '@/components/pagination/Pagination';
import { BOARD_ITEM_COUNT } from '@/commons/constant';

interface IProps {
  searchParams: {
    page: string;
  };
}

export default async function BoardListPage({ searchParams }: IProps) {
  const token = cookies().get('accessToken');
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/${process.env.NEXT_PUBLIC_GLOBAL_PREFIX}/board/board-list?page=${currentPage}&count=${BOARD_ITEM_COUNT}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: `accessToken=${token?.value}`,
      },
    },
  );

  const { data } = await res.json();

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-4">
        <h1 className="mx-auto">게시판 리스트</h1>
        <BoardListHeader />
      </div>

      <ul>
        {!!data.list ? (
          data.list.map((board: any) => (
            <li key={board.id}>
              <div className="flex justify-between">
                <p>
                  {board.id}. {board.title}
                </p>
                <div className="flex gap-2">
                  <p>{board.writer}</p>
                  <p>{dayjs(board.createdAt).format('YYYY-MM-DD')}</p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li>게시글이 없습니다.</li>
        )}
      </ul>

      <Pagination {...{ totalCount: data.totalCount, currentPage }} />
    </div>
  );
}
