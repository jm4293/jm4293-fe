import { useQuery } from 'react-query';
import { BoardCommentApi } from '@/api-url/board-comment';

interface IProps {
  board_seq: number;
}

export default function useBoardCommentQuery({ board_seq }: IProps) {
  return useQuery({
    queryKey: ['boardCommentList', board_seq],
    queryFn: () => BoardCommentApi.boardCommentList(board_seq),
    // enabled: !!board_seq,
    select: (res) => res?.data.data || [],
  });
}
