// importing neccessary components
import { useEffect } from "react";
import { Link } from 'react-router-dom';

// Mobile Menu - menu for smaller screens such as tablets and phones
export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
    
    // Effect that prevents scrolling when the menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        // Cleanup that enables scrolling again when mobile menu is closed
        return () => {
            document.body.style.overflow = "";};}, [menuOpen]
        );

    // Function that closes the mobile menu whenever a link is clicked
    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return (
        // Mobile menu container - this opens when the hamburger icon is clicked
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
            {/* Mobile navigation links */}
            <Link to="/" onClick={handleLinkClick}>Home</Link>
            <Link to="/about" onClick={handleLinkClick}>About</Link>
            <Link to="/projects" onClick={handleLinkClick}>Projects</Link>
            <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
            <Link to="/education" onClick={handleLinkClick}>Education</Link>
        </div>
    );
};