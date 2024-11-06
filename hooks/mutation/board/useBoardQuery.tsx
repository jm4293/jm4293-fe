import { useQuery } from 'react-query';
import { BoardApi } from '@/api-url/board';

interface IProps {
  boardSeq: number;
}

export default function useBoardQuery({ boardSeq }: IProps) {
  return useQuery({
    queryKey: ['board', boardSeq],
    queryFn: () => BoardApi.boardDetail(boardSeq),
    select: (res) => res.data.data,
  });
}
