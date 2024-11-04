'use client';

import dayjs from 'dayjs';
import useBoardCommentQuery from '@/hooks/mutation/board-comment/useBoardCommentQuery';
import { IBoardCommentsRes } from '@/types/interface/board-comment';
import { useState } from 'react';
import useBoardCommentMutation from '@/hooks/mutation/board-comment/useBoardCommentMutation';
import ButtonCommentDelete from '@/app/board/detail/[board_seq]/comment/_components/ButtonCommentDelete';
import ButtonWithSpinner from '@/components/button/ButtonWithSpinner';

interface IProps {
  board_seq: string;
  email: string;
}

export default function BoardComment({ board_seq, email }: IProps) {
  const onBoardCommentQuery = useBoardCommentQuery({ board_seq: Number(board_seq) });
  const { onBoardCommentCreateMutation } = useBoardCommentMutation();

  const [content, setContent] = useState('');

  const onSubmitHandle = () => {
    if (!content || content.trim().length === 0) {
      return alert('댓글 내용을 입력해주세요.');
    }

    onBoardCommentCreateMutation.mutate({ board_seq: Number(board_seq), content });
    setContent('');
  };

  if (!onBoardCommentQuery.isSuccess) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {onBoardCommentQuery.data.length > 0 ? (
        onBoardCommentQuery.data.map((comment: IBoardCommentsRes, index: number) => (
          <div key={comment.seq} className="flex justify-between">
            <div className="flex items-center gap-2">
              <p>{index + 1}.</p>
              <p>{comment.content}</p>
            </div>
            <div className="flex items-center gap-4">
              <p>{comment.name}</p>
              <p className="whitespace-nowrap">{dayjs(comment.createdAt).format('YYYY-MM-DD hh:mm')}</p>
              {email === comment.email && <ButtonCommentDelete comment_seq={comment.seq} board_seq={board_seq} />}
            </div>
          </div>
        ))
      ) : (
        <div>댓글이 없습니다.</div>
      )}

      <div className="flex flex-col gap-2">
        <textarea className="w-full resize-none" value={content} onChange={(e) => setContent(e.target.value)} />
        <ButtonWithSpinner
          type="button"
          text="등록"
          bgColor="blue"
          onClick={onSubmitHandle}
          disabled={onBoardCommentCreateMutation.isLoading}
        />
      </div>
    </div>
  );
}
