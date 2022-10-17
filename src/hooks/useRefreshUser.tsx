import { useDispatch } from "react-redux"
import { setUser } from "../features/user/userSlice"

export default function useRefreshUser() {
  const dispatch = useDispatch()
  const refresh = async(token:string)=>{
    const res = await fetch('http://localhost:3500/users',{
      credentials : "include",
      headers : {
        'Authorization' : 'Bearer ' + token
      }
    })
    const data  = await res.json() //{}
    dispatch(setUser({
      _id : data.id,
      contacts : data.contacts,
      email : data.email,
      rooms : data.rooms,
      userName : data.userName
    }))
    
  }  
  return refresh
}
