import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function copyToClipBoard (text:string):Promise<boolean>{
  try{
    if(typeof navigator !== "undefined" && navigator.clipboard )
    {
      await navigator.clipboard.writeText(text);
      return true;
    }
    else{
      console.log("navigator.clipboard is undefined here")
      return false;
    }
  }
  catch(e)
  {
    console.log(e);
    return false;
  }
}