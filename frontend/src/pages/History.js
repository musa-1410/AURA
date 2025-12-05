import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config/api';
import './MyBookings.css';

const History = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/bookings/my-bookings`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter to only show past bookings
  const now = new Date();
  const pastBookings = bookings.filter(booking => {
    const endDateTime = new Date(booking.endDateTime);
    return endDateTime < now;
  });

  const filteredBookings = filter === 'all' 
    ? pastBookings 
    : pastBookings.filter(booking => booking.status === filter);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="bookings-header">
        <h1>Booking History</h1>
        <p>View your past booking requests</p>
      </div>

      <div className="bookings-filter">
        <label htmlFor="status-filter">Filter by Status:</label>
        <select
          id="status-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="form-group select"
        >
          <option value="all">All Bookings</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="empty-state">
          <h3>No past bookings found</h3>
          <p>You don't have any completed bookings yet.</p>
        </div>
      ) : (
        <div className="bookings-table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Resource</th>
                <th>Start Date & Time</th>
                <th>End Date & Time</th>
                <th>Expected Attendance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map(booking => (
                <tr key={booking._id}>
                  <td>{booking.eventName}</td>
                  <td>
                    {booking.resource.name} ({booking.resource.type})
                  </td>
                  <td>{formatDateTime(booking.startDateTime)}</td>
                  <td>{formatDateTime(booking.endDateTime)}</td>
                  <td>{booking.expectedAttendance}</td>
                  <td>
                    <span className={`badge badge-${booking.status}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="bookings-stats">
        <div className="stat-item">
          <span className="stat-label">Total Past Bookings:</span>
          <span className="stat-value">{pastBookings.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Approved:</span>
          <span className="stat-value approved">
            {pastBookings.filter(b => b.status === 'approved').length}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Pending:</span>
          <span className="stat-value pending">
            {pastBookings.filter(b => b.status === 'pending').length}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Rejected:</span>
          <span className="stat-value rejected">
            {pastBookings.filter(b => b.status === 'rejected').length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default History;

