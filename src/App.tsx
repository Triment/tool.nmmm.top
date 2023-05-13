import { useEffect } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import Main from "./Main";

export default function Layout(){
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      document.documentElement.classList.add('dark')
    else document.documentElement.classList.add('light')
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      window.JSEncrypt = (await import('jsencrypt')).JSEncrypt
    })()
  })
  return <>
  <Header/>
  <Main/>
  <Footer/>
  </>
}