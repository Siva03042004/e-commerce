// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import '../Styles/Contact.css';
import Navbar from "../Components/Navbar";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for handling errors
  const [success, setSuccess] = useState(false); // State for handling successful submissions

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("138bc21e-93f2-4d8b-b4de-d4673c483629", import.meta.env.VITE_YOUR_ACCESS_KEY_HERE);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    setLoading(true);
    setError(null);
    setSuccess(false); // Reset success state before new submission

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      }).then((res) => res.json());

      if (res.success) {
        console.log("Success", res);
        alert("Message sent"); // Alert when message is successfully sent
        event.target.reset(); // Clear the form fields
        setSuccess(true); // Set success state
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error("Error:", error);
      setError("There was an issue sending your message. Please try again."); // Set error state
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact-container">
        <h2 className="contact-heading">Contact Us</h2>
        <p className="contact-instructions">Kindly contact us using the form below</p>
        {error && <div className="error-message">{error}</div>} {/* Display error message */}
        {success && <div className="success-message">Your message has been sent successfully!</div>} {/* Display success message */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="contact-label">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="contact-input"
            />
          </div>
          <div>
            <label htmlFor="email" className="contact-label">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="contact-input"
            />
          </div>
          <div>
            <label htmlFor="message" className="contact-label">Message</label>
            <textarea
              name="message"
              id="message"
              required
              className="contact-textarea"
            ></textarea>
          </div>
          <button
            type="submit"
            className="contact-button"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Submitting..." : "Submit Form"} {/* Change button text on loading */}
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
