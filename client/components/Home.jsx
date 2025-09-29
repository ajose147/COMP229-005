import { Link } from 'react-router-dom';

// This is the Home page. It welcomes users and links to other pages.
export default function Home() {
	return (
		<div className="home-page">
			{/* Welcome message and mission statement */}
			<h2>Welcome to My Portfolio!</h2>
			<p>
				Thank you for visiting my personal portfolio website. Here you can learn more about me, my work, and how to get in contact with me.
			</p>
			<blockquote className="mission-statement">
				"My mission is to graduate and pursue a career in software development and artificial intelligence."
			</blockquote>
			{/* Navigation buttons to other pages */}
			<div className="home-links">
				<Link to="/about" className="home-btn">About Me</Link>
				<Link to="/project" className="home-btn">Projects</Link>
				<Link to="/services" className="home-btn">Services</Link>
				<Link to="/contact" className="home-btn">Contact Me</Link>
			</div>
		</div>
	);
}
