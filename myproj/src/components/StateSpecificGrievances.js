import React, { useState } from 'react';
import '../css/StateSpecificGrievances.css';

const stateGrievances = [
    { name: 'Andhra Pradesh', url: 'https://www.ap.gov.in/' },
    { name: 'Arunachal Pradesh', url: 'https://www.arunachalpradesh.gov.in/' },
    { name: 'Assam', url: 'https://assam.gov.in/' },
    { name: 'Bihar', url: 'https://state.bihar.gov.in/' },
    { name: 'Chhattisgarh', url: 'https://www.cgstate.gov.in/' },
    { name: 'Goa', url: 'https://www.goa.gov.in/' },
    { name: 'Gujarat', url: 'https://gujaratindia.gov.in/' },
    { name: 'Haryana', url: 'https://haryana.gov.in/' },
    { name: 'Himachal Pradesh', url: 'https://himachal.nic.in/' },
    { name: 'Jharkhand', url: 'https://www.jharkhand.gov.in/' },
    { name: 'Karnataka', url: 'https://www.karnataka.gov.in/' },
    { name: 'Kerala', url: 'https://kerala.gov.in/' },
    { name: 'Madhya Pradesh', url: 'https://www.mp.gov.in/' },
    { name: 'Maharashtra', url: 'https://www.maharashtra.gov.in/' },
    { name: 'Manipur', url: 'https://www.manipur.gov.in/' },
    { name: 'Meghalaya', url: 'https://meghalaya.gov.in/' },
    { name: 'Mizoram', url: 'https://mizoram.gov.in/' },
    { name: 'Nagaland', url: 'https://nagaland.gov.in/' },
    { name: 'Odisha', url: 'https://odisha.gov.in/' },
    { name: 'Punjab', url: 'https://punjab.gov.in/' },
    { name: 'Rajasthan', url: 'https://www.rajasthan.gov.in/' },
    { name: 'Sikkim', url: 'https://www.sikkim.gov.in/' },
    { name: 'Tamil Nadu', url: 'https://www.tn.gov.in/' },
    { name: 'Telangana', url: 'https://www.telangana.gov.in/' },
    { name: 'Tripura', url: 'https://tripura.gov.in/' },
    { name: 'Uttar Pradesh', url: 'https://www.up.gov.in/' },
    { name: 'Uttarakhand', url: 'https://uk.gov.in/' },
    { name: 'West Bengal', url: 'https://wb.gov.in/' }
];

const StateSpecificGrievances = () => {
    const [selectedState, setSelectedState] = useState('');

    const handleStateChange = (e) => {
        const selectedUrl = e.target.value;
        if (selectedUrl) {
            window.open(selectedUrl, '_blank'); // Open the state website in a new tab
        }
    };

    return (
        <div className="state-grievances-container">
            <h2>Select Your State to File Grievance</h2>
            <select value={selectedState} onChange={handleStateChange} className="state-dropdown">
                <option value="">-- Select Your State --</option>
                {stateGrievances.map((state, index) => (
                    <option key={index} value={state.url}>
                        {state.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StateSpecificGrievances;