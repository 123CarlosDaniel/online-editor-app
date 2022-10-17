import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import fetcher, { DataI } from '../utils/fetcher'
import { useDispatch } from 'react-redux'
import { setAuth } from '../features/auth/authSlice'
import { setUser } from '../features/user/userSlice'

export default function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    let body = JSON.stringify(values)
    const { data, error } = await fetcher<DataI>({
      method: 'POST',
      url: 'http://localhost:3500/auth/login',
      body,
    })
    if (error === null) {
      dispatch(setAuth({ accessToken: data.token }))
      console.log({data})
      const user = data.user
      dispatch(setUser(user))
      navigate('/panel')
      return
    }
    let msg = RegExp('Bad').test(error) ? error : 'Something went wrong'
    setErrorMsg(msg as string)
    setTimeout(() => {
      setErrorMsg('')
    }, 3500)
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          autoFocus
          required
          value={values.email}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          minLength={6}
          value={values.password}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button type="submit">Login</button>
      <div>
        Don't have an account? Sign up{' '}
        <Link className="link" to={'/signup'}>
          here
        </Link>
      </div>
      <Link className="link" to={'/'}>
        Go back to home
      </Link>
      {errorMsg !== '' && <h2 className="errorMessage">{errorMsg}</h2>}
    </form>
  )
}
