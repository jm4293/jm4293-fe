import { useMutation, useQueryClient } from 'react-query';
import { IBoardCommentCreateReq, IBoardCommentDeleteReq, MutationError, MutationResponse } from '@/types/interface';
import { BoardCommentApi } from '@/api-url/board-comment';

export default function useBoardCommentMutation() {
  const queryClient = useQueryClient();

  const onBoardCommentCreateMutation = useMutation<MutationResponse<null>, MutationError, IBoardCommentCreateReq>({
    mutationFn: (data) => BoardCommentApi.boardCommentCreate(data),
    onSuccess: async (_, variables) => {
      const { boardSeq } = variables;

      await queryClient.invalidateQueries(['boardCommentList', boardSeq]);
    },
  });

  const onBoardCommentDeleteMutation = useMutation<MutationResponse<null>, MutationError, IBoardCommentDeleteReq>({
    mutationFn: ({ boardCommentSeq }: IBoardCommentDeleteReq) => BoardCommentApi.boardCommentDelete(boardCommentSeq),
    onSuccess: async (_, variables) => {
      const { boardSeq } = variables;

      await queryClient.invalidateQueries(['boardCommentList', boardSeq]);
    },
  });

  return {
    onBoardCommentCreateMutation,
    onBoardCommentDeleteMutation,
  };
}
