import { Inter, Playfair_Display, Quicksand } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const quicksand = Quicksand({ subsets: ['latin'], variable: '--font-quicksand' });

export const metadata = {
  title: 'Crochet Creations - Handmade with Love',
  description: '25 years of crafting beautiful handmade crochet items. From baby blankets to home decor, each piece is made with love and care.',
  keywords: 'crochet, handmade, baby blankets, amigurumi, home decor, custom gifts',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${playfair.variable} ${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
