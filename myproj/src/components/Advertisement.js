import React, { useEffect, useState } from 'react';
import '../css/style.css';

const Advertisements = () => {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        const fetchAds = async () => {
            const response = await fetch('http://localhost:5000/api/ads');
            const data = await response.json();
            setAds(data);
        };
        fetchAds();
    }, []);

    return (
        <div>
            {ads.map(ad => (
                <div key={ad._id} className="advertisement">
                    <a href={ad.link} target="_blank" rel="noopener noreferrer">
                        <h3>{ad.title}</h3>
                        <img src={ad.imageUrl} alt={ad.title} />
                    </a>
                </div>
            ))}
        </div>
    );
};

export default Advertisements;