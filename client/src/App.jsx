import './App.css'
import { Route,Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='*' element={<h1>404 Not Found</h1>}/>
      </Routes>
    </>
  )
}

export default App
