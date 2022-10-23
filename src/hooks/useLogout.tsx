import { useDispatch } from 'react-redux'
import { logoutRoute } from '../api/api'
import { setAuth } from '../features/auth/authSlice'

export default function useLogout() {
  const dispatch = useDispatch()

  const logout = async () => {
    dispatch(setAuth({ accessToken: '' }))
    try {
      const res = await fetch(logoutRoute, {
        credentials: 'include',
      })
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return { error: null }
    } catch (error: any) {
      return { error: error.message }
    }
  }
  return logout
}
