import { useMutation, useQueryClient } from 'react-query';
import { IBoardCommentCreateReq, ResponseConfig } from '@/types/interface';
import { BoardCommentApi } from '@/api';

export default function useBoardCommentMutation() {
  const queryClient = useQueryClient();

  const onBoardCommentCreateMutation = useMutation({
    mutationFn: (data: IBoardCommentCreateReq) =>
      BoardCommentApi.boardCommentCreate<unknown, IBoardCommentCreateReq>(data),
    onSuccess: async (_, variables) => {
      const { board_seq } = variables;

      await queryClient.invalidateQueries(['boardCommentList', board_seq]);
    },
  });

  const onBoardCommentDeleteMutation = useMutation({
    mutationFn: ({ board_seq, comment_seq }: { board_seq: number; comment_seq: number }) =>
      BoardCommentApi.boardCommentDelete<ResponseConfig<boolean>>(comment_seq),
    onSuccess: async (_, variables) => {
      console.log('variables', variables);
      await queryClient.invalidateQueries(['boardCommentList', variables.board_seq]);
    },
  });

  return {
    onBoardCommentCreateMutation,
    onBoardCommentDeleteMutation,
  };
}
