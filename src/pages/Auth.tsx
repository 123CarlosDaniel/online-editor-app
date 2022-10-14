import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAccessToken } from '../features/auth/authSlice'

export default function Auth() {
  const auth = useSelector(selectAccessToken)
  const location = useLocation()

  return auth.accessToken ? (
    <Navigate to={'/panel'} state={{ from: location }} replace />
  ) : (
    <div className="Layout">
      <h2>Login to start using the editor</h2>
      <Outlet />
    </div>
  )
}
