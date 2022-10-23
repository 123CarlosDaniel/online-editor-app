import { setAuth } from '../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { refreshRoute } from '../api/api'

export default function useRefreshToken() {
  const dispatch = useDispatch()
  const refresh = async () => {
    const res = await fetch(refreshRoute, {
      credentials: 'include',
    })
    const data = await res.json() //{token:accessToken}
    dispatch(setAuth({ accessToken: data.token }))
    return data.token
  }
  return refresh
}
