import { useMutation } from 'react-query';
import { IBoardCreateReq, IBoardCreateRes } from '@/types/interface/board';
import { BoardApi } from '@/commons/api/board/board.api';
import { useRouter } from 'next/navigation';

export default function useBoardMutation() {
  const router = useRouter();

  const onBoardCreateMutation = useMutation({
    mutationFn: (data: IBoardCreateReq) => BoardApi.boardCreate<IBoardCreateRes, IBoardCreateReq>(data),
    onSuccess: (res) => {
      router.push('/board');
    },
    onError: (error) => {},
  });

  return {
    onBoardCreateMutation,
  };
}
