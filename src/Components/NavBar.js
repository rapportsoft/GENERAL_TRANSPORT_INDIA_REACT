import React, { useState, useContext, useEffect } from 'react';
import AuthContext from './AuthProvider';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import image from '../Images/RapportSoftlogo.png';
import './Style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
import rapport from "../Images/rapportlogo.png";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUser, faSignOutAlt, faUserCheck, faUserCircle, faUserGear, faUserPlus, faUserShield, faUsersRays, faRefresh, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FaUserShield } from 'react-icons/fa';
import '../assets/css/style.css';



export default function Head({ toggleSidebar }) {

  const {
    jwtToken,
    userId,
    username,
    branchId,
    companyid,
    isAuthenticated,
    role,
    companyname,
    branchname,
    login,
    logout,
  } = useContext(AuthContext);

  // const navbarStyle = {
  //   backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',

  // };

  const navbarStyle = {
    backgroundImage: 'linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)',
    // backgroundRepeat: 'no-repeat',
    // backgroundImage: 'linear-gradient(to left, #002B5B 0%, #005792 50%, #00A8E8 100%)',
    // backgroundSize: 'cover',
  };

  const [parentMenus, setParentMenus] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [allowedProcessIds, setAllowedProcessIds] = useState([]);
  const navigate = useNavigate();




  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    navigate('/login?message2=You have successfully logged out.');
    logout();

  };


  const myStyle = {
    height: '40px',
  };

  const handleAddClick = () => {
    navigate(`/parent/changepassword`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isMobile = window.innerWidth <= 768;

  return (
    <div>
      <header style={navbarStyle} id="header" className="header fixed-top d-flex align-items-center">
        <div className="align-items-center justify-content-between">
          <a href="index.html" className="logo align-items-center">
            <img src={rapport} alt="Logo" />

          </a>
          {isMobile && (
            <span style={{ marginLeft: 50 }}>

              <FontAwesomeIcon
                icon={faBars} onClick={toggleSidebar}
                style={{ marginRight: "1px", color: 'white', width: 22, height: 22, marginTop: 9 }}
              />
            </span>
          )}

          {/* <i style={{ color: 'white' }} className="bi bi-list toggle-sidebar-btn" ></i> */}

        </div>
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">


            <li className="nav-item dropdown pe-3">
              <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  style={{ marginRight: "1px", color: 'white', width: 25, height: 25 }}
                />
                <span className="d-none d-md-block dropdown-toggle ps-2" style={{ color: 'white' }}>{username}</span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">

                <li>
                  <Link onClick={handleLogout} className="dropdown-item d-flex align-items-center" href="#">
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                    {/* <button className="btn"  onClick={handleLogout} style={{ fontSize: '12px',textDecoration:'none' }}>
                      Logout
                    </button> */}
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}