'use client';

import ButtonWithSpinner from '@/components/button/ButtonWithSpinner';

export default function BoardListHeader() {
  const onCreateBoardHandle = () => {};

  const onLogoutHandle = () => {};

  return (
    <div className="flex items-center gap-2">
      <ButtonWithSpinner type="button" text="글 작성" bgColor="blue" onClick={onCreateBoardHandle} />
      {/*<ButtonWithSpinner type="button" text="로그아웃" bgColor="red" onClick={onLogoutHandle} />*/}
    </div>
  );
}
