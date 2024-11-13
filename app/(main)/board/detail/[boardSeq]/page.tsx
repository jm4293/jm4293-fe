import { cookies } from 'next/headers';
import ButtonRouterBack from '@/components/button/ButtonRouterBack';
import ButtonDetailModify from '@/app/(main)/board/detail/[boardSeq]/_components/ButtonDetailModify';
import BoardComment from '@/app/(main)/board/detail/[boardSeq]/comment/board-comment';
import ButtonDetailDelete from '@/app/(main)/board/detail/[boardSeq]/_components/ButtonDetailDelete';
import { FetchConfig } from '@/commons/fetch-config/fetch-config';
import { IBoardDetailRes } from '@/types/interface';
import { decodeToken } from '@/utils/verify';

interface IProps {
  params: {
    boardSeq: string;
  };
}

export default async function BoardDetailPage({ params }: IProps) {
  const { boardSeq } = params;

  const accessToken = cookies().get('accessToken');
  const decodeAccessToken = decodeToken(accessToken?.value || '');

  let boardDetail: IBoardDetailRes | null = null;

  try {
    const response = await FetchConfig.get<IBoardDetailRes>({
      url: `/board/board-detail/${boardSeq}`,
    });

    const { data, result, message } = response;

    boardDetail = data;
  } catch (error) {
    console.error('API 호출 중 에러 발생', error);
  }

  console.log('boardDetailboardDetailboardDetail', boardDetail);

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
          {boardDetail.email === decodeAccessToken?.email && <ButtonDetailModify boardSeq={boardSeq} />}
          {boardDetail.email === decodeAccessToken?.email && <ButtonDetailDelete boardSeq={boardSeq} />}
        </div>
      </div>

      <div>
        <div className="flex flex-col">
          <h1 className="mx-auto">댓글</h1>
          <BoardComment boardSeq={boardSeq} email={String(decodeAccessToken?.email)} />
        </div>
      </div>
    </div>
  );
}
