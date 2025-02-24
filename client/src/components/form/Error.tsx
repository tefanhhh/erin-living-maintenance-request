export default function FormError({ error }: { error: string | undefined }) {
  return <p className="text-red text-sm mb-0">{error}</p>
}
