'use client';

import { FormEvent, useEffect, useState } from 'react';
import { IBoardCreateReq } from '@/types/interface/board';
import ButtonWithSpinner from '@/components/button/ButtonWithSpinner';
import ButtonRouterBack from '@/components/button/ButtonRouterBack';
import useBoardQuery from '@/hooks/query/board/useBoardQuery';
import useBoardMutation from '@/hooks/mutation/board/useBoardMutation';

interface IProps {
  params: {
    boardSeq: string;
  };
}

export default function BoardModifyPage({ params }: IProps) {
  const { boardSeq } = params;

  const { data: board, isSuccess } = useBoardQuery({ boardSeq: Number(boardSeq) });
  const { onBoardModifyMutation } = useBoardMutation();

  const [data, setData] = useState<IBoardCreateReq>({
    title: '',
    content: '',
  });

  const onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.title || data.title.trim().length === 0) {
      return alert('제목을 입력해주세요.');
    }

    if (!data.content || data.content.trim().length === 0) {
      return alert('내용을 입력해주세요.');
    }

    onBoardModifyMutation.mutate({ boardSeq: Number(boardSeq), ...data });
  };

  useEffect(() => {
    if (isSuccess) {
      setData({ title: board.title, content: board.content });
    }
  }, [isSuccess]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mx-auto">게시글 수정</h1>

      <form className="w-full flex flex-col gap-4" onSubmit={onSubmitHandle}>
        <div>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            className="w-full"
            value={data.title}
            onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            className="w-full resize-none"
            value={data.content}
            onChange={(e) => setData((prev) => ({ ...prev, content: e.target.value }))}
            required
          />
        </div>

        <div className="flex gap-4">
          <ButtonRouterBack />
          <ButtonWithSpinner type="submit" text="수정" bgColor="blue" />
        </div>
      </form>
    </div>
  );
}
