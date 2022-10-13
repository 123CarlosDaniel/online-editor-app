import { Outlet, useLocation, Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  let location = useLocation()

  return (
    <div className="Layout">
      {location.pathname === '/' ? (
        <>
          <h2>Welcome to my app</h2>
          <div className="home_content">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
            distinctio sapiente odio voluptatum veritatis sint praesentium, ab
            consectetur, officia, placeat dolores nesciunt architecto. Esse
            culpa nisi quam, rerum doloribus nulla quod amet velit, veritatis
            aliquam minus dolorem molestias distinctio consequuntur commodi
            obcaecati asperiores provident voluptates delectus ipsum quis
            doloremque natus! Nisi sunt voluptatibus corporis odit
            necessitatibus repellendus ipsa quae quasi aspernatur? Cupiditate
            assumenda, et officia inventore dignissimos quas quisquam odio quos
            minima impedit libero est quo harum aliquam perspiciatis corrupti
            provident tempore rerum placeat quod aut voluptatem beatae esse
            unde? Iure, rem enim! Nobis sit non ullam dicta quisquam illo.
          </div>
          <div className="button_container">
            <Link className="button" to={'login'}>
              Login
            </Link>
            <Link className="button" to={'signup'}>
              Sign Up
            </Link>
          </div>
          <div className="home_content">
            To see more projects visit my portfolio{' '}
            <a className="link" href="http://youtube.com" target={"_blank"} rel="noopener">
              here
            </a>
          </div>
        </>
      ) : (
        <>
          <h2>Login to start using the editor</h2>
          <Outlet />
        </>
      )}
    </div>
  )
}
