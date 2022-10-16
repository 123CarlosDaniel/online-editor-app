import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

export default function NewRoom() {
  
  return (
    <div className="Layout">
      <div className="button_container">
        <Link className="button" to={'/'}>
          Principal
        </Link>
        <Link className="button" to={'/newRoom'}>Create New Room</Link>
        <LogoutButton/>
      </div>
    </div>
  )
}
