import { setAuth } from "../features/auth/authSlice";
import {useDispatch} from 'react-redux'


export default function useRefreshToken() {
  const dispatch = useDispatch()
  const refresh = async()=>{
    const res = await fetch('http://localhost:3500/refresh',{
      credentials : "include",
    })
    const data = await res.json() //{token:accessToken}
    dispatch(setAuth({accessToken : data.token}))
  }  
  return refresh
}

