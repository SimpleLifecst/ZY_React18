import React from 'react'
import { QRCodeCanvas } from 'qrcode.react';

export default function Qrcode() {
  return (
    <QRCodeCanvas value="https://reactjs.org/" />
  )
}
