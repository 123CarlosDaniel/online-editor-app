import { useDispatch, useSelector } from 'react-redux'
import { userGetRoute } from '../api/api'
import { selectAccessToken } from '../features/auth/authSlice'
import { setUser } from '../features/user/userSlice'

export default function useRefreshUser() {
  const token = useSelector(selectAccessToken)
  const accessToken = token.accessToken
  const dispatch = useDispatch()
  const refresh = async (token = accessToken) => {
    const res = await fetch(userGetRoute, {
      credentials: 'include',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    const data = await res.json() //{}
    dispatch(
      setUser({
        _id: data.id,
        contacts: data.contacts,
        email: data.email,
        rooms: data.rooms,
        userName: data.userName,
      })
    )
  }
  return refresh
}
