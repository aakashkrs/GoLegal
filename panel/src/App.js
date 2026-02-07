// App.js
import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ComplaintData from './components/ComplaintData';
import SignIn from './components/Signin';
import CreateBlog from './components/Blog';
import LatestUpdates from './components/Updates';
import BlogList from './components/Blogs';
import BlogDetail from './components/BlogDetail';
import UnpublishBlogs from './components/UnpublishBlogs';
import UpdatesData from './components/UpdatesData';
import FiledComplaint from './components/filedComplaint';
import { useAuth } from './components/AuthContext'; // Assuming you have an AuthContext for managing authentication

function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuth(); // To check if the user is signed in

  // Determine if the current route should have Sidebar and Navbar
  const showSidebarAndNavbar = location.pathname !== '/sign-in';

  return (
    <div>
      {showSidebarAndNavbar && <Sidebar />}
      {showSidebarAndNavbar && <Navbar />}
      <Routes>
        {/* Public Route */}
        <Route path="/sign-in" element={<SignIn />} />

        {/* Protected Routes */}
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/sign-in" />} />
        <Route path="/complaint-data" element={isAuthenticated ? <ComplaintData /> : <Navigate to="/sign-in" />} />
        <Route path="/blog" element={isAuthenticated ? <CreateBlog /> : <Navigate to="/sign-in" />} />
        <Route path="/updates" element={isAuthenticated ? <LatestUpdates /> : <Navigate to="/sign-in" />} />
        <Route path="/listUpdates" element={isAuthenticated ? <UpdatesData /> : <Navigate to="/sign-in" />} /> 
        <Route path="/blogs" element={isAuthenticated ? <BlogList /> : <Navigate to="/sign-in" />} />
        <Route path="/blog/:id" element={isAuthenticated ? <BlogDetail /> : <Navigate to="/sign-in" />} />
        <Route path="/unpublishBlogs" element={isAuthenticated ? <UnpublishBlogs /> : <Navigate to="/sign-in" />} />
        <Route path="/filedComplaint" element={isAuthenticated ? <FiledComplaint /> : <Navigate to="/sign-in" />} />
      </Routes>
    </div>
  );
}

export default App;
