import { useSelector } from 'react-redux'
import { selectAccessToken } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'
import Sample from '../assets/sample-editor.webm'

export default function Home() {
  const { accessToken } = useSelector(selectAccessToken)
  return (
    <div className="Layout">
      <h2>Welcome to my app</h2>
      <div className="button_container">
        <Link className="button" to={'/panel'}>
          Panel
        </Link>
        {!accessToken ? (
          <>
            <Link className="button" to={'/login'}>
              Login
            </Link>
            <Link className="button" to={'/signup'}>
              Sign Up
            </Link>
          </>
        ) : null}
      </div>

      <div className="home_content">
        <h3>Online Editor</h3>
        <p>
          This app is a code editor like vs-code, but you can code in real time
          with your friends.
        </p>
        <div className="video_container">
        <video src={Sample} controls></video>
      </div>
        <h4>How to use it ? </h4>
        <p>
          To use my app, you need to create an account{' '}
          <Link to={'/signup'} className="link">
            here
          </Link>
          , then you will redirect to your panel, there will be nothing since
          you have not yet created a room. So create a room, and you will
          redirect again to your panel, but there will be a room created, click
          in join and start coding. <br />
          To start collabarating with your friends you need to add him as a
          contact and give him access.
        </p>
      </div>
      
      <div className="home_content">
        To see more projects visit my portfolio{' '}
        <a
          className="link"
          href="http://youtube.com"
          target={'_blank'}
          rel="noopener"
        >
          here
        </a>
      </div>
    </div>
  )
}
