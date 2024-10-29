import { useMutation } from 'react-query';
import { IBoardCommentCreateReq } from '@/types/interface/board-comment';
import { BoardCommentApi } from '@/commons/api/board-comment/board-comment.api';

export default function useBoardCommentMutation() {
  const onBoardCommentCreateMutation = useMutation({
    mutationFn: (data: IBoardCommentCreateReq) =>
      BoardCommentApi.boardCommentCreate<unknown, IBoardCommentCreateReq>(data),
  });

  return {
    onBoardCommentCreateMutation,
  };
}
