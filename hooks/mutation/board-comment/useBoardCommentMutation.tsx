import { useMutation, useQueryClient } from 'react-query';
import { IBoardCommentCreateReq, IBoardCommentDeleteReq, MutationError, MutationResponse } from '@/types/interface';
import { BoardCommentApi } from '@/api/board-comment';

export default function useBoardCommentMutation() {
  const queryClient = useQueryClient();

  const onBoardCommentCreateMutation = useMutation<MutationResponse<null>, MutationError, IBoardCommentCreateReq>({
    mutationFn: (data) => BoardCommentApi.boardCommentCreate(data),
    onSuccess: async (_, variables) => {
      const { board_seq } = variables;

      await queryClient.invalidateQueries(['boardCommentList', board_seq]);
    },
  });

  const onBoardCommentDeleteMutation = useMutation<MutationResponse<null>, MutationError, IBoardCommentDeleteReq>({
    mutationFn: ({ board_seq, comment_seq }: IBoardCommentDeleteReq) => BoardCommentApi.boardCommentDelete(comment_seq),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries(['boardCommentList', variables.board_seq]);
    },
  });

  return {
    onBoardCommentCreateMutation,
    onBoardCommentDeleteMutation,
  };
}
