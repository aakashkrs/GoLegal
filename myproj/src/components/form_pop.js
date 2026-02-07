import React, { useEffect, useState } from 'react';
import '../css/newPop.css'; // Importing CSS file for styling

const ComplaintPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasSeenPopup = sessionStorage.getItem('hasSeenComplaintPopup');

        if (!hasSeenPopup) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('hasSeenComplaintPopup', 'true');
    };

    return (
        isOpen && (
            <div className="complaint-popup-overlay">
                <div className="complaint-popup">
                    <button className="close-btn" onClick={handleClose}>×</button>
                    <h2 className="complaint-title">Register Your Complaint</h2>
                    <form>
                        <input
                            type="text"
                            placeholder="Full name"
                            className="popup-input"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="popup-input"
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Mobile Number"
                            className="popup-input"
                            required
                        />

                        <select className="popup-select" required>
                            <option value="">---Select Case Type---</option>
                            <option value="Cybercrime Complaint">Cybercrime Complaint</option>
                            <option value="Women Related Complaint">Women Related Complaint</option>
                            <option value="Labour Complaint">Labour Complaint</option>
                            <option value="Consumer Complaint">Consumer Complaint</option>
                            <option value="Medical Insurance">Medical Insurance</option>
                            <option value="Challan Settlement">Challan Settlement</option>
                            <option value="Police Complaint">Police Complaint</option>
                            <option value="Municipalities Complaint">Municipalities Complaint</option>
                            <option value="Complaint to Complaint">Complaint to Complaint</option>
                            <option value="Railway Complaint">Railway Complaint</option>
                            <option value="Medical Complaint">Medical Complaint</option>
                            <option value="Education Complaint">Education Complaint</option>
                        </select>

                        <select className="popup-select" required>
                            <option value="">---Select State---</option>
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
                            placeholder="Complaint Against"
                            className="popup-input"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Disputed Amount"
                            className="popup-input"
                        />
                        <textarea
                            placeholder="Tell Us Your Story (Write Complaint)"
                            className="popup-textarea"
                            required
                        > </textarea>

                        <button type="submit" className="popup-submit-btn">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        )
    );
};

export default ComplaintPopup;
