export default function SendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex-col items-start w-[375px] min-h-screen px-4">
        <main>{children}</main>
      </div>
    </>
  );
}
