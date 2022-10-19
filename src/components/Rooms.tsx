import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUser } from '../features/user/userSlice'

export default function Rooms() {
  const users = useSelector(selectUser)
  return (
    <div className="data_container">
      {users.rooms.map((el) => (
        <div key={el.id}>
          <span>Id : {el.id}</span>
          <h4>Name : {el.name}</h4>
          <div className="link_container">
            <Link to={`/editor/${el.name}`} className="link sm">
              Join
            </Link>
            <Link to={`/access/${el.id}`} className="link sm">
              Give access to
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
