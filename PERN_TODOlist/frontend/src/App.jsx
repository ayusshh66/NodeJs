import React from 'react'
import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Todo from './pages/Todo' 


function App() {
  const [user, setUser] = useState("")
  return (
    <>
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Home setUser={setUser} user={user}/>}/>
        <Route path='/todo' element={<Todo setUser={setUser} user={user}/>}/>
      </Routes>

    </BrowserRouter>
    </>
  )
}

export default App