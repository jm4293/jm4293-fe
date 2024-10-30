import { useQuery } from 'react-query';
import { IBoardCommentsRes, ResponseConfig } from '@/types/interface';
import { BoardCommentApi } from '@/api/board-comment';

interface IProps {
  board_seq: number;
}

export default function useBoardCommentQuery({ board_seq }: IProps) {
  const { data: boardComments = [], isLoading: boardCommentIsLoading } = useQuery({
    queryKey: ['boardCommentList', board_seq],
    queryFn: () => BoardCommentApi.boardCommentList<ResponseConfig<IBoardCommentsRes[]>>(board_seq),
    enabled: !!board_seq,
    select: (response) => response?.data.data || [],
  });

  return {
    boardComments,
    boardCommentIsLoading,
  };
}
