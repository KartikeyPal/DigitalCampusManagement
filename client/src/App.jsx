import './App.css'
import { Route,Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import About from './pages/About.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='*' element={<h1>404 Not Found</h1>}/>
        <Route path='/about' element={<About />}/>
      </Routes>
    </>
  )
}

export default App
