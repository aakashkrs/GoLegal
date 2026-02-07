import React, { useState, useEffect, useRef } from 'react';
import '../css/ServicesTabs.css'; // Import your CSS file
import '../css/style.css';
import { Link, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Set the worker URL for pdfjs-dist
pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs/pdf.worker.min.js';

// Sample data for services
const servicesData = [
    { 
        id: 1, 
        title: 'Centralized Public Complaint', 
        htmlUrl: 'html/centralized.html',
        route: '/centralized-grievances',
        icon: 'fas fa-info-circle',
        isNew: true
    },
    { 
        id: 2, 
        title: 'State Specific Grievances',
        htmlUrl: "html/stategrievances.html",
        icon: 'fas fa-info-circle'
    },
    { 
        id: 3, 
        title: 'National Cyber Crime Reporting', 
        htmlUrl: 'html/NCCRPortal.html',
        pdfUrl: 'pdfs/NATIONAL-CYBER-CRIME-REPORTING-PORAL.pdf',
        route: '/state-specific-grievances',
        icon: 'fas fa-info-circle'
    },
    { 
        id: 4, 
        title: 'Financial Fraud Complaint', 
        htmlUrl: 'html/F.Fraud.html',
        pdfUrl: 'pdfs/Financial-Fraud-Complaint.pdf',
        route: '/state-specific-grievances',
        icon: 'fas fa-info-circle'
    },
    { 
        id: 5, 
        title: 'Blackmailing & Harassment Complaint', 
        htmlUrl: 'html/Blackmail.html',
        route: '/blackmailing',
        icon: 'fas fa-info-circle'
    },
    { 
        id: 6, 
        title: 'Women Related Complaint', 
        htmlUrl: 'html/NCW.html',
        route: '/blackmailing',
        icon: 'fas fa-info-circle'
    },
    { 
        id: 7, 
        title: 'Sexual Harrasment Complaint', 
        htmlUrl: 'html/SHE.html',
        route: '/blackmailing',
        icon: 'fas fa-info-circle'
    },
    { 
        id: 8, 
        title: 'Labour Complaint', 
        htmlUrl: 'html/labour.html',
        route: '/blackmailing',
        icon: 'fas fa-info-circle'
    },
    { 
        id: 9, 
        title: 'Consumer Complaint', 
        htmlUrl: 'html/consumer.html',
        route: '/blackmailing',
        icon: 'fas fa-info-circle'
    },
    { 
        id: 10, 
        title: 'Medical Complaint', 
        htmlUrl: 'html/medical.html',
        route: '/blackmailing',
        icon: 'fas fa-info-circle'
    },
    { 
        id: 11, 
        title: 'Legal Expertise',
        htmlUrl: 'html/LegalExpertise.html', 
        pdfUrl: 'pdfs/LEGAL-EXPERTISE.pdf',
        route: '/state-specific-grievances',
        icon: 'fas fa-info-circle'
    },
    { 
        id: 12, 
        title: 'Legal Vacancies', 
        htmlUrl: 'html/LegalVacancies.html',
        pdfUrl: 'pdfs/LEGAL-VACANCIES-UPDATE.pdf',
        route: '/state-specific-grievances',
        icon: 'fas fa-info-circle',
        isNew: true
    },
    { 
        id: 13, 
        title: 'Legal Updates', 
        htmlUrl: 'html/LLUpdates.html',
        pdfUrl: 'pdfs/LATEST-LEGAL-UPDATES.pdf',
        route: '/state-specific-grievances',
        icon: 'fas fa-info-circle'
    },
    { 
        id: 14, 
        title: 'Blog', 
        route: '/blog',
        icon: 'fas fa-info-circle'
    },
    
    
];

const Home = () => {
    const [selectedTab, setSelectedTab] = useState(servicesData[0]); // Initialize with the first service
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const detailsRef = useRef(null);
    const containerRef = useRef(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        //Fetch updates
        const fetchUpdates = async () => {
            try {
              const response = await fetch('http://localhost:5000/api/updates'); // Update with your backend URL
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

        const handleResize = () => {
            if (containerRef.current) {
                // Handle resize if needed
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call to set up

        return () => window.removeEventListener('resize', handleResize);
        }, []);
      
        if (loading) {
          return <p>Loading updates...</p>;
        }
      
        if (error) {
          return <p>Error: {error}</p>;
        }


    const handleTabClick = (service) => {
        if (service.route === '/blog') {
            navigate('/Blog'); // Navigate to Blog page
        } else {
            setSelectedTab(service); // Set the selected tab for other services
            detailsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

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

    return (
        <div className="services-container">
            <div className="services-wrapper">
                <div className="tabs">
                    {servicesData.map((service) => (
                        <div
                            key={service.id}
                            className={`tab ${service === selectedTab ? 'active' : ''}`}
                            onClick={() => handleTabClick(service)}
                            style={{ backgroundColor: service === selectedTab ? 'gray' : '#98142c' }}
                        >
                            <div className="tab-content">
                                <i className={service.icon} style={{ marginRight: '8px' }}></i>
                                <span className="tab-title">{service.title}</span>
                                {service.isNew && <span className="new-tag">New</span>}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="content-wrapper">
                    <div className="details" ref={detailsRef}>
                        <div className="service-details">
                            <h3>{selectedTab.title}</h3>
                            {selectedTab.htmlUrl && (
                                <iframe
                                    src={selectedTab.htmlUrl}
                                    title={selectedTab.title}
                                    style={{ width: '100%', height: '600px', border: 'none' }}
                                />
                            )}
                        </div>
                    </div>
                    {/* <div className="sidebar"> */}
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
                  {/* </div> */}
                </div>
            </div>
        </div>
    );
};

export default Home;