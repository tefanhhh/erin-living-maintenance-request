import { findAllMaintenanceRequests } from '@/gql-query/maintenance-request'
import {
  FindAllMaintenanceRequestsQuery,
  MaintenanceRequestStatus,
  MaintenanceRequestUrgency,
} from '@/gql/graphql'
import client from '@/lib/apollo.client'
import dayjs from '@/lib/dayjs'
import Link from 'next/link'

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

function generateColor(urgency: MaintenanceRequestUrgency): string {
  switch (urgency) {
    case MaintenanceRequestUrgency.Urgent:
      return 'text-orange'
    case MaintenanceRequestUrgency.NoneUrgent:
      return 'text-primary-200'
    case MaintenanceRequestUrgency.Emergency:
      return 'text-red'
    case MaintenanceRequestUrgency.LessUrgent:
      return 'text-blue'
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
      <div className="flex items-center justify-center gap-4 flex-wrap">
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
                <span className={generateColor(it!.urgency!)}>
                  {generateEmoji(it!.urgency!)}{' '}
                  {humanizeEnumText(it!.urgency! as string)}
                </span>
                {it?.status === MaintenanceRequestStatus.Open ? (
                  <button
                    type="button"
                    className="bg-primary rounded-full py-1 px-2 text-white text-xs"
                  >
                    Mark as Resolved
                  </button>
                ) : (
                  <span>Resolved</span>
                )}
              </div>
            </li>
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
