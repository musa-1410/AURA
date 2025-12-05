import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import API_URL from '../config/api';
import './Auth.css';

const Register = () => {
  const societies = [
    'GMS', 'AIESEC', 'AIFS', 'ASHRAE', 'LDS', 'SOPHEP', 'ASME', 'CDES', 'IEEE', 
    'NAQSH', 'ASM', 'ACM', 'SPIE', 'SCIENCE', 'WES', 'IET', 'AIAA', 'AIChE', 
    'NETRONIX', 'CBS', 'MEDIA', 'PT', 'SPORTS', 'IMEChE', 'LES', 'TEAM URBAN', 
    'TEAM HAMMERHEAD', 'TEAM FOXTROT', 'MICROSOFT CLUB', 'TEAM SWIFT', 'GDGOc', 'NEXUS',
    'Cricket Team', 'Football Team', 'Basketball Team', 'Tennis Team', 'Badminton Team', 
    'Table Tennis Team', 'Snooker Team', 'Squash Team', 'Volleyball Team'
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    society: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, formData);
      login(response.data.token, response.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>AURA</h1>
        <h2>Register</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="society">Society</label>
            <select
              id="society"
              name="society"
              value={formData.society}
              onChange={handleChange}
              required
            >
              <option value="">Select a society</option>
              {societies.map(society => (
                <option key={society} value={society}>
                  {society}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;




