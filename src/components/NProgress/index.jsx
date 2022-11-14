import React from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default function CustomNProgress() {

  React.useEffect(() => {
    NProgress.start()
    return () => {
      NProgress.done()
    }
  }, [])

  return (
    <div></div>
  )
}
