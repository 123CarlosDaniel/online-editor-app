import { useSelector } from 'react-redux'
import { selectUser } from '../features/user/userSlice'

export default function Contacts() {
  const user = useSelector(selectUser)

  return (
    <div className="data_container">
      {user.contacts.map((el) => (
        <div key={el.id}>
          <span>Id : {el.id}</span>
          <h4>Name : {el.name}</h4>
          <span>Email : {el.email}</span>
        </div>
      ))}
    </div>
  )
}
