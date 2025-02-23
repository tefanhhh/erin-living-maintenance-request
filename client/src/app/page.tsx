import Link from 'next/link'
import MaintenanceRequestSummary from '@/app/components/maintenance-request/Summary'
import MaintenanceRequestList from '@/app/components/maintenance-request/List'

export default async function Page() {
  return (
    <div className="container mx-auto px-4 sm:px-0">
      <div className="py-16">
        <h1 className="font-inter font-bold text-center text-foreground text-xl tracking-wider mb-8">
          Maintenance Request
        </h1>
        <MaintenanceRequestSummary />
        <MaintenanceRequestList />
      </div>
      <div className="flex items-center justify-end gap-4 sticky left-0 bottom-6 z-10">
        <Link href="/update">
          <button
            type="button"
            className="rounded-full bg-primary text-white w-14 h-14 flex items-center justify-center"
            style={{
              boxShadow: '0px 4px 6px 0px #0000001A, 0px 2px 4px 0px #0000000F',
            }}
          >
            <span className="icon-[heroicons--plus] w-5 h-5"></span>
          </button>
        </Link>
      </div>
    </div>
  )
}
