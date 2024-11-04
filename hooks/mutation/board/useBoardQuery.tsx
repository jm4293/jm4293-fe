import { useQuery } from 'react-query';
import { BoardApi } from '@/api-url/board';

interface IProps {
  board_seq: number;
}

export default function useBoardQuery({ board_seq }: IProps) {
  return useQuery({
    queryKey: ['board', board_seq],
    queryFn: () => BoardApi.boardDetail(board_seq),
    select: (res) => res.data.data,
  });
}
