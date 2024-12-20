import React, { useState } from "react";
import "./LoginForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert("Error logging in");
    }
  };

  return (
    <div className="login-container">
      <h1>Login with your Paytm account</h1>
      <p>Paytm App user? No need to create a new account</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="emailOrMobile">Enter your Mobile Number or Email</label>
          <input
            type="text"
            id="emailOrMobile"
            name="emailOrMobile"
            placeholder="Email/Mobile Number"
            required
            value={formData.emailOrMobile}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Paytm Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="login-button">Sign in Securely</button>
      </form>
      <div className="additional-links">
        <a href="/forgot-password">Forgot Password</a>
        <a href="/register">New to Paytm? Create an Account</a>
      </div>
    </div>
  );
};

export default LoginForm;
