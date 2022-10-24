import { FormEventHandler, useState } from 'react'
import { useSelector } from 'react-redux'
import { addContactRoute } from '../api/api'
import { selectAccessToken } from '../features/auth/authSlice'
import useRefreshUser from '../hooks/useRefreshUser'
import fetcher from '../utils/fetcher'
import LoaderInline from './LoaderInline'

export default function AddContact() {
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const token = useSelector(selectAccessToken)
  const refreshUser = useRefreshUser()
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    let body = JSON.stringify({ email })
    const { error } = await fetcher({
      url: addContactRoute,
      method: 'POST',
      body,
      accessToken: 'Bearer ' + token.accessToken,
    })
    if (error === null) {
      await refreshUser()
      setLoading(false)
      return
    }
    setEmail('')
    let msg = RegExp('Bad').test(error) ? 'User not founded' : 'Something went wrong'
    setLoading(false)
    setErrorMsg(msg as string)
    setTimeout(() => {
      setErrorMsg('')
    }, 3500)
  }
  return (
    <form onSubmit={handleSubmit} className="min_form">
      <span>Email contact</span>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter an email of an existing user"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="sm">
        Add contact
      </button>
      {loading && <LoaderInline/>}
      {errorMsg !== '' && <h2 className="errorMessage">{errorMsg}</h2>}
    </form>
  )
}
