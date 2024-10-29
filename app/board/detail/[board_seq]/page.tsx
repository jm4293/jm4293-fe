import { cookies } from 'next/headers';
import ButtonToList from '@/app/board/components/button/ButtonToList';
import ButtonModify from '@/app/board/detail/components/button/ButtonModify';
import dayjs from 'dayjs';
import BoardCommentForm from '@/app/board/components/comment/components/BoardCommentForm';

interface IProps {
  params: {
    board_seq: string;
  };
}

export default async function BoardDetailPage({ params }: IProps) {
  const token = cookies().get('accessToken');
  const { board_seq } = params;

  console.log('seqseqseqseqseqseq', board_seq);

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

  console.log('board', board);

  const boardCommentRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/${process.env.NEXT_PUBLIC_GLOBAL_PREFIX}/board-comment/board-comment-list/${board_seq}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: `accessToken=${token?.value}`,
      },
    },
  );
  const { data: boardComment } = await boardCommentRes.json();

  console.log('boardComment', boardComment);

  return (
    <>
      <div className="container">
        <div className="flex justify-between items-center mb-4">
          <h1 className="mx-auto">게시글</h1>
        </div>

        <div className="input-group">
          <label htmlFor="title">제목</label>
          <p>{board.title}</p>
        </div>
        <div className="input-group">
          <label htmlFor="content">내용</label>
          <p>{board.content}</p>
        </div>

        <div className="flex gap-4">
          <ButtonToList />
          <ButtonModify email={board.email} />
        </div>
      </div>

      <div className="container">
        <div className="flex justify-between items-center mb-4">
          <h1 className="mx-auto">댓글</h1>
        </div>

        <div className="flex flex-col gap-4">
          {boardComment.length > 0 ? (
            boardComment.map((comment: any) => (
              <div key={comment.seq} className="input-group">
                <label htmlFor="content">내용</label>
                <div className="flex justify-between">
                  <p>{comment.content}</p>
                  <div className="flex gap-4">
                    <p>{comment.name}</p>
                    <p>{dayjs(comment.createdAt).format('YYYY-MM-DD hh:mm')}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>댓글이 없습니다.</div>
          )}

          <BoardCommentForm board_seq={board_seq} />
        </div>
      </div>
    </>
  );
}
