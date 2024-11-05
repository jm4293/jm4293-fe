import { cookies } from 'next/headers';
import ButtonRouterBack from '@/components/button/ButtonRouterBack';
import ButtonDetailModify from '@/app/(main)/board/detail/[board_seq]/_components/ButtonDetailModify';
import BoardComment from '@/app/(main)/board/detail/[board_seq]/comment/board-comment';
import ButtonDetailDelete from '@/app/(main)/board/detail/[board_seq]/_components/ButtonDetailDelete';
import { FetchConfig } from '@/commons/fetch-config/fetch-config';
import { IBoardDetailRes } from '@/types/interface';
import { decodeToken } from '@/utils/verify';

interface IProps {
  params: {
    board_seq: string;
  };
}

export default async function BoardDetailPage({ params }: IProps) {
  const { board_seq } = params;

  const accessToken = cookies().get('accessToken');
  const decodeAccessToken = decodeToken(accessToken?.value || '');

  let boardDetail: IBoardDetailRes | null = null;

  try {
    const response = await FetchConfig.get<IBoardDetailRes>({
      url: `board/board-detail/${board_seq}`,
      headers: { Cookie: `accessToken=${accessToken?.value}` },
    });

    const { data, result, message } = response;

    boardDetail = data;
  } catch (error) {
    console.error('API 호출 중 에러 발생', error);
  }

  if (!boardDetail) {
    return;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h1 className="mx-auto">게시글</h1>
        <div className="flex flex-col gap-4">
          <div>
            <p>작성자</p>
            <p>{boardDetail.name}</p>
          </div>
          <div>
            <p>제목</p>
            <p>{boardDetail.title}</p>
          </div>
          <div>
            <p>내용</p>
            <p>{boardDetail.content}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <ButtonRouterBack url="/board" />
          {boardDetail.email === decodeAccessToken?.email && <ButtonDetailModify board_seq={board_seq} />}
          {boardDetail.email === decodeAccessToken?.email && <ButtonDetailDelete board_seq={board_seq} />}
        </div>
      </div>

      <div>
        <div className="flex flex-col">
          <h1 className="mx-auto">댓글</h1>
          <BoardComment board_seq={board_seq} email={String(decodeAccessToken?.email)} />
        </div>
      </div>
    </div>
  );
}
