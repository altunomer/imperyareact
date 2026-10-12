import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'İmperya Media Solutions | Kreatif Medya & Dijital Ajans',
  description:
    'Fikirleri markalara, markaları kalıcı etkiye dönüştürüyoruz. Sosyal medya yönetimi, video prodüksiyon, kurumsal kimlik, web tasarım ve dijital pazarlama çözümleri.',
  keywords: [
    'Kayseri reklam ajansı',
    'prodüksiyon',
    'sosyal medya yönetimi',
    'kurumsal kimlik',
    'web tasarımı',
    'drone çekimi',
    'İmperya Media Solutions',
  ],
  openGraph: {
    title: 'İmperya Media Solutions | Kreatif Medya & Dijital Ajans',
    description: 'Fikirleri markalara, markaları kalıcı etkiye dönüştürüyoruz.',
    url: 'https://imperyamediasolutions.com',
    siteName: 'İmperya Media Solutions',
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <body className="bg-[#09090b] text-[#f4f4f5] antialiased selection:bg-white selection:text-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
