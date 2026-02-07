import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/myStyle.css';

const ComplaintData = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]); // To track expanded rows
  const [editingIndex, setEditingIndex] = useState(null); // Track the row being edited
  const [selectedAction, setSelectedAction] = useState(''); // Track selected action from the dropdown
  const [updatedValue, setUpdatedValue] = useState(''); // Track the updated value

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorsResponse = await axios.get('https://serve-d3eo.onrender.com/complaints');
        setAuthors(authorsResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleRow = (index) => {
    if (expandedRows.includes(index)) {
      // If the row is already expanded, collapse it
      setExpandedRows(expandedRows.filter(row => row !== index));
    } else {
      // Otherwise, expand it
      setExpandedRows([...expandedRows, index]);
    }
  };

  const handleUpdate = async (authorId) => {
    const updatedData = { field: selectedAction, value: updatedValue };
    try {
      await axios.put(`https://serve-d3eo.onrender.com/updateComplaint/${authorId}`, updatedData);
      setAuthors(authors.map(author => author._id === authorId ? { ...author, [selectedAction]: updatedValue } : author));
      alert('Update successful');
      setEditingIndex(null);
    } catch (error) {
      console.error('Error updating complaint:', error);
    }
  };

  const handleActionChange = (e) => {
    setSelectedAction(e.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <main className="main-content position-relative max-height-vh-130 h-100 border-radius-lg" style={complaintDataStyle}>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                  <h6 className="text-white text-capitalize ps-3">Complaint Data</h6>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        {/* {<th className="text-uppercase text-secondary font-weight-bolder opacity-7">Complaint No.</th>} */}
                        <th className="text-uppercase text-secondary font-weight-bolder opacity-7">Name</th>
                        <th className="text-uppercase text-secondary font-weight-bolder opacity-7">Complaint Category</th>
                        <th className="text-uppercase text-secondary font-weight-bolder opacity-7">Status</th>
                        <th className="text-uppercase text-secondary font-weight-bolder opacity-7">Action</th>
                        <th className="text-uppercase text-secondary font-weight-bolder opacity-7">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {authors.map((author, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            {/* {<td>{author.complaintNumber}</td>} */}
                            <td>{author.name}</td>
                            <td>{author.complaintCategory}</td>
                            <td>{author.status}</td>
                            <td>
                              {editingIndex === index ? (
                                <div className="edit-form-container">
                                  <select onChange={handleActionChange} value={selectedAction}>
                                    <option value="">Select an action</option>
                                    <option value="status">Status</option>
                                    {/* Add more options as needed */}
                                  </select>
                                  <input
                                    type="text"
                                    placeholder="Enter new value"
                                    value={updatedValue}
                                    onChange={(e) => setUpdatedValue(e.target.value)}
                                  />
                                  <button className="submit-btn" onClick={() => handleUpdate(author._id)}>Submit</button>
                                  <button className="cancel-btn" onClick={() => setEditingIndex(null)}>Cancel</button>
                                </div>
                              ) : (
                                <a
                                  href="#!"
                                  className="edit-link"
                                  onClick={() => {
                                    setEditingIndex(index);
                                    setSelectedAction('');
                                    setUpdatedValue('');
                                  }}
                                >
                                  Edit
                                </a>
                              )}
                            </td>
                            <td>
                              <button className="expand-btn" onClick={() => toggleRow(index)}>
                                {expandedRows.includes(index) ? 'Collapse' : 'Expand'}
                              </button>
                            </td>
                          </tr>
                          {expandedRows.includes(index) && (
                            <tr>
                              <td colSpan="6">
                                <div className="additional-details">
                                  <p><strong>Father's Name:</strong> {author.fatherName}</p>
                                  <p><strong>Email:</strong> {author.email}</p>
                                  <p><strong>Mobile:</strong> {author.countryCode} {author.phone}</p>
                                  <p><strong>Alternate Mobile:</strong> {author.alternatePhone}</p>
                                  <p><strong>Country:</strong> {author.country}</p>
                                  <p><strong>State:</strong> {author.state}</p>
                                  <p><strong>City:</strong> {author.city}</p>
                                  <p><strong>Pincode:</strong> {author.pincode}</p>
                                  <p><strong>Disputed Amount:</strong> {author.disputedAmount}</p>
                                  <p><strong>Complaint No.:</strong>{author.complaintNumber}</p>
                                  <p><strong>Complaint:</strong> {author.complaint}</p>
                                  <p><strong>Attachment:</strong> <a href={author.attachment} target="_blank" rel="noopener noreferrer">{author.originalFileName}</a></p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

// Define complaintDataStyle here
const complaintDataStyle = {
  width: '1500px',
  
  marginLeft: '150px',
  padding: '15px',
};

export default ComplaintData; 
