import React from 'react'
import { Outlet } from 'react-router-dom'

export default function TestPage() {
  return (
    <>
      <div>TestPage 测试面包屑</div>
      <Outlet/>
    </>
  )
}
