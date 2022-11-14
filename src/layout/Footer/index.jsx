import { useEffect, useState } from 'react'
import { Layout, message, Tooltip } from 'antd'
import { handleRandomPoetryRequest } from '../../apis/common'

export default function Footer() {

  const [state, setstate] = useState({ hitokoto: "", from_who: "", flag: false });

  const request = async () => {
    const { data: { hitokoto, from_who } } = await handleRandomPoetryRequest()
    setstate({
      hitokoto,
      from_who
    })

    sessionStorage.setItem("footer-word", JSON.stringify({ hitokoto, from_who, updateAt: Date.now() }))
  }

  useEffect(() => {
    const result = sessionStorage.getItem("footer-word")
    const time = result && JSON.parse(result).updateAt

    if (result && time && time - Date.now() <= 1000 * 60 * 10) {
      return setstate({ ...state, ...JSON.parse(result), updateAt: Date.now() })
    }

    request()
  }, [])

  function handleCopyHitokoto() {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(state.hitokoto).then(() => {
        message.success("复制成功")
      })
    }
  }

  return (
    <Layout.Footer
      className='footer'
    >
      <Tooltip color='#2db7f5' placement="top" title="点击复制">
        <span
          onMouseEnter={() => setstate({ ...state, flag: true })}
          onMouseLeave={() => setstate({ ...state, flag: false })}
          className='hitokoto'
          onClick={handleCopyHitokoto}
        >「 {state.hitokoto}」</span>
      </Tooltip>

      <span style={{
        opacity: state.flag ? 1 : 0
      }} className='from'>{state.from_who || '来源网络'}</span>
    </Layout.Footer>
  )
}
