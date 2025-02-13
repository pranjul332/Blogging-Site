import React from 'react'
import {BrowserRouter, Route, Routes,useLocation} from 'react-router-dom'
import Navbar from './Navbar'
import Home from './comp/Home'
import About from './comp/About'
import Travel from './comp/Travel'
import Eat from './comp/Eat'
import Relax from './comp/Relax'
import Error from './comp/Error'
import NavBelow from './NavBelow'
import Create from './side/Create'
import Profile from './side/Profile'
import Login from './auth/Login'
import Registration from './auth/Registration'

const App = () => {
  const location = useLocation()
  const hideNavbarPaths = ['/Create',];
  


  return (
    <div>
       {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
    
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/About' element={<About/>}></Route>
        <Route path='/Travel' element={<Travel/>}></Route>
        <Route path='/Eat'element={<Eat/>}></Route>
        <Route path='/Relax'element={<Relax/>}></Route>
        {/* <Route path='/Videos'element={<Videos/>}></Route>    */}
        <Route path='/Profile' element={<Profile/>}></Route>   
        <Route path='/Create' element={<Create/>}></Route>   
        <Route path='/Library' element={<Error/>}></Route>   
        <Route path='/login' element={<Login />}>Login</Route>
        <Route path='/registration' element={<Registration />}>Registration</Route>
        <Route path='*' element={<Error/>}></Route>

        
        
      </Routes>
    <NavBelow/>
   
    </div>
  )
}

export default App
