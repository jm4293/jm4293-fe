'use client';

import { FormEvent, useState } from 'react';
import { IBoardCreateReq } from '@/types/interface/board';
import ButtonWithSpinner from '@/components/button/ButtonWithSpinner';
import useBoardMutation from '@/hooks/mutation/board/useBoardMutation';
import ButtonRouterBack from '@/app/board/components/ButtonRouterBack';

interface IProps {
  params: {
    board_seq: string;
  };
}

export default function BoardModifyPage({ params }: IProps) {
  const { board_seq } = params;

  const {} = useBoardMutation();

  const [data, setData] = useState<IBoardCreateReq>({
    title: '',
    content: '',
  });

  const onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.title) {
      return alert('제목을 입력해주세요.');
    }

    if (!data.content) {
      return alert('내용을 입력해주세요.');
    }
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-4">
        <h1 className="mx-auto">게시글 작성</h1>
      </div>

      <form className="w-full" onSubmit={onSubmitHandle}>
        <div className="input-group">
          <label htmlFor="title">제목</label>
          <input
            className="w-full"
            value={data.title}
            onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>
        <div className="input-group">
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
          <ButtonWithSpinner type="submit" text="수정" bgColor="blue" />
        </div>
      </form>
    </div>
  );
}
