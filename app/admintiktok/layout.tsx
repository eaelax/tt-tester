import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Console - Tik Profiles Viewer',
  description: 'Private site configuration console.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminTikTokLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}