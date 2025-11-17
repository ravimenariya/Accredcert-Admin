import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Services from './pages/Services'
import Service from './pages/Service'
import Addservice from './pages/Addservice'
import Countries from './pages/Countries'
import Blogs from './pages/Blogs'
import Blog from './pages/Blog'
import AddBlogs from './pages/AddBlogs'
import Certificates from './pages/Certificates'
import AddCertificates from './pages/AddCertificates'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/services'element={<Services/>}></Route>
        <Route path='/services/:id' element={<Service/>}></Route>
        <Route path='/addservice' element={<Addservice/>}></Route>
        <Route path='/countries' element={<Countries/>}></Route>
        <Route path='/blogs' element={<Blogs/>}></Route>
        <Route path='/blogs/:id' element={<Blog/>}></Route>
        <Route path='/addblog' element={<AddBlogs/>}></Route>
        <Route path='/certificates' element={<Certificates/>}></Route>
        <Route path='/addcertificates' element={<AddCertificates/>}></Route>
      </Routes>
    </div>
  )
}

export default App