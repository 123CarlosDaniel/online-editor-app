import { UserI } from '../features/user/userSlice'

interface fetcherParamsI {
  url: string
  method?: string
  body?: string
  accessToken?: string
}

// For fetcher in login and signup components
export interface DataI {
  token: string
  user: UserI
}

export interface RoomI {
  name: string
  users: string[]
  code: {
    Javascript: string
    Css: string
    Html: string
  }
  owner: string
}

interface fetcherResolveI<T> {
  data: T
  error: string | null
}

export default async function fetcher<T>({
  url,
  method,
  body,
  accessToken,
}: fetcherParamsI): Promise<fetcherResolveI<T>> {
  let data = null
  try {
    const res = await fetch(url, {
      method,
      body,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken || '',
      },
    })
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    data = await res.json()
    return {
      data,
      error: null,
    }
  } catch (error: any) {
    return {
      data,
      error: error.message,
    }
  }
}
