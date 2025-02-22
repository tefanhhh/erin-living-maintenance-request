import { findAllMaintenanceRequests } from '@/gql-query/maintenance-request'
import {
  FindAllMaintenanceRequestsQuery,
  MaintenanceRequestUrgency,
} from '@/gql/graphql'
import client from '@/lib/apollo.client'
import dayjs from '@/lib/dayjs'

function humanizeEnumText(text: string): string {
  return text
    .split('_')
    .map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join(' ')
}

function generateEmoji(urgency: MaintenanceRequestUrgency): string {
  switch (urgency) {
    case MaintenanceRequestUrgency.Urgent:
      return '⚡️'
    case MaintenanceRequestUrgency.NoneUrgent:
      return '🙂 '
    case MaintenanceRequestUrgency.Emergency:
      return '🔥'
    case MaintenanceRequestUrgency.LessUrgent:
      return '🔨'
    default:
      return ''
  }
}

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
      <h1 className="font-inter font-bold text-center text-foreground text-xl tracking-wider mb-4">
        Maintenance Request
      </h1>
      <div className="flex items-center justify-center gap-4">
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
            <li key={i} className="bg-white rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between gap-4 mb-2">
                <h3 className="text-sm text-foreground tracking-normal">
                  {it?.title}
                </h3>
                <span className="text-xs text-gray">
                  {dayjs(it?.createdAt).format('DD MMM YYYY')}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-orange">
                  {generateEmoji(it!.urgency!)}{' '}
                  {humanizeEnumText(it!.urgency! as string)}
                </span>
                <span>{it?.status}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
