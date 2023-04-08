import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'

export default function App({ Component, pageProps }) {
  const [isDark, setIsDark] = useState(true)
 
  return( 
  <>
    {/* <style jsx global>{`
    ${ isDark ? 'body {background: darkslategray;}' : 'body {background: antiquewhite;}' }
  `}</style> */}
  <Component {...pageProps} /> 
  </>)
}
