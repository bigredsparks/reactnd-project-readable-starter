import moment from 'moment'

const DATE_TIME_FORMAT = 'MM/DD/YYYY h:mm:ss a'

export function timestampToStr(timestamp) {
  return moment(timestamp).format(DATE_TIME_FORMAT)
}
