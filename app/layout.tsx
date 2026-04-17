import type { Metadata } from 'next'
import Script from 'next/script'
import { cormorant, montserrat } from './fonts'
import NoiseOverlay from '@/components/ui/NoiseOverlay'
import './globals.css'

export const metadata: Metadata = {
  title: 'Как вырасти в доходе х3, используя потенциал своей даты рождения',
  description: 'Эксклюзивный офлайн-интенсив от ведущего ведического нумеролога Энвера Фаткуллина. 25 апреля, Алматы.',
}

const GTM_ID = 'GTM-5JR8QNGF'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${montserrat.variable}`}>
      <head>
        <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}</Script>
      </head>
      <body className="min-h-svh bg-graphite-900 text-bone">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <NoiseOverlay />
        {children}
      </body>
    </html>
  )
}
