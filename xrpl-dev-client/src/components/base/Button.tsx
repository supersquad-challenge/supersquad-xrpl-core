"use client"
import { IButton } from '@/interface/IButton'
import React from 'react'

const Button = ({ title, onClick }: IButton) => {
  return (
    <button onClick={() => onClick()}>
      {title}
    </button>
  )
}

export default Button