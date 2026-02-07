// Header.js
import React from 'react';
import { primaryColor } from './colors';

const Header = () => {
  return (
    <header style={headerStyle}>
      <h2>Admin Dashboard</h2>
    </header>
  );
}

const headerStyle = {
  backgroundColor: primaryColor,
  color: '#fff',
  padding: '10px',
  textAlign: 'center'
};

export default Header;
