import React, { useEffect, useState } from "react";
import axios from "axios";

const StaffList = () => {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    staff_Id: "",
    age: "",
    phone_Number: "",
    profileImage: null,
  });
  const [editingStaffId, setEditingStaffId] = useState(null); // Track which staff is being edited

  // Fetch staffs
  const fetchStaffs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/staffs");
      setStaffs(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete staff
  const deleteStaff = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/staffs/${id}`);
      fetchStaffs(); // Refresh the list after deletion
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("staff_Id", formData.staff_Id);
      data.append("age", formData.age);
      data.append("phone_Number", formData.phone_Number);
      if (formData.profileImage) {
        data.append("profileImage", formData.profileImage);
      }

      if (editingStaffId) {
        // Update existing staff
        const response = await axios.put(
          `http://localhost:8000/api/staffs/${editingStaffId}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          fetchStaffs(); // Refresh the list after update
          setEditingStaffId(null); // Reset editing state
        }
      } else {
        // Create new staff
        const response = await axios.post(
          "http://localhost:8000/api/staffs",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          fetchStaffs(); // Refresh the list after creation
        }
      }

      // Reset form
      setFormData({
        name: "",
        staff_Id: "",
        age: "",
        phone_Number: "",
        profileImage: null,
      });
      setError(null); // Clear errors
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to process staff profile."
      );
    }
  };

  // Set form data for editing
  const handleEdit = (staff) => {
    setEditingStaffId(staff._id);
    setFormData({
      name: staff.name,
      staff_Id: staff.staff_Id,
      age: staff.age,
      phone_Number: staff.phone_Number,
      profileImage: null, // Reset file input (optional)
    });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingStaffId(null);
    setFormData({
      name: "",
      staff_Id: "",
      age: "",
      phone_Number: "",
      profileImage: null,
    });
  };

  // Fetch staffs on component mount
  useEffect(() => {
    fetchStaffs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>STAFFS</h1>

      {/* Create/Update Staff Form */}

      <form className="row g-3" onSubmit={handleSubmit}>
  <div className="col-md-6">
    <input  type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required className="form-control" 
            placeholder="staff name"/>
  </div>
  <div className="col-md-6">
    <input type="text"
            name="staff_Id"
            value={formData.staff_Id}
            onChange={handleInputChange}
            required className="form-control"
            placeholder="staff_Id"/>
  </div>
  <div className="col-12">
    <input  type="text"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required className="form-control"
            placeholder="staff age"/>
  </div>
  <div className="col-12">
    <input  type="text"
            name="phone_Number"
            value={formData.phone_Number}
            onChange={handleInputChange}
            required className="form-control" placeholder="phone number"/>
  </div>
  <div className="col-md-6">
    <input  type="file"
            name="profileImage"
            onChange={handleFileChange}
            required={!editingStaffId} className="form-control"/>
  </div>
  <div className="col-12">
  <button type="submit" className="btn btn-primary">
          {editingStaffId ? "Update Staff" : "Create Staff"}
        </button>
  </div>
  <div className="col-12">
  {editingStaffId && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel Edit
          </button>
        )}
  </div>
</form>
      {/* Staff List */}
        <div className="row row-cols-1 row-cols-md-4 g-4 mt-3 ">
        {staffs.map((staff) => (
          <div key={staff._id}  className="col">
            <div className="card h-100">
              <img
                src={`/uploads/${staff.profileImage}`}
                className="card-img-top"
                alt={staff.name}
              />
              <div className="card-body">
                <h4 className="card-title fw-bold">{staff.name}</h4>
                <h6 className="card-text">Staff ID: {staff.staff_Id}</h6>
                <h6 className="card-text">age: {staff.age}</h6>
                <p className="card-text">phone: {staff.phone_Number}</p>
              </div>
              <button className="btn btn-dark mb-2" onClick={() => handleEdit(staff)}>Edit</button>
              <button className="btn btn-dark" onClick={() => deleteStaff(staff._id)}>Delete</button>
            </div>
          </div>
                ))}
        </div>
    </div>
  );
};

export default StaffList;
