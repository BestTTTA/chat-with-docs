
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ระบบค้นหาข้อมูลหลักสูตร',
  description: 'ค้นหาข้อมูลหลักสูตรด้วย AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className={inter.className}>{children}</body>
    </html>
  );
}