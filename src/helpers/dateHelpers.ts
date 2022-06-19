import { DateTime } from "luxon"


export const idStringToDateObj = (id:string) => {
  return DateTime.fromFormat(id, 'yyMMdd')
}