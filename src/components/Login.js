import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from './Alert';
import "../css/Login.css"; // Make sure to import the updated CSS

const Login = ({ handleLogin }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);

      if (response.data && response.data.authtoken) {
        localStorage.setItem('token', response.data.authtoken);
        handleLogin();
        setSuccess('Login successful!');
        setTimeout(() => {
          navigate('/');
        }, 1000); // Delay the redirection slightly to show the success message
      } else {
        setError('Login failed, no token received.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error || 'Invalid credentials, please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login to iNotes</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>

        {/* Display alerts */}
        {error && <Alert message={error} type="error" onClose={() => setError(null)} />}
        {success && <Alert message={success} type="success" onClose={() => setSuccess(null)} />}

        {/* Sign up link */}
        <div className="signup-link">
          <span>Don't have an account? <Link to="/signup">Sign up</Link></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
