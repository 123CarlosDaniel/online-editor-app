import {useSelector} from 'react-redux'
import { selectAccessToken } from '../features/auth/authSlice'

export default function Panel() {
  const selector = useSelector(selectAccessToken)

  console.log(selector.accessToken)
  return (
    <div className="Layout">Panel</div>
  )
}
