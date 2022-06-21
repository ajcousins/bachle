import { DateTime } from "luxon"


export const idStringToDateObj = (id:string) => {
  return DateTime.fromFormat(id, 'yyMMdd')
}

export const getSecondsToTomorrow = (): number => {
  const tomorrow = DateTime.now().plus({ days: 1 }).startOf('day');
  const difference = tomorrow.diff(DateTime.now()).toObject().milliseconds;
  return difference ? Math.ceil(difference / 1000) : 0;
};

export const secsToClockFormat = (seconds:number):string => {
  let hrs:number|string = Math.floor(seconds / 60 / 60);
  let min:number|string = Math.floor((seconds - (hrs * 3600)) / 60);
  let sec:number|string = seconds - (hrs * 3600) - (min * 60);

  if (hrs < 10) hrs = '0'+hrs; 
  if (min < 10) min = '0'+min; 
  if (sec < 10) sec = '0'+sec; 
  
  return `${hrs}:${min}:${sec}`
}