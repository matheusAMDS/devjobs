import { formatDistance } from "date-fns"

export const getDaysDistance = (date: Date) => {
  return `${formatDistance(new Date(), date)} ago`
}