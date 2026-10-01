import React from 'react'

export default function Logo() {
  return (
    <span style={{display: 'inline-flex', alignItems: 'center', gap: 10}}>
      <img src="/static/logo.png" alt="" style={{width: 28, height: 28, display: 'block'}} />
      <span style={{fontWeight: 700}}>Royal Hospital</span>
    </span>
  )
}
