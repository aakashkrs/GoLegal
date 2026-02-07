import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/complaintPopup.css'; // Optional: for styling

const ComplaintFormPopup = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    caseType: '',
    state: '',
    complaintAgainst: '',
    disputedAmount: '',
    details: '',
  });
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message

  useEffect(() => {
    if (location.pathname === '/') {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000); // 1 second

    return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [location.pathname]);

  const handleClose = () => {
    setIsOpen(false);
    setSuccessMessage(''); // Clear success message on close
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch('https://serve-d3eo.onrender.com/fileComplaint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Assuming formData is an object
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Form submitted", data);
        setSuccessMessage('Your complaint has been successfully submitted. We will contact you shortly'); // Set success message
        // Close the popup after a delay
        setTimeout(() => {
          handleClose();
      }, 3000); // Close after 3 seconds
    } catch (error) {
        console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="pops-form-overlay">
          <div className="pops-form">
          <span className="close-btn" onClick={handleClose}>&times;</span> {/* X mark */}
            <h2>Submit Your Complaint</h2>
            {successMessage && <div className="success-message">{successMessage}</div>} {/* Display success message */}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
              <select
                name="caseType"
                value={formData.caseType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Case Type</option>
                <option value="phishing_scams">Phishing scams</option>
                <option value="blackmailing">Blackmailing</option>
                <option value="harassment">Harassment</option>
                <option value="online_banking_fraud">Online Banking Fraud</option>
                <option value="credit_card_fraud">Credit card/Debit card fraud</option>
                <option value="online_shopping_scam">Online shopping scam</option>
                <option value="lottery_prize_scam">Lottery prize scam</option>
                <option value="job_offer_scam">Job offer scam</option>
                <option value="matrimonial_scam">Matrimonial scam</option>
                <option value="tech_support_scam">Tech support scam</option>
                <option value="investment_scam">Investment scam</option>
                <option value="social_media_scam">Social media scam</option>
                <option value="insurance_fraud">Insurance fraud</option>
                <option value="ransomware_attack">Ransomware attack</option>
                <option value="data_breach">Data Breach</option>
                <option value="telecom_fraud">Telecom Fraud</option>
                <option value="women_related_offences">Women related offences</option>
                <option value="other_offence">Any other offence</option>
              </select>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Dadra and Nagar Haveli and Daman and Diu">
                    Dadra and Nagar Haveli and Daman and Diu
                </option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Delhi">Delhi</option>
                <option value="Puducherry">Puducherry</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              </select>
              <input
                type="text"
                name="complaintAgainst"
                placeholder="Complaint Against"
                value={formData.complaintAgainst}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="disputedAmount"
                placeholder="Disputed Amount"
                value={formData.disputedAmount}
                onChange={handleChange}
                required
              />
              <textarea
                name="details"
                placeholder="Details"
                value={formData.details}
                onChange={handleChange}
                required
              />
              <button type="submit">Submit</button>
            </form>
            {/* <button onClick={handleClose}>Close</button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default ComplaintFormPopup;
