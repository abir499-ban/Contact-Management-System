import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import D from './pages/D'
import { AuthContextProvider } from './context/Authcontext'


function App() {


  return (
    <>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path='/' element={<D />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </Layout>
        </BrowserRouter>
    </>
  )
}

export default App
