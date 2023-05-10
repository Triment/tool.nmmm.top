/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createRef, useEffect, useState } from 'react';

export const documentProps = {
  // title 和 description 会覆盖默认值
  title: '在线非对称RSA加密工具',
  description: '免费在线加密工具 非对称加密工具 RSA在线加密',
}
declare var window: any;
export default function App() {
  const [payload, setPayload] = useState('')
  const privateText = createRef<HTMLTextAreaElement>()
  const publicText = createRef<HTMLTextAreaElement>()
  const refForContent = createRef<HTMLTextAreaElement>()

  const [timeCost, setTimeCost] = useState<number>()

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      document.documentElement.classList.add('dark')
    else document.documentElement.classList.add('light')
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      window.JSEncrypt = (await import('jsencrypt')).JSEncrypt
    })()
  })
  // const [state, setUserState] = useRecoilState(token)
  // const [{ data, fetching }] = useQuery({ query: getUser })
  //if (result.fetching) return <div suppressHydrationWarning> 加载中 </div>
  return (
    <>
      <div className="flex flex-col justify-around sm:flex-row">
        <div className=" flex-1 flex-col">
          <h3 className="text-pink-700 dark:text-green-500">私钥</h3>
          <textarea
            ref={privateText}
            className="m-1 w-full border-collapse border border-dashed p-2 text-gray-500 dark:bg-gray-500 dark:text-white dark:placeholder:text-white"
            rows={10}
            placeholder="填入私钥后点击解密 格式：&#13; -----BEGIN RSA PRIVATE KEY-----
            MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ
            WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR
            aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB
            AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv
            xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH
            m7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd
            8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF
            z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5
            rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM
            V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe
            aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil
            psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz
            uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876
            -----END RSA PRIVATE KEY-----"
          ></textarea>
        </div>
        <div className="flex-1 flex-col">
          <h3 className="text-pink-700 dark:text-green-500">公钥</h3>
          <textarea
            ref={publicText}
            className="m-1 w-full border-collapse border border-dashed p-2 text-gray-500 dark:bg-gray-500 dark:text-white dark:placeholder:text-white"
            rows={10}
            placeholder="填入公钥点击加密，格式：&#13; -----BEGIN PUBLIC KEY-----
            MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
            FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
            xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
            gwQco1KRMDSmXSMkDwIDAQAB
            -----END PUBLIC KEY-----"
          ></textarea>
        </div>
      </div>
      <input
        className="switch cursor-pointer rounded-md bg-pink-700 px-6 py-2 text-center text-white hover:bg-pink-500 hover:shadow-md"
        value={'解密'}
        type="button"
        onClick={() => {
          if (typeof window !== 'undefined') {
            const sign = new window.JSEncrypt()
            sign.setPrivateKey(privateText.current!.value)
            const now = Date.now()
            const result = sign.decrypt(refForContent.current!.value)
            if (result) {
              setPayload(result)
            }
            setTimeCost(Date.now() - now)
          }
        }}
      />
      <input
        className="switch ml-2 cursor-pointer rounded-md bg-pink-700 px-6 py-2 text-center text-white hover:bg-pink-500 hover:shadow-md "
        value={'加密'}
        type="button"
        onClick={() => {
          if (typeof window !== 'undefined') {
            const sign = new window.JSEncrypt()
            sign.setPublicKey(publicText.current!.value)
            const now = Date.now()
            const result = sign.encrypt(refForContent.current!.value)
            if (result) {
              setPayload(result)
            }
            setTimeCost(Date.now() - now)
          }
        }}
      />

      <div>
        <textarea
          ref={refForContent}
          className="m-1 w-full border-collapse border border-dashed p-2 text-gray-500 dark:bg-gray-500 dark:text-white dark:placeholder:text-white"
          rows={10}
          placeholder="填写密文或待加密的文本"
        ></textarea>

        {payload && <span className="font-bold text-green-500">结果</span>}
        <p className="w-full overflow-visible break-words p-2">{payload}</p>
        {timeCost && (
          <>
            <span className="font-bold text-green-500">时间总计</span>
            <p className="w-full overflow-visible break-words p-2">{timeCost}ms</p>
          </>
        )}
      </div>
      <footer className="text-gray-500 dark:text-green-500">
        <span>
          图标来自
          <a className="text-pink-500 dark:text-green-500" href="https://icons8.com">
            icons8
          </a>
        </span>
      </footer>
    </>
  )
}
