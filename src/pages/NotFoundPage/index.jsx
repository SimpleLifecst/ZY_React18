import React from 'react'
import NotFoundImages from '../../assets/404.webp'

export default function index() {
  return (
    <div className='not-found-page'>
      <img src={NotFoundImages} alt="hello" width="100%" height="100%"/>
    </div>
  )
}
