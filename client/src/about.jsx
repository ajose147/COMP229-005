//This is the About Me page. It shows your name, photo, bio, and resume link.
export default function About() {
	return (
		<div className="about-page">
			{/*Placeholder image for your photo */}
			<h2>About Me</h2>
			<img src="Headshot.jpg" alt="Headshot" className="about-photo" />
			{/*Your legal name */}
			<h3>Alex Joseph</h3>
			{/*Short bio */}
			<p>
				I am an Artificial Intelligence-Software Engineering student at Centennial College. I am dedicated to developing my skills in software development, machine learning, and AI technologies. I am eager to contribute to innovative projects and collaborate with others in the tech industry.
			</p>
			{/*Link to your resume PDF */}
			<a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="resume-link">View My Resume (PDF)</a>
		</div>
	);
}
