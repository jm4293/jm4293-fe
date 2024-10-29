'use client';

import ButtonWithSpinner from '@/components/button/ButtonWithSpinner';
import { useState } from 'react';
import useBoardCommentMutation from '@/hooks/mutation/board-comment/useBoardCommentMutation';

interface IProps {
  board_seq: string;
}

export default function BoardCommentForm({ board_seq }: IProps) {
  const { onBoardCommentCreateMutation } = useBoardCommentMutation();

  const [content, setContent] = useState('');

  const onSubmitHandle = () => {
    if (!content) {
      return alert('댓글 내용을 입력해주세요.');
    }

    onBoardCommentCreateMutation.mutate({ board_seq: Number(board_seq), content });
  };

  return (
    <div className="flex flex-col gap-2">
      <textarea className="w-full resize-none" value={content} onChange={(e) => setContent(e.target.value)} />
      <ButtonWithSpinner type="button" text="등록" bgColor="blue" onClick={onSubmitHandle} />
    </div>
  );
}
