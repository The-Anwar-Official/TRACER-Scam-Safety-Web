import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TRACE — Trust your instincts. Verify the signal.',
  description: 'A calm, interactive first-check for suspicious messages, links, and online pressure tactics.',
  applicationName: 'TRACE',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#090b08',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
