import '../styles/globals.css';

import { Header } from '@/components/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta
          name='viewport'
          content='width=device-width, height=device-height, initial-scale=1'
        />
      </head>
      <body>
        <div>
          <Header />

          <main className='pt-navigation-height relative bg-[length:auto,auto] bg-[position:0_0,50%] bg-clip-padding'>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
