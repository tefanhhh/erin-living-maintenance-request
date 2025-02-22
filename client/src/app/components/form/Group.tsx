export default function FormGroup({
  children,
  label,
  required,
  className,
}: {
  children: React.ReactNode
  label: string
  required?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-gray mb-2">
        {label}
        {required && <span>*</span>}
      </label>
      {children}
    </div>
  )
}
