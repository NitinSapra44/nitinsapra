import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Nitin Sapra - Full-Stack Developer',
  description: 'Portfolio of Nitin Sapra, a passionate Full-Stack Web Developer specializing in MERN stack',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a1a',
              color: '#fafafa',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#00E5FF',
                secondary: '#fafafa',
              },
            },
            error: {
              iconTheme: {
                primary: '#FF1744',
                secondary: '#fafafa',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
