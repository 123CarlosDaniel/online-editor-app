import './App.css'
import { Routes, Route} from 'react-router-dom'
import EditorPage from './pages/EditorPage'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Home from './pages/Home'
import Panel from './pages/Panel'


function App() {
  

  return (
    <Routes>
      <Route path='/' element={<Home/>}>
        <Route index path='login' element={<Login/>}/>
        <Route path='signup' element={<SignUp/>}/>
      </Route>
      <Route path='/panel' element={<Panel/>}/>
      <Route path='/editor' element={<EditorPage/>}/>
    </Routes>
  )
}

export default App
