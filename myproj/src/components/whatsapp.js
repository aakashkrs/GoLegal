// WhatsAppButton.js
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon

const WhatsAppButton = () => {
    const phoneNumber = "9050517109"; // Your phone number in international format
    const message = "Hello! I need assistance."; // Default message

    const handleClick = () => {
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    };

    return (
        <div className="whatsapp-button">
        <button onClick={handleClick} style={styles.button}>
            <FaWhatsapp style={styles.icon} /> 
        </button>
        </div>
    );
};

const styles = {
    button: {
        position:'absolute',
        right: '20px',
        bottom: '20px',        
        backgroundColor: '#25D366',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
        // cursor: 'pointer',
        zIndex: 1000,
    },
    icon: {
        fontSize: '24px',
    },
};

export default WhatsAppButton;
