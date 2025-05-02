import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Home from './pages/Dashboard/Home'

import UserProvider from './context/UserContext'

const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/signup' exact element={<Signup />} />
          <Route path='/dashboard' exact element={<Home />} />
          
        </Routes>
      </Router>
    </div>
    </UserProvider>
  )
}

export default App

const Root = ()=>{
  //checking token in local storage
  let isAuthenticated = !!localStorage.getItem("token");
  
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ):(
    <Navigate to="/login" />
  )

}
