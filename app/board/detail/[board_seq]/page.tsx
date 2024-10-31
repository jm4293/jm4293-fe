import { cookies } from 'next/headers';
import ButtonRouterBack from '@/components/button/ButtonRouterBack';
import ButtonDetailModify from '@/app/board/detail/[board_seq]/_components/ButtonDetailModify';
import BoardComment from '@/app/board/detail/[board_seq]/comment/board-comment';
import ButtonDetailDelete from '@/app/board/detail/[board_seq]/_components/ButtonDetailDelete';

interface IProps {
  params: {
    board_seq: string;
  };
}

export default async function BoardDetailPage({ params }: IProps) {
  const email = cookies().get('EMAIL');
  const token = cookies().get('accessToken');

  const { board_seq } = params;

  const boardRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/${process.env.NEXT_PUBLIC_GLOBAL_PREFIX}/board/board-detail/${board_seq}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: `accessToken=${token?.value}`,
      },
    },
  );

  const { data: board } = await boardRes.json();

  return (
    <>
      <div className="container">
        <div className="flex justify-between items-center mb-4">
          <h1 className="mx-auto">게시글</h1>
        </div>

        <div className="input-group">
          <p>작성자</p>
          <p>{board.name}</p>
        </div>
        <div className="input-group">
          <p>제목</p>
          <p>{board.title}</p>
        </div>
        <div className="input-group">
          <p>내용</p>
          <p>{board.content}</p>
        </div>

        <div className="flex gap-4">
          <ButtonRouterBack />
          {email?.value === board.email && <ButtonDetailModify board_seq={board_seq} />}
          {email?.value === board.email && <ButtonDetailDelete board_seq={board_seq} />}
        </div>
      </div>

      <div className="container">
        <div className="flex flex-col">
          <h1 className="mx-auto">댓글</h1>

          <BoardComment board_seq={board_seq} />
        </div>
      </div>
    </>
  );
}
