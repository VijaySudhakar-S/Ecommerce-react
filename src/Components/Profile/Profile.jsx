import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import LoadingSpinner from "../../UiComponents/LoadingSpinner/LoadingSpinner";
import AddressModal from "./AddressModal";
import api from "../../api";
import { 
  FaUser, 
  FaMapMarkerAlt, 
  FaSignOutAlt, 
  FaEdit, 
  FaTrash,
  FaPlus,
  FaHome,
  FaBriefcase,
  FaEllipsisH
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";

const Profile = () => {
  const { user, logoutUser, getProfile } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const data = await getProfile();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchProfile();
  }, [user, getProfile]);

  const handleSaveAddress = async (addressData) => {
    try {
      const response = editingAddress
        ? await api.put(`/users/profile/address/${editingAddress._id}`, addressData)
        : await api.post("/users/profile/address", addressData);

      if (response.data.success) {
        setProfileData({ ...profileData, addresses: response.data.addresses });
        setShowAddressModal(false);
        toast.success(`Address ${editingAddress ? 'updated' : 'added'} successfully!`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to save address";
      toast.error(errorMsg);
    }
  };
  
  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    try {
      const response = await api.delete(`/users/profile/address/${addressId}`);
      if (response.data.success) {
        setProfileData({ ...profileData, addresses: response.data.addresses });
        toast.success("Address deleted successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to delete address";
      toast.error(errorMsg);
    }
  };

  const handleAddAddressClick = () => {
    setEditingAddress(null);
    setShowAddressModal(true);
  };

  const handleEditAddressClick = (address) => {
    setEditingAddress(address);
    setShowAddressModal(true);
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case 'home': return <FaHome />;
      case 'work': return <FaBriefcase />;
      default: return <FaEllipsisH />;
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow-sm text-center p-4">
              <h5 className="mb-3">Could not load profile data</h5>
              <button className="btn btn-primary" onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-3">
            <div className="card border-0 shadow-sm h-100 profile-card-hover">
              <div className="card-body text-center p-4">
                {profileData.avatarUrl ? (
                  <img 
                    src={profileData.avatarUrl} 
                    alt="Profile" 
                    className="rounded-circle border mb-3"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                ) : (
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center text-white mb-3 mx-auto profile-gradient"
                    style={{ width: '100px', height: '100px' }}
                  >
                    <FaUser size={40} />
                  </div>
                )}
                
                <h4 className="fw-bold text-dark mb-1">{profileData.name}</h4>
                <p className="text-muted mb-3">{profileData.email}</p>
                
                <span className={`badge mb-4 ${profileData.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                  {profileData.status}
                </span>

                <div className="d-grid">
                  <button onClick={logoutUser} className="btn btn-outline-danger">
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="card account-information-card border-0 shadow-sm">
              <div className="card-header bg-white border-0 p-4">
                <h3 className="card-title mb-0 fw-bold">Account Information</h3>
              </div>
              
              <div className="card-body p-4">
                <div className="row g-5 mb-4">
                  <div className="col-md-6">
                    <div className="bg-light p-3 rounded borderleft w-100">
                      <small className="text-muted d-block mb-1 text-uppercase fw-medium">Full Name</small>
                      <div className="fw-medium text-dark">{profileData.name}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="bg-light p-3 rounded borderleft w-100">
                      <small className="text-muted d-block mb-1 text-uppercase fw-medium">Email Address</small>
                      <div className="fw-medium text-dark">{profileData.email}</div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                  <h5 className="fw-bold mb-0">Saved Addresses</h5>
                  <span className="badge profile-gradient text-white">
                    {profileData.addresses?.length || 0} of 2
                  </span>
                </div>

                {profileData.addresses && profileData.addresses.length > 0 ? (
                  <div className="row g-3 mb-4">
                    {profileData.addresses.map((addr) => (
                      <div key={addr._id} className="col-md-6">
                        <div className="card border h-100 address-card-hover w-100">
                          <div className="card-body p-3">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <div className="d-flex align-items-center">
                                <div className="rounded-circle d-flex align-items-center justify-content-center text-white me-2 profile-gradient"
                                  style={{ width: '32px', height: '32px', fontSize: '12px' }}>
                                  {getAddressIcon(addr.type)}
                                </div>
                                <div>
                                  <h6 className="mb-0 text-capitalize fw-medium">{addr.type}</h6>
                                  {addr.isDefault && <small className="text-primary fw-medium">Default</small>}
                                </div>
                              </div>
                              <div className="dropdown">
                                <button className="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown">
                                  <FaEdit size={12} />
                                </button>
                                <ul className="dropdown-menu shadow-sm">
                                  <li>
                                    <button className="dropdown-item" onClick={() => handleEditAddressClick(addr)}>
                                      <FaEdit className="me-2" />Edit
                                    </button>
                                  </li>
                                  <li>
                                    <button 
                                      className="dropdown-item text-danger" 
                                      onClick={() => handleDeleteAddress(addr._id)}
                                      disabled={profileData.addresses.length === 1 && addr.isDefault}
                                    >
                                      <FaTrash className="me-2" />Delete
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="text-muted small">
                              <div>{addr.street}</div>
                              <div>{addr.city}, {addr.state} {addr.zipCode}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <FaMapMarkerAlt size={48} className="text-muted mb-3" />
                    <h6 className="text-muted mb-2">No saved addresses</h6>
                    <small className="text-muted">Add an address to get started</small>
                  </div>
                )}

                {(!profileData.addresses || profileData.addresses.length < 2) && (
                  <div className="text-center">
                    <button onClick={handleAddAddressClick} className="btn text-white profile-gradient">
                      <FaPlus className="me-2" />
                      Add New Address
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddressModal && (
        <AddressModal
          address={editingAddress}
          onSave={handleSaveAddress}
          onClose={() => setShowAddressModal(false)}
          isEditMode={!!editingAddress}
          existingAddresses={profileData.addresses || []}
        />
      )}
    </div>
  );
};

export default Profile;