export const metadata = {
  title: 'Cartsy',
  description: 'Chat-based social shopping assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
