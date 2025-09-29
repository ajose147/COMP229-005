//This is the Projects page. It shows three sample projects with images and descriptions.
export default function Project() {
	return (
		<div className="projects-page">
			<h2>Highlighted Projects</h2>
			<div className="projects-list">
				{/*Project 1 */}
				<div className="project-item">
					<img src="Project1.jpg" alt="Project 1" className="project-img" />
					<h3>Image Gallery</h3>
					<p>Designed and developed an image gallery application using HTML, CSS, and JavaScript. User can change the transition speed between images.</p>
				</div>
				{/*Project 2 */}
				<div className="project-item">
					<img src="Project2.jpg" alt="Project 2" className="project-img" />
					<h3>Basal Metabolic Rate (BMR) Calculator</h3>
					<p>Created a BMR calculator that allows users to input their age, weight, height, and activity level to calculate their daily caloric needs.</p>
				</div>
				{/* Project 3 */}
				<div className="project-item">
					<img src="Project3.jpg" alt="Project 3" className="project-img" />
					<h3>Bug Smasher Game</h3>
					<p>Developed a fun and interactive bug smasher game using JavaScript and HTML5 Canvas. Implemented game mechanics, scoring, and animations.</p>
				</div>
			</div>
		</div>
	);
}
