import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { IBoardCreateReq, IBoardCreateRes, ResponseConfig } from '@/types/interface';
import { BoardApi } from '@/api';

export default function useBoardMutation() {
  const router = useRouter();

  const onBoardCreateMutation = useMutation({
    mutationFn: (data: IBoardCreateReq) => BoardApi.boardCreate<IBoardCreateRes, IBoardCreateReq>(data),
    onSuccess: (res) => {
      router.push('/board');
    },
    onError: (error) => {},
  });

  const onBoardDeleteMutation = useMutation({
    mutationFn: (seq: number) => BoardApi.boardDelete<ResponseConfig<boolean>>(seq),
    onSuccess: (res) => {
      router.back();
      alert('삭제되었습니다.');
    },
    onError: (error) => {},
  });

  return {
    onBoardCreateMutation,
    onBoardDeleteMutation,
  };
}
