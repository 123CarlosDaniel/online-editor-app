import { FormEventHandler } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

export default function NewRoom() {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    
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
        <LogoutButton/>
      </div>
      <div>
        <h2>Create Room</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  )
}
