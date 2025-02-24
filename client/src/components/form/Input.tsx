import React from 'react'

interface InputProps {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any
  className?: string
  placeholder?: string
}

export default function FormInput({
  name,
  register,
  className,
  placeholder,
}: InputProps) {
  return (
    <input
      {...(register ? register(name) : {})}
      placeholder={placeholder}
      className={`form-input w-full p-2 rounded-xl px-4 py-[14px] ${className}`}
    />
  )
}
