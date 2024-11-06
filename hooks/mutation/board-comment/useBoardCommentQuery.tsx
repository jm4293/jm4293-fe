import { useQuery } from 'react-query';
import { BoardCommentApi } from '@/api-url/board-comment';

interface IProps {
  boardSeq: number;
}

export default function useBoardCommentQuery({ boardSeq }: IProps) {
  return useQuery({
    queryKey: ['boardCommentList', boardSeq],
    queryFn: () => BoardCommentApi.boardCommentList(boardSeq),
    // enabled: !!boardSeq,
    select: (res) => res?.data.data || [],
  });
}
