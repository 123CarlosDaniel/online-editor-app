import './App.css'
import { Routes, Route } from 'react-router-dom'
import EditorPage from './pages/EditorPage'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Home from './pages/Home'
import Panel from './pages/Panel'
import Auth from './pages/Auth'
import Protected from './pages/Protected'
import PersistLogin from './pages/PersistLogin'
import NewRoom from './pages/NewRoom'
import Privated from './pages/Privated'
import AccessRoom from './pages/AccessRoom'

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Home />} />
        <Route element={<Auth />}>
          <Route index path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route element={<Protected />}>
          <Route path="/panel" element={<Panel />} />
          <Route path="/newRoom" element={<NewRoom />} />
          <Route element={<Privated />}>
            <Route path="/editor/:roomName" element={<EditorPage />} />
            <Route path="/access/:roomId" element={<AccessRoom />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
