// src/components/AdminPanel.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = ({ authenticated }) => {
    const navigate = useNavigate();

    // Prevent access if not authenticated
    if (!authenticated) {
        navigate("/");
        return null;
    }

    return (
        <div>
            <h1>Welcome to the Admin Panel</h1>
            <p>You are now logged in.</p>
        </div>
    );
};

export default AdminPanel;
