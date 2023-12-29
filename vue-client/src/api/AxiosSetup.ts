import axios from "axios";

const APP_URL = import.meta.env.VITE_SOCKET_URL


export function create(baseURL: string, options?: any) {
  
  const instance = axios.create(Object.assign({ baseURL }, options))

  return instance
}

export const httpChat = create(`${APP_URL}/chat`)

export const httpApp = create(`${APP_URL}`)