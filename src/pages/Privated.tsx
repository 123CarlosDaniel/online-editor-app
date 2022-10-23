import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { verifyUserRoute } from '../api/api'
import Loader from '../components/Loader'
import { selectAccessToken } from '../features/auth/authSlice'

export default function Privated() {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const auth = useSelector(selectAccessToken)
  let path = params.roomId || params.roomName
  if (params.roomId === path) path = '?id=' + path
  if (params.roomName === path) path = '?name=' + path
  useEffect(() => {
    fetch(`${verifyUserRoute}${path}`, {
      headers: {
        Authorization: 'Bearer ' + auth.accessToken,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        const data = res.json()
        return data
      })
      .then((data) => {
        if (data.authorized) {
          setAllowed(true)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  
  return isLoading ? (
    <Loader />
  ) : allowed ? (
    <Outlet />
  ) : (
    <Navigate to={'/panel'} />
  )
}
