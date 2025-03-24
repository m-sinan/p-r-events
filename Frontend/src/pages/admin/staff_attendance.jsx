import React, { useEffect, useState } from 'react';

function Staff_attendance() {
  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  // Fetch attendance data
  const fetchattendanceData = async () => {
    try {
      const result = await fetch(`http://localhost:8000/api/attendance/${search}`);
      
      // Check if the response is not OK (e.g., 404, 500, etc.)
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }


      const jsonResult = await result.json();
      setAttendance(jsonResult); // Update attendance data
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      setError('Failed to fetch attendance data. Please try again.'); // Set error message
      setAttendance([]); // Clear attendance data in case of error
    }
  };

  // Delete attendance record
  const deleteAttendance = async (id) => {
    try {
      const result = await fetch(`http://localhost:8000/api/attendance/${id}`, {
        method: 'DELETE', // Use DELETE method
      });

      // Check if the response is not OK (e.g., 404, 500, etc.)
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }

      // Remove the deleted record from the UI
      setAttendance(attendance.filter((record) => record._id !== id));
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error deleting attendance record:', error);
      setError('Failed to delete attendance record. Please try again.'); // Set error message
    }
  };

  // Clear data on initial load
  useEffect(() => {
    setAttendance([]); // Clear attendance data
  }, []);

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    fetchattendanceData(); // Fetch data only when the button is clicked
  };

  return (
    <div className='text-center'>
      <form className='pb-5' onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Id or location"
        />
        <button type="submit">Search</button>
      </form>

      {/* Display error message if there's an error */}
      {error && <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>}

      <table className="table text-center">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Date</th>
            <th scope="col">Master</th>
            <th scope="col">Location</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((attendance) => (
            <tr key={attendance._id}>
              <td>{attendance.staff_Id}</td>
              <td>{attendance.staff_name}</td>
              <td>{attendance.date}</td>
              <td>{attendance.master}</td>
              <td>{attendance.location}</td>
              <div><td> <button onClick={() => deleteAttendance(attendance._id)}>Delete</button></td>            
              </div>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Staff_attendance;

