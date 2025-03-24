// src/components/StaffCard.js
import React from 'react';

const StaffCard = ({ staff }) => {
    return (
        <div className="card" style={{ width: '18rem', margin: '10px' }}>
            <img src={staff.profileImage || 'default-image.jpg'} className="card-img-top" alt="Profile" />
            <div className="card-body">
                <h5 className="card-title">{staff.name}</h5>
                <p className="card-text">Staff ID: {staff.staff_Id}</p>
                <p className="card-text">Age: {staff.age}</p>
                <p className="card-text">Phone Number: {staff.phone_Number}</p>
                <a href="#" className="btn btn-primary">View Details</a>
            </div>
        </div>
    );
};

export default StaffCard;