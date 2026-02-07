import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/myStyle.css';

const UpdatesData = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedAction, setSelectedAction] = useState('');
  const [updatedValue, setUpdatedValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch authors data
        const authorsResponse = await axios.get('https://serve-d3eo.onrender.com/api/updates');
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

  const handleActionChange = (e) => {
    setSelectedAction(e.target.value);
  };

  const handleUpdate = async (authorId) => {
    const updatedData = { field: selectedAction, value: updatedValue };

    try {
      await axios.put(`https://serve-d3eo.onrender.com/editUpdates/${authorId}`, updatedData);
      // Optionally, update local state
      setAuthors(authors.map(author => author._id === authorId ? { ...author, [selectedAction]: updatedValue } : author));
      alert('Update successful');
      setEditingIndex(null);
    } catch (error) {
      console.error('Error updating complaint:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg" style={complaintDataStyle}>
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
                        <th className="text-uppercase text-secondary font-weight-bolder opacity-7">S.No</th>
                        <th className="text-uppercase text-secondary font-weight-bolder opacity-7">Statement</th>
                        <th className="text-uppercase text-secondary font-weight-bolder opacity-7 ps-2">Pdf</th>
                        <th className="text-uppercase text-secondary font-weight-bolder opacity-7 ps-2">ExternalLink</th>
                        <th className="text-uppercase text-secondary font-weight-bolder opacity-7 ps-2">Published Date</th>
                        <th className="text-uppercase text-secondary font-weight-bolder opacity-7">Status</th>
                        <th className="text-uppercase text-secondary opacity-7">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {authors.map((author, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex px-2 py-1">
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">{index + 1}</h6>
                                {/* <p className="text-xs text-secondary mb-0">{author.email}</p> */}
                              </div>
                            </div>
                          </td>
                          <td>
                            <h6 className="text-xs font-weight-bold mb-0">{author.statement}</h6>
                            {/* <h6 className="text-sm text-secondary mb-0">{author.state}</h6> */}
                          </td>
                          
                          <td>
                            <h6 className="align-middle text-sm">{author.pdfLink}</h6>
                          </td>
                          <td>
                            <h6 className="align-middle text-sm">{author.externalLink}</h6>
                          </td>
                          <td>
                            <h6 className="align-middle text-sm">{author.publishDate}</h6>
                          </td>
                          <td>
                            <h6 className="align-middle text-sm">{author.status}</h6>
                          </td>
                          <td className="align-middle text-sm">
                            <span className={`badge badge-sm ${author.status === 'true' ? 'bg-gradient-success' : 'bg-gradient-secondary'}`}>
                                {author.status}
                            </span>
                        </td>
                        <td className="align-middle text-sm text-center">
                            {editingIndex === index ? (
                                <div className="edit-form-container">
                                    <select onChange={handleActionChange} value={selectedAction}>
                                        <option value="">Select an action</option>
                                        <option value="status">Status</option>
                                    </select>
                                    <select
                                        onChange={(e) => setUpdatedValue(e.target.value)}
                                        value={updatedValue}
                                    >
                                        <option value="">Select value</option>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                    <button className="submit-btn" onClick={() => handleUpdate(author._id)}>Submit</button>
                                    <button className="cancel-btn" onClick={() => setEditingIndex(null)}>Cancel</button>
                                </div>
                            ) : (
                                <a
                                    href="javascript:;"
                                    className="edit-link"
                                    data-toggle="tooltip"
                                    data-original-title="Edit user"
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


                        </tr>
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

const complaintDataStyle = {
  marginLeft: '220px',
  padding: '15px',
};

export default UpdatesData;
