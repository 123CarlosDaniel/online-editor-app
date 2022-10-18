import { FormEventHandler, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectAccessToken } from '../features/auth/authSlice'
import fetcher from '../utils/fetcher'

export default function AccessRoom() {
  const [errorMsg, setErrorMsg] = useState('')
  const [email, setEmail] = useState('')
  const params = useParams()  //:roomId
  const navigate = useNavigate()
  const token = useSelector(selectAccessToken)

  const handleSubmit:FormEventHandler<HTMLFormElement>  = async(e)=>{
    e.preventDefault()

    let body = JSON.stringify({email, roomId : params.roomId})
    const { data, error } = await fetcher({
      url: 'http://localhost:3500/room/access',
      method: 'POST',
      body,
      accessToken : 'Bearer ' + token.accessToken
    })
    if (error === null) {
      navigate(`/panel`)
      return
    }
    let msg = RegExp('Bad').test(error) ? error : 'Something went wrong'
    setErrorMsg(msg as string)
    setTimeout(() => {
      setErrorMsg('')
    }, 3500)

  } 
  return (
    <div className="Layout">
      <h2>Give access to a contact</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Contact Email</label>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Enter the email of a contact"
          onChange={(e)=>setEmail(e.target.value)}
        />
        <button type="submit">Send</button>
        {errorMsg !== '' && <h2 className="errorMessage">{errorMsg}</h2>}
      </form>
    </div>
  )
}
