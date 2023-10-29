import type { Metadata } from 'next';
import { Roboto_Flex } from 'next/font/google';
import './globals.css';

const font = Roboto_Flex({ subsets: ['latin'], fallback: ['Helvetica Neue'] });

export const metadata: Metadata = {
  title: 'Card Form',
  description: 'telegram_mini_apps_NextJS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
