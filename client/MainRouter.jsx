// React and React Router imports
import React from 'react'
import { Route, Routes } from 'react-router-dom'

// All page imports
import Home from './components/home.jsx'
import About from './src/about.jsx'
import Contact from './src/contact.jsx'
import Education from './src/education.jsx'
import Project from './src/project.jsx'
import Signin from './src/signin.jsx'
import Signup from './src/signup.jsx'
import Layout  from './components/layout.jsx'
import Services from './src/services.jsx'

// Main router that defines all app routes
const MainRouter = () => {
    return (<div>
        {/* Navigation layout - appears on all pages */}
        <Layout/>
        
        <Routes>
            {/* Homepage route */}
            <Route exact path='/' element={<Home/>} />
            {/* About page route */}
            <Route exact path='/about' element={<About/>} />
            {/* Contact page route */}
            <Route exact path='/contact' element={<Contact/>} />
            {/* Education page route */}
            <Route exact path='/education' element={<Education/>} />
            {/* Projects page route */}
            <Route exact path='/Project' element={<Project/>} />
            {/* Services page route */}
            <Route exact path='/services' element={<Services/>} />
            {/* Layout route */}
            <Route exact path='/Layout' element={<Layout/>} />
            <Route exact path='/signin' element={<Signin/>} />
            <Route exact path='/signup' element={<Signup/>} />
        </Routes>
    </div>)
}
export default MainRouter