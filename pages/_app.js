import '@/styles/globals.css'
import { useState } from 'react'
import Header from '@/util/header'
import { Fascinate_Inline } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
export default function App({ Component, pageProps }) {
  const [isDark, setIsDark] = useState(false)
 
  return( 
  <>
  {/* <Header/> */}
    {/* <style jsx global>{`
    ${ isDark ? 'body {background: darkslategray; }' : 'body {background: #EAEBF5;}' }
  `}</style> */}
   {/* <ThemeProvider> */}
  

  <Component {...pageProps} /> 

  {/* </ThemeProvider> */}
  </>)
}
