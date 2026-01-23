import './App.css'
import { Route,Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='*' element={<h1>404 Not Found</h1>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/about' element={<h1>About Page</h1>}/>
      </Routes>
    </>
  )
}

export default App
