import { findAllMaintenanceRequests } from '@/gql-query/maintenance-request'
import { FindAllMaintenanceRequestsQuery } from '@/gql/graphql'
import client from '@/lib/apollo.client'
import Link from 'next/link'
import MaintenanceRequestItem from '@/app/components/maintenance-request/Item.'

export default async function Page() {
  const summary = [
    {
      title: 'Open Requests',
      value: 2,
    },
    {
      title: 'Urgent Requests',
      value: 3,
    },
    {
      title: 'Average time (days) to resolve',
      value: 3,
    },
  ]

  const { data: maintenanceRequests } =
    await client.query<FindAllMaintenanceRequestsQuery>({
      query: findAllMaintenanceRequests,
    })

  return (
    <div className="container mx-auto px-4 sm:px-0 py-16">
      <h1 className="font-inter font-bold text-center text-foreground text-xl tracking-wider mb-8">
        Maintenance Request
      </h1>
      <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
        {summary.map((it, i) => (
          <div
            key={i}
            className="w-[90px] h-[90px] rounded-xl bg-white px-1 flex flex-col items-center justify-start pt-4"
            style={{ boxShadow: '0px 6px 14px 0px rgba(0, 0, 0, 0.06)' }}
          >
            <h2 className="font-inter font-bold text-primary text-3xl text-center">
              {it.value}
            </h2>
            <p className="font-inter text-foreground text-[9px] text-center mb-0 leading-[10.89px]">
              {it.title}
            </p>
          </div>
        ))}
      </div>
      <ul className="mt-4">
        {maintenanceRequests.findAllMaintenanceRequests?.map((it, i) => {
          return (
            <MaintenanceRequestItem
              key={i}
              title={it?.title}
              urgency={it?.urgency}
              status={it?.status}
              createdAt={it?.createdAt}
            />
          )
        })}
      </ul>

      <div className="flex items-center justify-end gap-4">
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
