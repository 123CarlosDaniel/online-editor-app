import {useSelector} from 'react-redux'
import { selectAccessToken } from '../features/auth/authSlice'
import { selectUser } from '../features/user/userSlice'
import useLogout from '../hooks/useLogout'
import { Link, useNavigate } from 'react-router-dom'
import './Panel.css'
import Rooms from '../components/Rooms'
import Contacts from '../components/Contacts'

export default function Panel() {
  const selector = useSelector(selectAccessToken)
  const selectorUser = useSelector(selectUser)
  const logout = useLogout()
  const navigate = useNavigate()
  // console.log(selectorUser)

  const handleLogout = async()=>{
    await logout()
    navigate('/')
  }
  return (
    <div className="Layout">
      <h2>Welcome to the user panel {selectorUser.userName}</h2>
      <div className='button_container'>
      <Link className='button' to={'/'}>Principal</Link>
      <button className='button sm' onClick={handleLogout}>Logout</button>
      </div>
      <div className='panel_information'>
        <div>
          <h3>Your Rooms</h3>
          <Rooms/>
        </div>
        <div>
          <h3>Your Contacts</h3>
          <Contacts/>
        </div>
      </div>

    </div>
  )
}
