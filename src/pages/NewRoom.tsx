import { FormEventHandler, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createRoomRoute } from '../api/api'
import LoaderInline from '../components/LoaderInline'
import LogoutButton from '../components/LogoutButton'
import { selectAccessToken } from '../features/auth/authSlice'
import useRefreshUser from '../hooks/useRefreshUser'
import fetcher, { RoomI } from '../utils/fetcher'

export default function NewRoom() {
  const [value, setValue] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const token = useSelector(selectAccessToken)
  const refreshUser = useRefreshUser()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    let body = JSON.stringify({ name: value })
    const { data, error } = await fetcher<RoomI>({
      url: createRoomRoute,
      method: 'POST',
      body,
      accessToken: 'Bearer ' + token.accessToken,
    })
    if (error === null) {
      await refreshUser()
      setLoading(false)
      navigate(`/panel`)
      return
    }
    let msg = RegExp('Bad').test(error)
      ? 'Room name already used'
      : 'Something went wrong'
    setLoading(false)
    setErrorMsg(msg as string)
    setTimeout(() => {
      setErrorMsg('')
    }, 3500)
  }
  return (
    <div className="Layout">
      <div className="button_container">
        <Link className="button" to={'/'}>
          Principal
        </Link>
        <Link className="button" to={'/panel'}>
          Panel
        </Link>
        <LogoutButton />
      </div>
      <div>
        <h2>Create Room</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
          <button type="submit">Create</button>
          { loading && <LoaderInline/>}
          {errorMsg !== '' && <h2 className="errorMessage">{errorMsg}</h2>}
        </form>
      </div>
    </div>
  )
}
