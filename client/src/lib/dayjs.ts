import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import localeData from 'dayjs/plugin/localeData'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localeData)

import 'dayjs/locale/en'
dayjs.locale('en')
dayjs.tz.setDefault('Australia/Sydney')

export default dayjs
