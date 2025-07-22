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
import Inventory from './pages/Inventory'
import Sales from './pages/Sales'
import SalesDetailed from './components/Sales/SalesDetailed'
import { Toaster } from 'react-hot-toast';
import InventoryDetailed from './components/Inventory/InventoryDetailed';

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
          <Route path='/inventory' exact element={<Inventory />} />
          <Route path='/inventory/:id' element={<InventoryDetailed />} />
          <Route path='/sales' exact element={<Sales />} />
          <Route path="/sales/:id" element={<SalesDetailed />} />
          
        </Routes>
      </Router>
      <Toaster position="bottom-right" />
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
