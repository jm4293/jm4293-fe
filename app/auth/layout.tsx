export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <div className="w-full h-full flex justify-center items-center">{children}</div>
      </body>
    </html>
  );
}
