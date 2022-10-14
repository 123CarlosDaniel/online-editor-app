import {useDispatch} from 'react-redux'
import { setAuth } from '../features/auth/authSlice'


export default function useLogout() {
  const dispatch = useDispatch()

  const logout = async()=>{
    dispatch(setAuth({accessToken:''}))
    try {
      const res = await fetch('http://localhost:3500/logout',{
        credentials : 'include',
      })
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return {error: null}
    } catch (error:any) {
      console.log(error)
      return {error: error.message}
    }
  }
  return logout
}
