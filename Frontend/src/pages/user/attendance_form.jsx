import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddAttendance = () => {
  const [formData, setFormData] = useState({
    name: '',
    staff_id: '',
    master: '',
    location: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for adding attendance
  const handleAddAttendance = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch('http://localhost:8000/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          staff_name: formData.name,
          staff_Id: formData.staff_id,
          master: formData.master,
          location: formData.location,
          date: new Date().toISOString().split('T')[0], // Add current date
        }),
      });

      // Check if the response is not OK (e.g., 404, 500, etc.)
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }

      const newAttendance = await result.json();
      setError(null); // Clear any previous errors
      alert("attendance submition successfull")
    } catch (error) {
      console.error('Error adding attendance record:', error);
      setError('Failed to add attendance record. Please try again.'); // Set error message
    }
  };

  return (
    <div className='text-center'>
      <h1>Add Attendance</h1>

      {/* Add Attendance Form */}
      <form className='pb-5' onSubmit={handleAddAttendance}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="staff_id"
          value={formData.staff_id}
          onChange={handleInputChange}
          placeholder="Staff ID"
          required
        />
        <input
          type="text"
          name="master"
          value={formData.master}
          onChange={handleInputChange}
          placeholder="Master"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Location"
          required
        />
        <button type="submit">Add Attendance</button>
      </form>

      {/* Display error message if there's an error */}
      {error && <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>}

      {/* Button to navigate back to the attendance list */}
    </div>
  );
};

export default AddAttendance;