import { useSelector } from 'react-redux'
import { selectUser } from '../features/user/userSlice'
import { Link } from 'react-router-dom'
import './Panel.css'
import Rooms from '../components/Rooms'
import Contacts from '../components/Contacts'
import LogoutButton from '../components/LogoutButton'
import AddContact from '../components/AddContact'

export default function Panel() {
  const selectorUser = useSelector(selectUser)
  return (
    <div className="Layout">
      <h2>Welcome to the user panel {selectorUser.userName.toUpperCase()}</h2>
      <div className="button_container">
        <Link className="button" to={'/'}>
          Principal
        </Link>
        <Link className="button" to={'/newRoom'}>
          Create New Room
        </Link>
        <LogoutButton />
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
        <div>
          <h3>Add Contact</h3>
          <AddContact />
        </div>
      </div>
    </div>
  )
}
