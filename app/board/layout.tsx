export default function BoardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <div className="w-full h-full flex flex-col justify-center ">{children}</div>
      </body>
    </html>
  );
}
