import useLogout from '../hooks/useLogout'
import { useNavigate } from 'react-router-dom'

export default function LogoutButton() {
  const navigate = useNavigate()
  const logout = useLogout()
  const handleLogout = async () => {
    await logout()
    navigate('/')
  }
  return (
    <button className="button sm" onClick={handleLogout}>
      Logout
    </button>
  )
}
