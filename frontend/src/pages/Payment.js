import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api';
import './Auth.css';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state?.bookingData || null;

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!bookingData) {
      setError('No booking details found. Please start a new requisition.');
    }
  }, [bookingData]);

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!bookingData) {
      setError('No booking details found. Please start a new requisition.');
      return;
    }

    if (!paymentData.cardNumber || !paymentData.cardHolder || !paymentData.expiryDate || !paymentData.cvv) {
      setError('Please fill in all payment details.');
      return;
    }

    setLoading(true);

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const response = await axios.post(`${API_URL}/api/bookings`, bookingData);

      setSuccess('Payment successful! Your booking has been created and approved.');

      setTimeout(() => {
        navigate('/my-bookings');
      }, 1500);
    } catch (err) {
      if (err.response?.status === 409) {
        setError(err.response.data.message || 'Booking conflict detected. Please choose a different time slot.');
        if (err.response.data.conflictingBookings) {
          const conflicts = err.response.data.conflictingBookings;
          setError(prev => prev + '\n\nConflicting bookings:\n' +
            conflicts.map(c => `- ${c.eventName} (${new Date(c.startDateTime).toLocaleString()})`).join('\n'));
        }
      } else if (err.response?.status === 400) {
        // Handle validation errors (including capacity exceeded)
        setError(err.response?.data?.message || 'Invalid booking details. Please check your input and try again.');
      } else {
        setError(err.response?.data?.message || 'Payment failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Payment Details</h2>
        <p className="auth-subtitle">
          Enter dummy payment information to complete your booking.
        </p>

        {error && (
          <div className="auth-alert auth-alert-error" style={{ whiteSpace: 'pre-line' }}>
            {error}
          </div>
        )}
        {success && (
          <div className="auth-alert auth-alert-success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardHolder">Name on Card</label>
            <input
              type="text"
              id="cardHolder"
              name="cardHolder"
              value={paymentData.cardHolder}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handleChange}
              placeholder="1111 2222 3333 4444"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={paymentData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="password"
                id="cvv"
                name="cvv"
                value={paymentData.cvv}
                onChange={handleChange}
                placeholder="123"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading || !bookingData}
          >
            {loading ? 'Processing...' : 'Pay & Confirm Booking'}
          </button>

          <button
            type="button"
            className="auth-link-button"
            onClick={() => navigate('/new-requisition')}
          >
            Back to Requisition
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;


