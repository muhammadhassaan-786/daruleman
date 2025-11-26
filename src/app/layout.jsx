// app/layout.jsx (Updated for Arabic/Nastaliq Font)

import Header from '../components/Header';
import './globals.css';

export const metadata = {
  title: 'Dar ul Eman',
  icons: {
    icon: '/assets/logo.avif',
  },
  headers: {
    'Permissions-Policy': 'fullscreen=(self "https://archive.org")',
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="ur" dir="rtl"> 
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <Header /> 
        {children}
      </body>
    </html>
  );
}