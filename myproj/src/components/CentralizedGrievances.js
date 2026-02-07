import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/CentralizedGrievances.css'; // Import your CSS file for this component


const CentralizedGrievances = () => {
    const navigate = useNavigate();
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    // const [countryCode, setCountryCode] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [dob, setDob] = useState('');
    const [formData, setFormData] = useState({
        complaintCategory: '',
        complaintType: '',
        name: '',
        fatherName: '',
        email: '',
        countryCode: '',
        phone: '',
        alternatePhone: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
        // complaintAgainst: '',
        disputedAmount: '',
        complaint: '',
        attachment: null
    });

    // Adsense code
    useEffect(() => {
        const loadAds = () => {
          try {
            if (window.adsbygoogle && window.adsbygoogle.push) {
              window.adsbygoogle.push({});
            }
          } catch (err) {
            console.error('AdSense error:', err);
          }
        };
    
        // Call loadAds after a short delay to ensure DOM is ready
        const timer = setTimeout(loadAds, 1000);
        return () => clearTimeout(timer);
      }, []);

    const [complaintNumber, setComplaintNumber] = useState(null); // New state for complaint number
    const [error, setError] = useState(null); // New state for error handling
    const [filteredTypes, setFilteredTypes] = useState([]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
     // Handle file input change
     const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file); 
        setFormData({ ...formData, attachment: file });
    };

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            complaintCategory: value,
            complaintType: ''
        });
        setFilteredTypes(complaintCategories[value] || []);
    };


    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://countriesnow.space/api/v0.1/countries/states');
                setCountries(response.data.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        const adsbygoogleScript = document.createElement('script');
        adsbygoogleScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2666968885960053";
        adsbygoogleScript.crossOrigin = "anonymous";
        adsbygoogleScript.async = true;
        document.body.appendChild(adsbygoogleScript);
    }, []); 

    

    const handleCountryChange = (e) => {
        const country = e.target.value;
        setSelectedCountry(country);
        setSelectedState(''); // Reset selected state
        setStates(countries.find(c => c.name === country)?.states || []);
        setFormData({
            ...formData,
            country: country,
            state: '',
            city: ''
        });
    };

    const handleStateChange = (e) => {
        const state = e.target.value;
        setSelectedState(state);
        setFormData({
            ...formData,
            state: state,
            city: ''
        });
    };

    const handleCityChange = (e) => {
        const city = e.target.value;
        setFormData({
            ...formData,
            city: city
        });
    };

    const handleCountryCodeChange = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            countryCode: value
        });
    };


    
    const handleSubmit = async (event) => {
    event.preventDefault();

    const wordCount = formData.complaint.trim().split(/\s+/).length;
    if (wordCount < 150) {
        window.alert("Please fill at least 150 words in the problem statement.");
        return; // Stop the submission
    }

    const { complaintCategory, complaintType, name, fatherName, email, countryCode, phone, alternatePhone, country, state, city, pincode, disputedAmount, complaint, attachment } = formData;
    const formDataToSend = new FormData();
    
    // Append all fields to FormData
    formDataToSend.append("complaintCategory", complaintCategory);
    formDataToSend.append("complaintType", complaintType);
    formDataToSend.append("name", name);
    formDataToSend.append("fatherName", fatherName);
    formDataToSend.append("email", email);
    formDataToSend.append("countryCode", countryCode);
    formDataToSend.append("phone", phone);
    formDataToSend.append("alternatePhone", alternatePhone);
    formDataToSend.append("country", country);
    formDataToSend.append("state", state);
    formDataToSend.append("city", city);
    formDataToSend.append("pincode", pincode);
    formDataToSend.append("disputedAmount", disputedAmount);
    formDataToSend.append("complaint", complaint);
    formDataToSend.append("attachment", attachment); 

    try {
        const response = await axios.post("http://localhost:5000/grievances", formDataToSend, {
            headers: {
                "Content-Type": "multipart/form-data" // Use this for file uploads
            }
        });
        if (response.status === 200) {
            const data = response.data;

            if (data.status === 422 || !data) {
                window.alert("Error: " + (data.message || "Invalid input"));
                console.log("Error:", data.message || "Invalid input");
            } else {
                setComplaintNumber(data.complaintNumber);
                setFormData({complaintCategory:'', complaintType:'', name: '',fatherName: '',email: '',countryCode: '', phone:'', alternatePhone:'', country:'', state:'', city:'', pincode: '',disputedAmount: '',complaint: '',attachment: null});
                window.alert("Successfully submitted");
                console.log("Successfully submitted");
                // navigate('/');
            }
        } else {
            window.alert("Unexpected response status: " + response.status);
            console.log("Unexpected response status:", response.status);
        }
    } catch (error) {
        // Handle error
        if (error.response) {
            // Server responded with a status other than 200 range
            window.alert("Submission failed: " + (error.response.data.message || error.message));
            console.error("Server error:", error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            window.alert("Submission failed: No response from server");
            console.error("Network error:", error.request);
        } else {
            // Something happened in setting up the request
            window.alert("Submission failed: " + error.message);
            console.error("Error:", error.message);
        }
    }
};



//Fetch updates
const fetchUpdates = async () => {
    try {
      const response = await fetch('https://serve-d3eo.onrender.com/api/updates'); // Update with your backend URL
      console.log('Response status:', response.status);
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

  const renderStatementWithLink = (update) => {
    const { statement, pdfLink, externalLink } = update;

    // Determine which link to use
    const link = pdfLink || externalLink;
    if (!link) return statement; // No link to apply, just return the statement

    // Apply the link to the entire statement
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {statement}
      </a>
    );
  };




    
    const countryCodes = [
        { code: '+91' },
        { code: '+1'},
        { code: '+44' },
        { code: '+81' },
        // Add more country codes as needed
    ];

    const statesOfIndia = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
        'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
        'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
        'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ];

    const complaintCategories = {
        // 'Cybercrime Complaint': ['Financial fraud','Bank fraud','Investment fraud','Loan fraud','Online Blackmailing','Matrimony scam','Job fraud','Data breach','Immigration scam'],
        'Cybercrime Complaint': ["Cheating by impersonation", "Cyber bullying/ stalking/ sexting", "E-Mail Phishing", "Fake Profile", "Intimidating Email", "Online Job Fraud", "Online matrimonial Fraud", "Profile Hacking/ Theft", "Provocative speech for unlawful", "Aadhar Enabled payments system", "Business email compromise/ Email Take over", "Internet banking related Fraud", "UPI related Fraud", "Demat/ Depository fraud", "Tampering with computer source document", "Unauthorised Access/ Data Breach", "Website Hacking", "Email Hacking", "Online cyber Trafficking", "Online gambling Betting", "Cryptocurrency Crime", "E-commerce Fraud"],
        'Women Related Complaint': ['Sexual harassment','Blackmailing','Stalking','Sexting','Domestic violence','Divorce','Sexual harassment at workplace'],
        'Labour Complaint': [],
        'Consumer Complaint': [],
        'Medical Insurance': ['Reimbursement complaint'],
        'Challan Settlement': ['Settlement'],
        'Police Complaint': ['Lost and found arrival', 'Missing complaint'],
        'Municipalities Complaint': [],
        'Complaint to complaint': ['Against bank','Against NBFC','Against bank employees','Appeal against complaint'],
        'Railway Complaint': [],
        'Medical Complaint': [],
        'Education Complaint': []
    };
    

    return (
        <div className="centralized-grievances-wrapper">
            <div className="centralized-grievances-container">
                <div className="grievance-form">
                    <h1>File your complaint</h1>
                    <form onSubmit={handleSubmit} method="POST">
                        <label htmlFor="category">Complaint Category:</label>
                        <select
                            id="category"
                            name="complaintCategory"
                            value={formData.complaintCategory}
                            onChange={handleCategoryChange}
                            // required
                        >
                            <option value="">Select Category</option>
                            {Object.keys(complaintCategories).map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>

                        <label htmlFor="type">Complaint Type:</label>
                        <select
                            id="type"
                            name="complaintType"
                            value={formData.complaintType}
                            onChange={handleInputChange}
                            disabled={filteredTypes.length === 0}
                            required={filteredTypes.length > 0}
                        >
                            <option value="">Select Type</option>
                            {filteredTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>

                         {/* AdSense Container */}
                        <div className="mt-12 mx-auto" style={{ maxWidth: '728px' }}>
                          <ins
                            className="adsbygoogle"
                            style={{
                              display: 'block',
                              width: '728px',
                              height: '90px',
                              margin: '0 auto'
                            }}
                            data-ad-client="ca-pub-2666968885960053"
                            data-ad-slot="2323206811"
                          />
                        </div>
                                
                        <label htmlFor="name">Full Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            // required
                        />

                        <label htmlFor="name">Father Name:</label>
                        <input
                            type="text"
                            id="fatherName"
                            name="fatherName"
                            placeholder="Enter your Father's Name"
                            value={formData.fatherName}
                            onChange={handleInputChange}
                            // required
                        />

                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            // required
                        />
                        <label htmlFor="dob">Date of Birth:</label>
                            <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            // required
                            />
                        <label htmlFor="phone">Mobile Number:</label>
                        <div className="phone-input-wrapper">
                            <select
                                id="countryCode"
                                name="countryCode"
                                value={formData.countryCode}
                                onChange={handleCountryCodeChange}
                                // required
                            >
                                {countryCodes.map((country, index) => (
                                    <option key={index} value={country.code}>
                                        {country.code}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="Enter your Mobile Number"
                                value={formData.phone}
                                onChange={handleInputChange}
                                // required
                            />
                                    
                        </div>
                            
                        <label htmlFor="phone">Alternate Mobile Number:</label>
                        <input
                            type="tel"
                            id="alternatePhone"
                            name="alternatePhone"
                            placeholder="Enter an Alternate Number"
                            value={formData.alternatePhone}
                            onChange={handleInputChange}
                            // required
                        />
                        
                        {/* AdSense Container */}
                        <div className="mt-12 mx-auto" style={{ maxWidth: '728px' }}>
                          <ins
                            className="adsbygoogle"
                            style={{
                              display: 'block',
                              width: '728px',
                              height: '90px',
                              margin: '0 auto'
                            }}
                            data-ad-client="ca-pub-2666968885960053"
                            data-ad-slot="2323206811"
                          />
                        </div>
                                
                        <label htmlFor="complaint">Address:</label>
                        <textarea
                            id="address"
                            name="address"
                            rows="1"
                            placeholder="Enter your address"
                            value={formData.address}
                            onChange={handleInputChange}
                            // required
                        ></textarea>

                        <label htmlFor="country">Country:</label>
                        <select
                            id="country"
                            name="country"
                            value={selectedCountry}
                            onChange={handleCountryChange}
                            // required
                        >
                            <option value="">Select Country</option>
                            {countries.map(country => (
                                <option key={country.id} value={country.id}>{country.name}</option>
                            ))}
                        </select>

                        <label htmlFor="state">State:</label>
                        <select
                            id="state"
                            name="state"
                            value={selectedState}
                            onChange={handleStateChange}
                            disabled={!selectedCountry}
                            // required
                        >
                            <option value="">Select State</option>
                            {states.map(state => (
                                <option key={state.id} value={state.id}>{state.name}</option>
                            ))}
                        </select>

                        <label htmlFor="name">City:</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="Enter your City"
                            value={formData.city}
                            onChange={handleInputChange}
                            // required
                        />

                        <label htmlFor="name">Pin Code:</label>
                        <input
                            type="text"
                            id="pincode"
                            name="pincode"
                            placeholder="Enter your Pin code"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            // required
                        />

                        {/* <label
                            // required
                        /> */}

                        <label htmlFor="disputedAmount">Disputed Amount:</label>
                        <input
                            type="number"
                            id="disputedAmount"
                            name="disputedAmount"
                            placeholder="Enter disputed amount"
                            value={formData.disputedAmount}
                            onChange={handleInputChange}
                            // required
                        />

                         {/* AdSense Container */}
                        <div className="mt-12 mx-auto" style={{ maxWidth: '728px' }}>
                          <ins
                            className="adsbygoogle"
                            style={{
                              display: 'block',
                              width: '728px',
                              height: '90px',
                              margin: '0 auto'
                            }}
                            data-ad-client="ca-pub-2666968885960053"
                            data-ad-slot="2323206811"
                          />
                        </div>
                                
                        <label htmlFor="complaint">Write Complaint:</label>
                        <textarea
                            id="complaint"
                            name="complaint"
                            rows="4"
                            placeholder="Enter the details (minimum 150 words)"
                            value={formData.complaint}
                            onChange={handleInputChange}
                        ></textarea>
                                
                        <div>
                            {formData.complaint && (
                                <p>
                                    Word Count: {formData.complaint.trim().split(/\s+/).length} / 150
                                </p>
                            )}
                        </div>

                        <label htmlFor="attachment">Attach Document:</label>
                        <input
                            type="file"
                            id="attachment"
                            name="attachment"
                            onChange={handleFileChange}
                        />

                        <button type="submit" name="submitGrievance" id="submitGrievance">Submit</button>
                            
                    </form>


                    <style jsx>{`
                .phone-input-wrapper {
                    display: flex;
                    align-items: center;
                    width: 100%;
                }
                #countryCode {
                    width: 10%;
                    padding: 8px;
                    height: 45px;
                    box-sizing: border-box; /* Ensures padding is included in width calculation */
                }
                input {
                    width: 90%;
                    padding: 8px;
                    box-sizing: border-box; /* Ensures padding is included in width calculation */
                }
                .form-container {
                    max-width: 500px;
                    margin: auto;
                }
                form {
                    display: flex;
                    flex-direction: column;
                }
                label {
                    margin-bottom: 8px;
                }
                #submitGrievance {
                    margin-top: 16px;
                    padding: 10px;
                    background-color: #98142c;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #ffcccb;
                }
                @media (max-width:  767.98px) {
                #countryCode {
                    width: 30%;
                    padding: 8px;
                    height: 45px;
                    box-sizing: border-box; /* Ensures padding is included in width calculation */
                }
                input {
                    width: 70%;
                    padding: 8px;
                    box-sizing: border-box; /* Ensures padding is included in width calculation */
                }
                    }
            `}</style>

                    {complaintNumber && (
                        <div className="complaint-number">
                            <h2>Complaint Submitted Successfully</h2>
                            <p>Your complaint number is: <strong>{complaintNumber}</strong></p>
                            <p>kindly <strong>Note</strong> this complaint number to track complaint</p>
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

                     {/* AdSense Container */}
            <div className="mt-12 mx-auto" style={{ maxWidth: '728px' }}>
              <ins
                className="adsbygoogle"
                style={{
                  display: 'block',
                  width: '728px',
                  height: '90px',
                  margin: '0 auto'
                }}
                data-ad-client="ca-pub-2666968885960053"
                data-ad-slot="2323206811"
              />
            </div>          
            </div>
               
            </div>

            
    
    );
};

export default CentralizedGrievances;
