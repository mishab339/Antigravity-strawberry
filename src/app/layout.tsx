import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import BottomProfileTab from '@/components/BottomProfileTab';

export const metadata: Metadata = {
  title: 'Strawberry Showcase',
  description: 'Pure Strawberry cold-pressed juice showcase.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">
        <Navbar />
        {children}
        <BottomProfileTab />
      </body>
    </html>
  );
}
