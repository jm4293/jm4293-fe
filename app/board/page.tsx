import { cookies } from 'next/headers';
import Pagination from '@/components/pagination/Pagination';
import { BOARD_ITEM_COUNT } from '@/commons/constant';
import { IBoardListRes } from '@/types/interface/board/board.response.interface';
import BoardListHeader from '@/app/board/_components/board-list-header';
import BoardList from '@/app/board/_components/board-list-row';
import { FetchConfig } from '@/api/fetch-config/fetch-config';

interface IProps {
  searchParams: {
    page: string;
  };
}

const fetchConfig = new FetchConfig();

export default async function BoardListPage({ searchParams }: IProps) {
  const token = cookies().get('accessToken');

  console.log('board token', token);

  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  // try {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/${process.env.NEXT_PUBLIC_GLOBAL_PREFIX}/board/board-list?page=${currentPage}&count=${BOARD_ITEM_COUNT}`,
  //     {
  //       method: 'GET',
  //       credentials: 'include',
  //       headers: {
  //         Cookie: `accessToken=${token?.value}`,
  //       },
  //     },
  //   );
  //
  //   // 네트워크 에러가 없었는지 확인
  //   if (!res.ok) {
  //     throw new Error(`HTTP error! status: ${res.status}`);
  //   }
  //
  //   const { data } = await res.json();
  //
  //   // JSON 파싱 에러가 없었는지 확인
  //   if (!data) {
  //     throw new Error('API returned no data.');
  //   }
  //
  //   // 데이터 처리
  //   console.log(data);
  // } catch (error) {
  //   console.error('API 호출 중 에러 발생', error);
  // }

  const data = await fetchConfig.get('board/board-list', {
    page: currentPage,
    count: BOARD_ITEM_COUNT,
  });

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-4">
        <h1 className="mx-auto">게시판 리스트</h1>
        <BoardListHeader />
      </div>

      <ul>
        {!!data.list ? (
          data.list.map((board: IBoardListRes) => <BoardList key={board.seq} board={board} />)
        ) : (
          <li>게시글이 없습니다.</li>
        )}
      </ul>

      <Pagination {...{ totalCount: data.totalCount, currentPage }} />
    </div>
  );
}
