import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Discipline Journal — Habit Tracker & Portfolio',
  description: 'Application haut de gamme de construction d\'habitudes et de suivi quotidien.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className="bg-background text-gray-100 font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
