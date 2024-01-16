import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function groupBy<T>(collection:T[],key: keyof T){
  const groupedResult =  collection.reduce((previous,current)=>{

  if(!previous[current[key]]){
    previous[current[key]] = [] as T[];
   }

  previous[current[key]].push(current);
         return previous;
  },{} as any); // tried to figure this out, help!!!!!
  return groupedResult
}
