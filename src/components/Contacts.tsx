import { useSelector } from "react-redux"
import { selectUser } from "../features/user/userSlice"



const data = [
  {
    id : '1234564',
    name : 'pepe1',
    email : 'peepe@hotmail.com',
  },
  {
    id : '1234561',
    name : 'pepe1',
    email : 'peepe@hotmail.com',
  },
  {
    id : '12345667',
    name : 'pepe1',
    email : 'peepe@hotmail.com',
  },
  {
    id : '12345689',
    name : 'pepe1',
    email : 'peepe@hotmail.com',
  },
]


export default function Contacts() {
  const user = useSelector(selectUser)

  return (
    <div className="data_container" >{
      user.contacts.map(el=>(
      <div key={el.id}>
        <span>Id : {el.id}</span>
        <h4>Name : {el.name}</h4>
        <span>Email : {el.email}</span>
      </div>
    ))}</div>
  )
}
