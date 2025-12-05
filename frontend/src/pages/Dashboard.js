import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    myBookings: 0,
    resources: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [bookingsRes, myBookingsRes, resourcesRes] = await Promise.all([
        axios.get(`${API_URL}/api/bookings/all`),
        axios.get(`${API_URL}/api/bookings/my-bookings`),
        axios.get(`${API_URL}/api/resources`)
      ]);

      setStats({
        totalBookings: bookingsRes.data.length,
        myBookings: myBookingsRes.data.length,
        resources: resourcesRes.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Welcome to AURA</h1>
        <p>Campus Requisition Management System</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Resources</h3>
          <p className="stat-number">{stats.resources}</p>
        </div>
        <div className="stat-card">
          <h3>Total Bookings</h3>
          <p className="stat-number">{stats.totalBookings}</p>
        </div>
        <div className="stat-card">
          <h3>My Bookings</h3>
          <p className="stat-number">{stats.myBookings}</p>
        </div>
      </div>

      <div className="quick-actions">
        <Link to="/calendar" className="action-card">
          <h3>View Calendar</h3>
          <p>See all available bookings and resources</p>
        </Link>
        <Link to="/new-requisition" className="action-card">
          <h3>New Requisition</h3>
          <p>Submit a new booking request</p>
        </Link>
        <Link to="/my-bookings" className="action-card">
          <h3>My Bookings</h3>
          <p>View and manage your bookings</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;




