import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Spinner from "../../UiComponents/Spinner/Spinner"
import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";

const Profile = () => {
  const { user, logoutUser, getProfile } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the full profile data when the component loads
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      const data = await getProfile();
      setProfileData(data);
      setIsLoading(false);
    };

    if (user) {
      fetchProfile();
    }
  }, [user, getProfile]);

  if (isLoading) {
    return <div className="profile-container"><Spinner /></div>;
  }

  if (!profileData) {
    return <div className="profile-container"><p>Could not load profile.</p></div>;
  }
  
  const handleAddAddress = () => {
    alert("Logic to add address goes here!");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">My Profile</h2>
        
        <div className="profile-info">
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Status:</strong> 
            <span className={`status-badge status-${profileData.status}`}>
              {profileData.status}
            </span>
          </p>
        </div>

        <hr />

        <div className="address-section">
          <h3 className="address-title">My Addresses</h3>
          {profileData.addresses && profileData.addresses.length > 0 ? (
            <ul className="address-list">
              {profileData.addresses.map((addr) => (
                <li key={addr._id} className="address-item">
                  <div className="address-details">
                    <strong>{addr.type.charAt(0).toUpperCase() + addr.type.slice(1)}</strong>
                    {addr.isDefault && <span className="default-badge">Default</span>}
                    <p>
                      {addr.street}, {addr.city}, {addr.state} {addr.zipCode}
                    </p>
                  </div>
                  <div className="address-actions">
                    <button className="btn btn-secondary btn-sm">Edit</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-address-msg">You have no saved addresses.</p>
          )}
          <button onClick={handleAddAddress} className="btn btn-primary mt-3">
            Add New Address
          </button>
        </div>
        
        <hr />

        <button onClick={logoutUser} className="allItems-btn w-100">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;