import React, { useState } from 'react';
import '../assets/css/material-dashboard.css';
import '../assets/css/nucleo-icons.css';
import '../assets/css/nucleo-svg.css';

function Sidebar() {
  const [isBlogDropdownOpen, setBlogDropdownOpen] = useState(false);
  const [isUpdateDropdownOpen, setUpdateDropdownOpen] = useState(false); // New state for Latest Updates dropdown

  const toggleBlogDropdown = () => {
    setBlogDropdownOpen(!isBlogDropdownOpen);
  };

  const toggleUpdateDropdown = () => {
    setUpdateDropdownOpen(!isUpdateDropdownOpen); // Toggle Latest Updates dropdown
  };

  return (
    <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark" id="sidenav-main">
      <div className="sidenav-header">
        <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
        <a className="navbar-brand m-0" href="https://demos.creative-tim.com/material-dashboard/pages/dashboard" target="_blank" rel="noopener noreferrer">
          <img src="../assets/img/apple-icon.png" className="navbar-brand-img h-100" alt="main_logo" />
          <span className="ms-1 font-weight-bold text-white">Admin</span>
        </a>
      </div>

      <hr className="horizontal light mt-0 mb-2" />

      <div className="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link text-white" href="/">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">dashboard</i>
              </div>
              <span className="nav-link-text ms-1">Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="/complaint-data">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">table_view</i>
              </div>
              <span className="nav-link-text ms-1">Complaints</span>
            </a>
          </li>

          {/* Blog Dropdown */}
          <li className="nav-item">
            <a className="nav-link text-white" href="#" onClick={toggleBlogDropdown}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">receipt_long</i>
              </div>
              <span className="nav-link-text ms-1">Blog</span>
              <i className={`material-icons opacity-10 ${isBlogDropdownOpen ? 'rotate-180' : ''}`}>arrow_drop_down</i>
            </a>
            {isBlogDropdownOpen && (
              <ul className="navbar-nav ms-3">
                <li className="nav-item">
                  <a className="nav-link text-white" href="/blogs">
                    <span className="nav-link-text ms-1">All Blogs</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/blog">
                    <span className="nav-link-text ms-1">Create Blog</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/unpublishBlogs">
                    <span className="nav-link-text ms-1">UnPublished</span>
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Latest Updates Dropdown */}
          <li className="nav-item">
            <a className="nav-link text-white" href="#" onClick={toggleUpdateDropdown}>
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">view_in_ar</i>
              </div>
              <span className="nav-link-text ms-1">Latest Updates</span>
              <i className={`material-icons opacity-10 ${isUpdateDropdownOpen ? 'rotate-180' : ''}`}>arrow_drop_down</i>
            </a>
            {isUpdateDropdownOpen && (
              <ul className="navbar-nav ms-3">
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    <span className="nav-link-text ms-1">View Updates</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="/updates">
                    <span className="nav-link-text ms-1">Add Updates</span>
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* Filed Complaint Section */}
          <li className="nav-item">
            <a className="nav-link text-white" href="/filed-complaints">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">report_problem</i>
              </div>
              <span className="nav-link-text ms-1">Filed Complaints</span>
            </a>
          </li>

          {/* Other Sidebar Items */}
          <li className="nav-item mt-3">
            <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Account pages</h6>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="./pages/profile.html">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">person</i>
              </div>
              <span className="nav-link-text ms-1">Profile</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="./pages/sign-in.html">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">login</i>
              </div>
              <span className="nav-link-text ms-1">Edit Profile</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="sidenav-footer position-absolute w-100 bottom-0">
        <div className="mx-3">
          <a className="btn bg-gradient-primary w-100" href="https://www.creative-tim.com/product/material-dashboard-pro?ref=sidebarfree" type="button">Logout</a>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
