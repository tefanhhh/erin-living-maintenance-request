import React from 'react'

interface TextareaProps {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any
  className?: string
  rows?: number
  placeholder?: string
}

export default function FormTextarea({
  name,
  register,
  className,
  rows = 6,
  placeholder,
}: TextareaProps) {
  return (
    <textarea
      {...(register ? register(name) : {})}
      rows={rows}
      placeholder={placeholder}
      className={`form-textarea w-full p-2 rounded-xl px-4 py-[14px] ${className}`}
    />
  )
}
