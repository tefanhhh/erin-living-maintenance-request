import React from 'react'

interface InputProps {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any
  className?: string
}

export default function FormInput({ name, register, className }: InputProps) {
  return (
    <input
      {...(register ? register(name) : {})}
      className={`form-input w-full p-2 rounded-xl px-4 py-[14px] ${className}`}
    />
  )
}
