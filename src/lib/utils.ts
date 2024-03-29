import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const api_endpoint = 'https://flexstay-backend.onrender.com/api'

export const getLocation = (): [number, number] => {
  let loc: [number, number] = [0, 0]
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        loc = [position.coords.latitude, position.coords.longitude]
    })
  } 
  return loc
}

export const endpoint = (params?: string[]) => {
  let url = api_endpoint
  if (params?.length) {
    url = url + '/' + params.join('/')
  }

  return url
}
