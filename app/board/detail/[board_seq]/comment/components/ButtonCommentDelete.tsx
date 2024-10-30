'use client';

import useBoardCommentMutation from '@/hooks/mutation/board-comment/useBoardCommentMutation';

interface IProps {
  board_seq: string;
  comment_seq: string;
}

export default function ButtonCommentDelete({ board_seq, comment_seq }: IProps) {
  const { onBoardCommentDeleteMutation } = useBoardCommentMutation();

  const onDeleteHandle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    onBoardCommentDeleteMutation.mutate({ board_seq: Number(board_seq), comment_seq: Number(comment_seq) });
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
