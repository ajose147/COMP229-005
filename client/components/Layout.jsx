import React from 'react';
import { Link } from 'react-router-dom';
export default function Layout() {
return (
<>
<div className="navbar-container">
    {/* Custom Logo (served from public/) */}
    <img src="/Logo.png" alt="Logo" className="navbar-logo" />
	<h1 className="navbar-title">My Portfolio</h1>
</div>
<nav className="navbar-links">
	<Link to="/">Home</Link> | 
    <Link to="/about">About</Link> | 
    <Link to="/services">Services</Link> | 
    <Link to="/project">Project</Link> | 
    <Link to="/contact">Contact</Link> |
    <Link to="/signin">Sign in</Link> |
    <Link to="/signup">Sign up</Link> |
</nav>
<br />
<hr />
</>
);
}
