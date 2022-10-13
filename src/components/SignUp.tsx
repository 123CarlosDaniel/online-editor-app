import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log(values)
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          autoFocus
          required
          value={values.name}
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
    </form>
  )
}
