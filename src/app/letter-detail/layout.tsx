export default function LetterDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="box-border font-pretendard ">{children}</div>
    </>
  );
}
