import Pagination from '@/components/pagination/Pagination';
import { BOARD_ITEM_COUNT } from '@/constant';
import { IBoardListRes } from '@/types/interface/board/board.response.interface';
import BoardListHeader from '@/app/(main)/board/_components/board-list-header';
import BoardList from '@/app/(main)/board/_components/board-list-row';
import { FetchConfig } from '@/commons/fetch-config/fetch-config';

interface IProps {
  searchParams: {
    page: string;
  };
}

export default async function BoardListPage({ searchParams }: IProps) {
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  let boardList: IBoardListRes[] = [];
  let totalCount = 0;

  try {
    const response = await FetchConfig.get<{ list: IBoardListRes[]; totalCount: number }>({
      url: '/board/board-list',
      queryString: { page: currentPage, count: BOARD_ITEM_COUNT },
    });

    const { data, result, message } = response;

    boardList = data.list;
    totalCount = data.totalCount;
  } catch (error) {
    console.error('API 호출 중 에러 발생', error);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex justify-between items-center">
        <h1 className="mx-auto">게시판 리스트</h1>
        <BoardListHeader />
      </div>

      <ul>
        {boardList.length > 0 ? (
          boardList.map((board: IBoardListRes) => <BoardList key={board.seq} board={board} />)
        ) : (
          <li>게시글이 없습니다.</li>
        )}
      </ul>

      <Pagination {...{ totalCount: totalCount, currentPage }} />
    </div>
  );
}
