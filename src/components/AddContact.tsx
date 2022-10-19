import { FormEventHandler, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAccessToken } from '../features/auth/authSlice'
import useRefreshUser from '../hooks/useRefreshUser'
import fetcher from '../utils/fetcher'

export default function AddContact() {
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const token = useSelector(selectAccessToken)
  const refreshUser = useRefreshUser()
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    let body = JSON.stringify({ email })
    const { error } = await fetcher({
      url: 'http://localhost:3500/users/addContact',
      method: 'POST',
      body,
      accessToken: 'Bearer ' + token.accessToken,
    })
    if (error === null) {
      await refreshUser()
      return
    }
    setEmail('')
    let msg = RegExp('Bad').test(error) ? 'User not founded' : 'Something went wrong'
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
      {errorMsg !== '' && <h2 className="errorMessage">{errorMsg}</h2>}
    </form>
  )
}
