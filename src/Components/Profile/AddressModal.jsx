import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FaTimes, FaHome, FaBriefcase, FaEllipsisH } from "react-icons/fa";

const AddressModal = ({ address, onSave, onClose, isEditMode, existingAddresses }) => {
  const [formData, setFormData] = useState({
    type: "home",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    isDefault: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (address) {
      setFormData({
        type: address.type || "home",
        street: address.street || "",
        city: address.city || "",
        state: address.state || "",
        zipCode: address.zipCode || "",
        isDefault: address.isDefault || false
      });
    } else if (existingAddresses.length === 0) {
      setFormData(prev => ({ ...prev, isDefault: true }));
    }
  }, [address, existingAddresses]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.street.trim()) newErrors.street = "Street is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    else if (!/^\d{5,6}(-\d{4})?$/.test(formData.zipCode)) newErrors.zipCode = "Invalid ZIP code format";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSave(formData);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'home': return <FaHome className="me-2" />;
      case 'work': return <FaBriefcase className="me-2" />;
      default: return <FaEllipsisH className="me-2" />;
    }
  };

  return (
    <Modal show={true} onHide={onClose} centered size="lg">
      <Modal.Header className="border-0 bg-light">
        <Modal.Title className="fw-bold">
          {isEditMode ? "Edit Address" : "Add New Address"}
        </Modal.Title>
        <Button variant="link" onClick={onClose} className="text-muted p-0">
          <FaTimes size={18} />
        </Button>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="p-4">
          <Form.Group className="mb-4">
            <Form.Label className="fw-medium mb-3">Address Type</Form.Label>
            <div className="row g-2">
              {['home', 'work', 'other'].map((type) => (
                <div key={type} className="col-4">
                  <Form.Check
                    type="radio"
                    id={`type-${type}`}
                    name="type"
                    value={type}
                    checked={formData.type === type}
                    onChange={handleChange}
                    className="d-none"
                  />
                  <label 
                    htmlFor={`type-${type}`}
                    className={`btn w-100 d-flex align-items-center justify-content-center p-3 ${
                      formData.type === type 
                        ? 'btn-primary text-white address-type-selected' 
                        : 'btn-outline-secondary'
                    }`}
                  >
                    {getTypeIcon(type)}
                    <span className="text-capitalize">{type}</span>
                  </label>
                </div>
              ))}
            </div>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label className="fw-medium">Street Address *</Form.Label>
            <Form.Control
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Enter street address"
              isInvalid={!!errors.street}
              size="lg"
            />
            <Form.Control.Feedback type="invalid">{errors.street}</Form.Control.Feedback>
          </Form.Group>
          
          <Row className="g-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">City *</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  isInvalid={!!errors.city}
                  size="lg"
                />
                <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">State *</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  maxLength="2"
                  isInvalid={!!errors.state}
                  size="lg"
                />
                <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">ZIP Code *</Form.Label>
                <Form.Control
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="ZIP"
                  isInvalid={!!errors.zipCode}
                  size="lg"
                />
                <Form.Control.Feedback type="invalid">{errors.zipCode}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Check
            type="checkbox"
            id="defaultAddress"
            label="Set as default address"
            name="isDefault"
            checked={formData.isDefault}
            onChange={handleChange}
            disabled={isEditMode && address?.isDefault && existingAddresses.filter(a => a.isDefault).length === 1}
            className="mb-3 fs-6"
          />
        </Modal.Body>
        
        <Modal.Footer className="border-0 bg-light">
          <Button variant="outline-secondary" onClick={onClose} size="lg" className="px-4">
            Cancel
          </Button>
          <Button 
            type="submit" 
            size="lg"
            className="px-4 text-white address-submit-btn"
          >
            {isEditMode ? "Update Address" : "Add Address"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddressModal;