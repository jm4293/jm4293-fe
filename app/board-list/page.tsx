import { cookies } from 'next/headers';

export default async function BoardListPage() {
  const token = cookies().get('accessToken');

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/${process.env.NEXT_PUBLIC_GLOBAL_PREFIX}/board/board-list`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: `accessToken=${token?.value}`,
      },
    },
  );

  const data = await res.json();

  return (
    <div>
      <h1>Board List Page</h1>
    </div>
  );
}
