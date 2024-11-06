import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/navigation';
import { IBoardCreateReq, IBoardDeleteReq, IBoardModifyReq, MutationError, MutationResponse } from '@/types/interface';
import { BoardApi } from '@/api-url/board';

export default function useBoardMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const onBoardCreateMutation = useMutation<MutationResponse<null>, MutationError, IBoardCreateReq>({
    mutationFn: (data) => BoardApi.boardCreate(data),
    onSuccess: (res) => {
      router.replace('/board');
      router.refresh();
    },
  });

  const onBoardModifyMutation = useMutation<MutationResponse<null>, MutationError, IBoardModifyReq>({
    mutationFn: (data) => BoardApi.boardModify(data),
    onSuccess: async (res, variables) => {
      const { boardSeq } = variables;
      await queryClient.invalidateQueries(['board', boardSeq]);
      router.push(`/board/detail/${boardSeq}`);
      router.refresh();
    },
  });

  const onBoardDeleteMutation = useMutation<MutationResponse<null>, MutationError, IBoardDeleteReq>({
    mutationFn: ({ boardSeq }) => BoardApi.boardDelete({ boardSeq }),
    onSuccess: () => {
      router.replace('/board');
      router.refresh();
      alert('삭제되었습니다.');
    },
  });

  return {
    onBoardCreateMutation,
    onBoardModifyMutation,
    onBoardDeleteMutation,
  };
}
