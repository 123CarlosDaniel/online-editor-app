import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import fetcher from '../utils/fetcher'
import {useDispatch} from 'react-redux'
import { setAuth } from '../features/auth/authSlice'
import { setUser } from '../features/user/userSlice'

export default function SignUp() {
  const [values, setValues] = useState({
    userName: '',
    email: '',
    password: '',
  })
  const [errorMsg, setErrorMsg] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleSubmit: FormEventHandler<HTMLFormElement> = async(e) => {
    e.preventDefault()
    let body = JSON.stringify(values)
    const {data,error} = await fetcher({
      url: 'http://localhost:3500/auth/register',
      method:'POST',
      body,
    })

    if (error===null) {
      dispatch(setAuth({accessToken:data.token}))
      const user = data.user
      dispatch(setUser(user))
      navigate('/panel')
      return
    }
    console.log(data)
    let msg = RegExp('Bad').test(error)? 'Email is already used' : error
    console.log({msg})
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
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          id="userName"
          name="userName"
          autoFocus
          required
          value={values.userName}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
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
      <button>Sign Up</button>
      <div>
        Already have an account? Login{' '}
        <Link className="link" to={'/login'}>
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
