import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api';
import './NewRequisition.css';

const NewRequisition = () => {
  const [formData, setFormData] = useState({
    resourceId: '',
    eventName: '',
    expectedAttendance: '',
    startDateTime: '',
    endDateTime: ''
  });
  const [resources, setResources] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingResources, setLoadingResources] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/resources`);
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
      setError('Failed to load resources');
    } finally {
      setLoadingResources(false);
    }
  };

  const getSelectedResource = () => {
    return resources.find(r => r._id === formData.resourceId);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Navigate to payment page with booking details
    navigate('/payment', { state: { bookingData: formData } });
  };

  if (loadingResources) {
    return <div className="loading">Loading resources...</div>;
  }

  return (
    <div className="container">
      <div className="requisition-header">
        <h1>New Requisition Request</h1>
        <p>Submit a new booking request for a resource</p>
      </div>

      <div className="card">
        {error && (
          <div className="alert alert-error" style={{ whiteSpace: 'pre-line' }}>
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="resourceId">Resource *</label>
            <select
              id="resourceId"
              name="resourceId"
              value={formData.resourceId}
              onChange={handleChange}
              required
            >
              <option value="">Select a resource</option>
              {resources.map(resource => (
                <option key={resource._id} value={resource._id}>
                  {resource.name} ({resource.type}) - Capacity: {resource.capacity}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="eventName">Event Name *</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              required
              placeholder="e.g., Annual Cultural Night"
            />
          </div>

          <div className="form-group">
            <label htmlFor="expectedAttendance">
              Expected Attendance *
              {formData.resourceId && getSelectedResource() && (
                <span style={{ fontSize: '0.9rem', color: '#666', fontWeight: 'normal', marginLeft: '0.5rem' }}>
                  (Max: {getSelectedResource().capacity})
                </span>
              )}
            </label>
            <input
              type="number"
              id="expectedAttendance"
              name="expectedAttendance"
              value={formData.expectedAttendance}
              onChange={handleChange}
              required
              min="1"
              max={formData.resourceId && getSelectedResource() ? getSelectedResource().capacity : undefined}
              placeholder="Number of expected attendees"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDateTime">Start Date & Time *</label>
              <input
                type="datetime-local"
                id="startDateTime"
                name="startDateTime"
                value={formData.startDateTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDateTime">End Date & Time *</label>
              <input
                type="datetime-local"
                id="endDateTime"
                name="endDateTime"
                value={formData.endDateTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Proceed to Payment'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRequisition;


