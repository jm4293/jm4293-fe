export default async function BoardListPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}/${process.env.NEXT_PUBLIC_GLOBAL_PREFIX}/board/board-list`,
  );

  const data = await res.json();

  console.log('datadatadatadata', data);

  return (
    <div>
      <h1>Board List Page</h1>
    </div>
  );
}
