export default function BoardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <div
          className="w-full flex flex-col justify-center items-center"
          style={{ position: 'absolute', top: '50%', transform: 'translate(0, -50%)' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
