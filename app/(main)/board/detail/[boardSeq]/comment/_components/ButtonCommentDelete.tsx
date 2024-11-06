'use client';

import useBoardCommentMutation from '@/hooks/mutation/board-comment/useBoardCommentMutation';

interface IProps {
  boardSeq: string;
  boardCommentSeq: string;
}

export default function ButtonCommentDelete({ boardSeq, boardCommentSeq }: IProps) {
  const { onBoardCommentDeleteMutation } = useBoardCommentMutation();

  const onDeleteHandle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    onBoardCommentDeleteMutation.mutate({ boardSeq: Number(boardSeq), boardCommentSeq: Number(boardCommentSeq) });
  };

  return (
    <button
      className="bg-red-400 hover:bg-red-500 disabled:bg-red-400"
      onClick={(e) => onDeleteHandle(e)}
      disabled={onBoardCommentDeleteMutation.isLoading}>
      삭제
    </button>
  );
}
