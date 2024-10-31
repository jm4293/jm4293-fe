'use client';

import useBoardMutation from '@/hooks/mutation/board/useBoardMutation';

interface IProps {
  board_seq: string;
}

export default function ButtonDetailDelete({ board_seq }: IProps) {
  const { onBoardDeleteMutation } = useBoardMutation();

  const onDeleteHandle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (confirm('정말 삭제하시겠습니까?')) {
      onBoardDeleteMutation.mutate(Number(board_seq));
    }
  };

  return (
    <button
      className="bg-red-400 hover:bg-red-500 disabled:bg-red-400"
      onClick={(e) => onDeleteHandle(e)}
      disabled={onBoardDeleteMutation.isLoading}>
      삭제
    </button>
  );
}
