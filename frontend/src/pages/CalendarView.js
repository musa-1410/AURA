import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import API_URL from '../config/api';
import 'react-calendar/dist/Calendar.css';
import './CalendarView.css';

const CalendarView = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState('all');

  useEffect(() => {
    fetchBookings();
    fetchResources();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/bookings/all`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchResources = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/resources`);
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const getBookingsForDate = (date) => {
    const dateStr = date.toDateString();
    let filtered = bookings.filter(booking => {
      const bookingDate = new Date(booking.startDateTime).toDateString();
      return bookingDate === dateStr;
    });

    if (selectedResource !== 'all') {
      filtered = filtered.filter(booking => 
        booking.resource._id === selectedResource
      );
    }

    return filtered;
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayBookings = getBookingsForDate(date);
      if (dayBookings.length > 0) {
        return (
          <div className="calendar-booking-indicator">
            {dayBookings.length}
          </div>
        );
      }
    }
    return null;
  };

  const selectedDateBookings = getBookingsForDate(selectedDate);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="calendar-page-header">
        <h1>Resource Calendar</h1>
        <p>View all approved bookings across all resources</p>
      </div>

      <div className="calendar-filter">
        <label htmlFor="resource-filter">Filter by Resource:</label>
        <select
          id="resource-filter"
          value={selectedResource}
          onChange={(e) => setSelectedResource(e.target.value)}
          className="form-group select"
        >
          <option value="all">All Resources</option>
          {resources.map(resource => (
            <option key={resource._id} value={resource._id}>
              {resource.name} ({resource.type})
            </option>
          ))}
        </select>
      </div>

      <div className="calendar-layout">
        <div className="calendar-wrapper">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={tileContent}
            className="custom-calendar"
          />
        </div>

        <div className="calendar-bookings">
          <h2>
            Bookings for {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h2>
          {selectedDateBookings.length === 0 ? (
            <div className="empty-state">
              <p>No bookings for this date</p>
            </div>
          ) : (
            <div className="bookings-list">
              {selectedDateBookings.map(booking => (
                <div key={booking._id} className="booking-card">
                  <div className="booking-header">
                    <h3>{booking.eventName}</h3>
                    <span className="badge badge-approved">{booking.status}</span>
                  </div>
                  <div className="booking-details">
                    <p><strong>Resource:</strong> {booking.resource.name} ({booking.resource.type})</p>
                    <p><strong>Society:</strong> {booking.society}</p>
                    <p><strong>Time:</strong> {new Date(booking.startDateTime).toLocaleTimeString()} - {new Date(booking.endDateTime).toLocaleTimeString()}</p>
                    <p><strong>Expected Attendance:</strong> {booking.expectedAttendance}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;




