import { useSelector } from 'react-redux'
import { selectAccessToken } from '../features/auth/authSlice'
import { selectUser } from '../features/user/userSlice'
import { Link } from 'react-router-dom'
import './Panel.css'
import Rooms from '../components/Rooms'
import Contacts from '../components/Contacts'
import LogoutButton from '../components/LogoutButton'

export default function Panel() {
  const selector = useSelector(selectAccessToken)
  const selectorUser = useSelector(selectUser)

  console.log(selectorUser)

  
  return (
    <div className="Layout">
      <h2>Welcome to the user panel {selectorUser.userName}</h2>
      <div className="button_container">
        <Link className="button" to={'/'}>
          Principal
        </Link>
        <Link className="button" to={'/newRoom'}>Create New Room</Link>
        <LogoutButton/>
      </div>

      <div className="panel_information">
        <div>
          <h3>Your Rooms</h3>
          <Rooms />
        </div>
        <div>
          <h3>Your Contacts</h3>
          <Contacts />
        </div>
      </div>
    </div>
  )
}
