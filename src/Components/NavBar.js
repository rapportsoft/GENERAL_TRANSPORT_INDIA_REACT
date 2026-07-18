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
import rapport from "../Images/transport_india_logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUser, faSignOutAlt, faUserCheck, faUserCircle, faUserGear, faUserPlus, faUserShield, faUsersRays, faRefresh, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FaUserShield } from 'react-icons/fa';
import '../assets/css/style.css';
import ipaddress from "../Components/IpAddress";

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
 const [insuranceData, setInsuranceData] = useState({
    limit: 0,
    used: 0,
    alertThreshold: 0,
    remaining: 0,
    percentage: 0,
    isAlert: false,
    isWarning: false,
    isCritical: false,
    status: 'NO_DATA',
    message: 'Insurance data loaded.',
    lastUpdated: new Date().toLocaleString(),
    isFromDatabase: false
  });


  console.log('insuranceData ',insuranceData,' ',(insuranceData && insuranceData.used > 0 && insuranceData.alertThreshold <= insuranceData.used) )
  const [loading, setLoading] = useState(false);
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
 useEffect(() => {
    if (isAuthenticated && companyid && branchId && jwtToken) {
      fetchInsuranceData();
    }
  }, [isAuthenticated, companyid, branchId, jwtToken]);

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
const fetchInsuranceData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${ipaddress}api/dashboard/getInsuranceData`,
        {
          params: { companyId: companyid, branchId: branchId },
          headers: { Authorization: `Bearer ${jwtToken}` }
        }
      );
      
      const data = response.data;
      setInsuranceData({
        limit: data.insuranceLimit || 0,
        used: data.insuranceLimtUsed || 0,
        alertThreshold: data.insuranceLimitAlert || 0,
        remaining: data.remaining || 0,
        percentage: data.percentage || 0,
        isAlert: data.isAlert || false,
        isWarning: data.isWarning || false,
        isCritical: data.isCritical || false,
        status: data.status || 'NO_DATA',
        message: data.message || 'Insurance data loaded.',
        lastUpdated: data.lastUpdated || new Date().toLocaleString(),
        isFromDatabase: data.isFromDatabase || false
      });
      
      console.log('Insurance Data:', data);
    } catch (error) {
      console.error("Error fetching insurance data:", error);
      setInsuranceData({
        limit: 0,
        used: 0,
        alertThreshold: 0,
        remaining: 0,
        percentage: 0,
        isAlert: false,
        isWarning: false,
        isCritical: false,
        status: 'ERROR',
        message: 'Unable to fetch insurance data.',
        lastUpdated: new Date().toLocaleString(),
        isFromDatabase: false
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header style={navbarStyle} id="header" className="header fixed-top d-flex align-items-center">
        <div className="align-items-center justify-content-between">
          <a href="index.html" className="align-items-center">
            <img src={rapport} alt="Logo" style={{ width: 140, height: 45 }} />

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
        
          <div
          style={{
            flexGrow: 1,
            overflow: "hidden",
            position: "relative",
            margin: "0 15px",
            height: "30px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Check if insurance data exists and if alert threshold is crossed */}
          {(insuranceData && insuranceData.used > 0 && insuranceData.alertThreshold <= insuranceData.used) && (
            <marquee
              behavior="scroll"
              direction="left"
              scrollamount="8"
              style={{
                color: insuranceData.isAlert ? "#FF4444" : "#FFD700",
                fontWeight: "bold",
                fontSize: "14px",
                lineHeight: "40px",
                whiteSpace: "nowrap",
                width: "100%",
              }}
            >
              {/* Show Alert if Used exceeds Alert Threshold */}
              {insuranceData.used >= insuranceData.alertThreshold ? (
                <span>
                  ⚠️ INSURANCE LIMIT ALERT: Used {insuranceData.used} / {insuranceData.limit} 
                  (Threshold: {insuranceData.alertThreshold}) - {insuranceData.percentage}% used
                  {insuranceData.remaining > 0 && ` | Remaining: ${insuranceData.remaining}`}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              ) : (
                <span>
                  ✅ Insurance: Used {insuranceData.used} / {insuranceData.limit} 
                  (Alert at: {insuranceData.alertThreshold}) - {insuranceData.percentage}% used
                  {insuranceData.remaining > 0 && ` | Remaining: ${insuranceData.remaining}`}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              )}

              {/* Show Warning/Critical messages if applicable */}
              {insuranceData.isWarning && (
                <span style={{ color: "#FFA500", marginLeft: "20px" }}>
                  ⚠️ WARNING: Insurance usage is approaching limit!
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              )}
              
              {insuranceData.isCritical && (
                <span style={{ color: "#FF0000", marginLeft: "20px" }}>
                  🔴 CRITICAL: Insurance limit almost reached!
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              )}
            </marquee>
          )}

          {/* Show loading or no data message */}
          {loading && (
            <span style={{ color: "#FFFFFF", fontSize: "14px" }}>
              Loading insurance data...
            </span>
          )}
          
          {!loading && insuranceData.status === 'NO_DATA' && (
            <span style={{ color: "#FFFFFF", fontSize: "14px" }}>
              No insurance data available
            </span>
          )}
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