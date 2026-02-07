import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CentralizedGrievances.css'; // Import your CSS file for this component
import axios from 'axios';

const TrackComplaint = () => {
    const navigate = useNavigate();
    const [complaintNumber, setComplaintNumber] = useState('');
    const [complaintDetails, setComplaintDetails] = useState(null);
    const [error, setError] = useState(null);
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);
    const detailsRef = useRef(null);

    const handleInputChange = (event) => {
        setComplaintNumber(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.get(`https://serve-d3eo.onrender.com/grievances/${complaintNumber}`);
            const data = res.data;

            if (data.error || !data) {
                setError("Complaint number not found or error occurred.");
                setComplaintDetails(null);
            } else {
                setComplaintDetails(data);
                setError(null);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("An error occurred while fetching the complaint details.");
            setComplaintDetails(null);
        }
    };

    // Fetch updates
    useEffect(() => {
        const fetchUpdates = async () => {
            try {
                const response = await fetch('https://serve-d3eo.onrender.com/api/updates');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUpdates(data);
            } catch (error) {
                console.error('Error fetching updates:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUpdates();
    }, []);

    const renderStatementWithLink = (update) => {
        const { statement, pdfLink, externalLink } = update;
        const link = pdfLink || externalLink;

        return link ? (
            <a href={link} target="_blank" rel="noopener noreferrer">
                {statement}
            </a>
        ) : statement;
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="centralized-grievances-wrapper">
            <div className="centralized-grievances-container">
                <div className="grievance-form">
                    <h1>Track Your Complaint</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="complaintNumber">Complaint Number:</label>
                        <input
                            type="text"
                            id="complaintNumber"
                            value={complaintNumber}
                            onChange={handleInputChange}
                            required
                        />
                        <button type="submit">Track</button>
                    </form>

                    {complaintDetails && (
                        <div className="complaint-details" ref={detailsRef}>
                            <h2>Complaint Details</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Field</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Status</td>
                                        <td>
                                            <div className={`status-button ${complaintDetails.status}`}>
                                                {complaintDetails.status}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Complaint Category</td>
                                        <td>{complaintDetails.complaintCategory}</td>
                                    </tr>
                                    <tr>
                                        <td>Sub Category</td>
                                        <td>{complaintDetails.complaintType}</td>
                                    </tr>
                                    <tr>
                                        <td>Full Name</td>
                                        <td>{complaintDetails.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Father's Name</td>
                                        <td>{complaintDetails.fatherName}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>{complaintDetails.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Mobile Number</td>
                                        <td>{`${complaintDetails.countryCode}${complaintDetails.phone}`}</td>
                                    </tr>
                                    <tr>
                                        <td>Alternate Number</td>
                                        <td>{complaintDetails.alternatePhone}</td>
                                    </tr>
                                    <tr>
                                        <td>Country</td>
                                        <td>{complaintDetails.country}</td>
                                    </tr>
                                    <tr>
                                        <td>State</td>
                                        <td>{complaintDetails.state}</td>
                                    </tr>
                                    <tr>
                                        <td>Disputed Amount</td>
                                        <td>{complaintDetails.disputedAmount}</td>
                                    </tr>
                                    <tr>
                                        <td>Complaint</td>
                                        <td>{complaintDetails.complaint}</td>
                                    </tr>
                                    <tr>
                                        <td>Uploaded Document</td>
                                        <td>{complaintDetails.originalFileName}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button onClick={handlePrint}>Print</button>
                        </div>
                    )}

                    {error && <p className="error">{error}</p>}
                </div>
            </div>

            <div className="sidebar">
                <div className="whats-new">
                    <h3>What's New</h3>
                    <div className="marquee-container">
                        <div className="marquee-content">
                            <ul>
                                {updates.length === 0 ? (
                                    <li>No updates available</li>
                                ) : (
                                    updates.map((update, index) => (
                                        <li key={index}>
                                            {renderStatementWithLink(update)}
                                            {update.publish && <span className="new-tag-in-content">New</span>}
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackComplaint;
