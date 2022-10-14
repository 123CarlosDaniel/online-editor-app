import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAccessToken } from '../features/auth/authSlice'

export default function Protected() {
  const location = useLocation()
  const auth = useSelector(selectAccessToken)

  return auth.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} state={{ from: location }} replace />
  )
}
