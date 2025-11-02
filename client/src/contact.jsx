import { useState } from "react";

//This is the Contact page. It shows contact info and a form to send a message.
export default function Contact() {
	// State for form fields
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		contactNumber: "",
		email: "",
		message: ""
	});
	// State to show thank you message
	const [submitted, setSubmitted] = useState(false);

	// Update form state when user types
	function handleChange(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	// When form is submitted, show a popup thank you message and reset form
	function handleSubmit(e) {
		e.preventDefault();
		window.alert("Thank you for reaching out! Your message has been received. I will get back to you soon.");
		setForm({
			firstName: "",
			lastName: "",
			contactNumber: "",
			email: "",
			message: ""
		});
	}

	return (
		<div className="contact-page">
			<h2>Contact Me</h2>
			{/* Contact information panel */}
			<div className="contact-info">
				<p><strong>Email:</strong> alex.joseph7068@gmail.com</p>
				<p><strong>Phone:</strong> (416) 639-0930</p>
				<p><strong>Location:</strong> Toronto, ON, Canada</p>
			</div>
			 {/* Contact form for user messages */}
			 <form className="contact-form" onSubmit={handleSubmit}>
				 <div className="form-row">
					 <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
					 <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
				 </div>
				 <div className="form-row">
					 <input type="text" name="contactNumber" placeholder="Contact Number" value={form.contactNumber} onChange={handleChange} required />
				 </div>
				 <div className="form-row">
					 <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
				 </div>
				 <div className="form-row">
					 <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required rows={4} />
				 </div>
				 <button type="submit">Send Message</button>
			 </form>
		</div>
	);
}