import { useEffect, useState } from "react"
import useRefreshToken from "../hooks/useRefreshToken"
import {useSelector} from 'react-redux'
import { selectAccessToken } from "../features/auth/authSlice"
import { Outlet } from "react-router-dom"
import Loader from "../components/Loader"
import useRefreshUser from "../hooks/useRefreshUser"

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true)
  const refresh = useRefreshToken()
  const refreshUser = useRefreshUser()
  const auth = useSelector(selectAccessToken)

  useEffect(() => {
    const verifyRefreshToken = async()=>{
      try {
        setIsLoading(true)
        const token = await refresh()
        refreshUser(token).then()
      } catch (error:any) {
        console.log(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    !auth.accessToken ? verifyRefreshToken() : setIsLoading(false)
  }, [])
  
  return isLoading ? <Loader/> : <Outlet/> 
}
