import React from 'react'

interface SelectProps {
  name: string
  options: { value: string; label: string }[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any
  className?: string
}

export default function FormSelect({
  name,
  options,
  register,
  className,
}: SelectProps) {
  return (
    <select
      {...(register ? register(name) : {})}
      className={`form-select w-full p-2 rounded-xl px-4 py-[14px] appearance-none ${className}`}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
