'use client';

import { FormEvent, useState } from 'react';
import ButtonWithSpinner from '@/components/button/ButtonWithSpinner';
import useBoardMutation from '@/hooks/mutation/board/useBoardMutation';
import { IBoardCreateReq } from '@/types/interface';
import ButtonRouterBack from '@/components/button/ButtonRouterBack';

export default function BoardCreatePage() {
  const { onBoardCreateMutation } = useBoardMutation();

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

    onBoardCreateMutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1>게시글 작성</h1>

      <form className="w-full flex flex-col gap-4" onSubmit={onSubmitHandle}>
        <div>
          <label htmlFor="title">제목</label>
          <input
            className="w-full"
            value={data.title}
            onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <textarea
            className="w-full resize-none"
            value={data.content}
            onChange={(e) => setData((prev) => ({ ...prev, content: e.target.value }))}
            required
          />
        </div>

        <div className="flex gap-4">
          <ButtonRouterBack />
          <ButtonWithSpinner type="submit" text="등록" bgColor="blue" disabled={onBoardCreateMutation.isLoading} />
        </div>
      </form>
    </div>
  );
}
