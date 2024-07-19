import { Inter as FontSans } from 'next/font/google';

import '../styles/globals.css';

import { cn } from '@/lib/utils';

import { Header } from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta
          name='viewport'
          content='width=device-width, height=device-height, initial-scale=1'
        />
      </head>

      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div>
            <Header />
            <main className='pt-navigation-height relative bg-[length:auto,auto] bg-[position:0_0,50%] bg-clip-padding'>
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
