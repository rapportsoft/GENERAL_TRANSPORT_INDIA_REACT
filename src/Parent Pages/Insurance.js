// ============ INSURANCE COMPONENT ============
import React, { useContext, useEffect, useState } from "react";
import { FaShieldAlt, FaExclamationTriangle, FaCheckCircle, FaBell, FaChartLine } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../Components/AuthProvider";
import useAxios from "../Components/useAxios";
import { useNavigate } from "react-router-dom";
import ipaddress from "../Components/IpAddress";
import styles from "../Dashboard.module.css";
import moment from "moment";

export default function Insurance() {
  const { jwtToken, companyid, branchId, isAuthenticated } = useContext(AuthContext);
  const axios = useAxios();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [insuranceData, setInsuranceData] = useState({
    limit: 0,
    used: 0,
    alertThreshold: 0,
    remaining: 0,
    percentage: 0,
    isAlert: false,
    isWarning: false,
    isCritical: false,
    status: 'LOADING',
    message: 'Loading insurance data...',
    lastUpdated: '',
    isFromDatabase: false
  });

  // Authentication check
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?message=You need to be authenticated to access this page.");
    }
  }, [isAuthenticated, navigate]);

  // Fetch insurance data
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

  useEffect(() => {
    fetchInsuranceData();
  }, []);

  // Auto refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchInsuranceData();
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  // ============ BEAUTIFUL UI RENDER ============
  return (
    <>
      {/* Loading Screen */}
      {loading && (
        <div className="loader" style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}>
          <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div className={styles.dashboardBonding}>
        <section className={styles.widgetsCFSBonding} style={{ 
          position: "relative", 
          borderRadius: "16px", 
          marginBottom: "20px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "3px"
        }}>
          
          {/* Main Container */}
          <div style={{
            background: "white",
            borderRadius: "14px",
            padding: "25px",
            position: "relative",
            overflow: "hidden"
          }}>
            
            {/* Decorative Background Pattern */}
            <div style={{
              position: "absolute",
              top: "-50%",
              right: "-10%",
              width: "300px",
              height: "300px",
              background: "radial-gradient(circle, rgba(102,126,234,0.05) 0%, transparent 70%)",
              borderRadius: "50%"
            }}></div>

            {/* Header Section */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: '20px',
              borderBottom: '2px solid #f0f0f0',
              paddingBottom: '15px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '24px'
                }}>
                  <FaShieldAlt />
                </div>
                <div>
                  <h4 style={{ 
                    margin: 0, 
                    fontSize: '1.4rem', 
                    fontWeight: '700',
                    color: '#2d3748'
                  }}>
                    Insurance Limit Overview
                  </h4>
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#718096',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <FaBell style={{ fontSize: '10px' }} />
                    Last updated: {insuranceData.lastUpdated}
                  </span>
                </div>
              </div>
              
              <button 
                className="btn btn-primary"
                onClick={() => fetchInsuranceData()}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 20px',
                  color: 'white',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <FaChartLine /> Refresh
              </button>
            </div>

            {/* ====== ALERT STATUS CARD ====== */}
            {/* Show CRITICAL when Used >= Alert Threshold */}
            {insuranceData.used >= insuranceData.alertThreshold && (
              <div style={{
                background: 'linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%)',
                borderRadius: '16px',
                padding: '20px 25px',
                marginBottom: '20px',
                border: '3px solid #fc8181',
                boxShadow: '0 8px 25px rgba(252, 129, 129, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-30px',
                  right: '-30px',
                  width: '100px',
                  height: '100px',
                  background: 'rgba(252, 129, 129, 0.2)',
                  borderRadius: '50%'
                }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{
                    fontSize: '48px',
                    animation: 'pulse 1.5s infinite'
                  }}>
                    🚨
                  </div>
                  <div style={{ flex: 1 }}>
                    <h5 style={{ 
                      margin: 0, 
                      fontWeight: '800',
                      color: '#c53030',
                      fontSize: '1.2rem'
                    }}>
                      CRITICAL ALERT!
                    </h5>
                    <p style={{ 
                      margin: '5px 0 0 0',
                      color: '#9b2c2c',
                      fontSize: '15px',
                      fontWeight: '600'
                    }}>
                      Used Amount ({insuranceData.used.toLocaleString()}) has EXCEEDED Alert Threshold ({insuranceData.alertThreshold.toLocaleString()})
                    </p>
                    <p style={{
                      margin: '3px 0 0 0',
                      color: '#742a2a',
                      fontSize: '13px'
                    }}>
                      ⚠️ {insuranceData.message}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ====== STATISTICS CARDS ====== */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              marginBottom: '20px'
            }}>
              
              {/* Total Limit Card */}
              <div style={{
                background: 'linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%)',
                borderRadius: '12px',
                padding: '18px',
                textAlign: 'center',
                border: '2px solid #63b3ed',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ fontSize: '12px', color: '#2b6cb0', fontWeight: '600', marginBottom: '5px' }}>
                  📊 Total Limit
                </div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#2b6cb0' }}>
                  {insuranceData.limit.toLocaleString()}
                </div>
              </div>

              {/* Used Amount Card */}
              <div style={{
                background: insuranceData.used >= insuranceData.alertThreshold 
                  ? 'linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%)'
                  : 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)',
                borderRadius: '12px',
                padding: '18px',
                textAlign: 'center',
                border: insuranceData.used >= insuranceData.alertThreshold 
                  ? '3px solid #fc8181'
                  : '2px solid #68d391',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '5px', color: insuranceData.used >= insuranceData.alertThreshold ? '#c53030' : '#276749' }}>
                  💰 Used Amount
                </div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: insuranceData.used >= insuranceData.alertThreshold ? '#c53030' : '#276749' }}>
                  {insuranceData.used.toLocaleString()}
                </div>
                {insuranceData.used >= insuranceData.alertThreshold && (
                  <div style={{
                    fontSize: '11px',
                    color: '#c53030',
                    fontWeight: '700',
                    marginTop: '3px',
                    background: 'rgba(252, 129, 129, 0.3)',
                    padding: '2px 10px',
                    borderRadius: '12px',
                    display: 'inline-block'
                  }}>
                    ⚠️ EXCEEDED
                  </div>
                )}
              </div>

              {/* Alert Threshold Card */}
              <div style={{
                background: 'linear-gradient(135deg, #faf5ff 0%, #e9d8fd 100%)',
                borderRadius: '12px',
                padding: '18px',
                textAlign: 'center',
                border: '2px solid #b794f4',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ fontSize: '12px', color: '#553c9a', fontWeight: '600', marginBottom: '5px' }}>
                  ⚡ Alert Threshold
                </div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: '#553c9a' }}>
                  {insuranceData.alertThreshold.toLocaleString()}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: '#553c9a',
                  marginTop: '3px'
                }}>
                  {insuranceData.used >= insuranceData.alertThreshold ? '⚠️ Exceeded' : '✅ Safe'}
                </div>
              </div>

              {/* Remaining Card */}
              <div style={{
                background: insuranceData.remaining === 0 
                  ? 'linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%)'
                  : 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)',
                borderRadius: '12px',
                padding: '18px',
                textAlign: 'center',
                border: insuranceData.remaining === 0 
                  ? '3px solid #fc8181'
                  : '2px solid #68d391',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '5px', color: insuranceData.remaining === 0 ? '#c53030' : '#276749' }}>
                  📉 Remaining
                </div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: insuranceData.remaining === 0 ? '#c53030' : '#276749' }}>
                  {insuranceData.remaining.toLocaleString()}
                </div>
                {insuranceData.remaining === 0 && (
                  <div style={{
                    fontSize: '11px',
                    color: '#c53030',
                    fontWeight: '700',
                    marginTop: '3px',
                    background: 'rgba(252, 129, 129, 0.3)',
                    padding: '2px 10px',
                    borderRadius: '12px',
                    display: 'inline-block'
                  }}>
                    🚫 FULLY USED
                  </div>
                )}
              </div>
            </div>

            {/* ====== COMPARISON CHART ====== */}
            <div style={{
              background: '#f7fafc',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px',
              border: '2px solid #e2e8f0'
            }}>
              <h6 style={{ 
                margin: '0 0 15px 0', 
                fontWeight: '700',
                color: '#2d3748',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <FaChartLine style={{ color: '#667eea' }} />
                Usage Comparison
              </h6>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                {/* Used Bar */}
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#2d3748' }}>Used Amount</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: insuranceData.used >= insuranceData.alertThreshold ? '#c53030' : '#276749' }}>
                      {insuranceData.used.toLocaleString()}
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '30px',
                    background: '#edf2f7',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <div style={{
                      width: `${Math.min((insuranceData.used / insuranceData.limit) * 100, 100)}%`,
                      height: '100%',
                      background: insuranceData.used >= insuranceData.alertThreshold 
                        ? 'linear-gradient(90deg, #fc8181, #e53e3e)'
                        : 'linear-gradient(90deg, #68d391, #38a169)',
                      borderRadius: '8px',
                      transition: 'width 0.8s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingRight: '8px',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '700'
                    }}>
                      {insuranceData.percentage > 10 && `${insuranceData.percentage.toFixed(1)}%`}
                    </div>
                  </div>
                </div>

                {/* Alert Threshold Bar */}
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#2d3748' }}>Alert Threshold</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#553c9a' }}>
                      {insuranceData.alertThreshold.toLocaleString()}
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '30px',
                    background: '#edf2f7',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <div style={{
                      width: `${Math.min((insuranceData.alertThreshold / insuranceData.limit) * 100, 100)}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #b794f4, #805ad5)',
                      borderRadius: '8px',
                      transition: 'width 0.8s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingRight: '8px',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '700'
                    }}>
                      {((insuranceData.alertThreshold / insuranceData.limit) * 100) > 10 && 
                        `${((insuranceData.alertThreshold / insuranceData.limit) * 100).toFixed(1)}%`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div style={{
                marginTop: '15px',
                padding: '12px 20px',
                borderRadius: '10px',
                background: insuranceData.used >= insuranceData.alertThreshold 
                  ? 'linear-gradient(135deg, #fed7d7, #feb2b2)'
                  : 'linear-gradient(135deg, #f0fff4, #c6f6d5)',
                border: insuranceData.used >= insuranceData.alertThreshold 
                  ? '2px solid #fc8181'
                  : '2px solid #68d391',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '28px' }}>
                    {insuranceData.used >= insuranceData.alertThreshold ? '🚨' : '✅'}
                  </span>
                  <div>
                    <div style={{ 
                      fontWeight: '700',
                      color: insuranceData.used >= insuranceData.alertThreshold ? '#c53030' : '#276749',
                      fontSize: '15px'
                    }}>
                      {insuranceData.used >= insuranceData.alertThreshold 
                 //       ? `⚠️ ALERT: Used (${insuranceData.used.toLocaleString()}) > Alert (${insuranceData.alertThreshold.toLocaleString()})`
                  //      : `✅ SAFE: Used (${insuranceData.used.toLocaleString()}) < Alert (${insuranceData.alertThreshold.toLocaleString()})`
                     ? `⚠️ ALERT: Used `
                        : `✅ SAFE: Used `
                      }
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: insuranceData.used >= insuranceData.alertThreshold ? '#9b2c2c' : '#276749'
                    }}>
                      {insuranceData.message}
                    </div>
                  </div>
                </div>
                <div style={{
                  padding: '4px 15px',
                  borderRadius: '20px',
                  background: insuranceData.used >= insuranceData.alertThreshold ? '#fc8181' : '#68d391',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '14px'
                }}>
                  {insuranceData.used >= insuranceData.alertThreshold ? 'CRITICAL' : 'NORMAL'}
                </div>
              </div>
            </div>

            {/* Database Info */}
            {insuranceData.isFromDatabase && (
              <div style={{
                marginTop: '10px',
                padding: '10px 15px',
                background: '#ebf8ff',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#2b6cb0',
                textAlign: 'center',
                border: '1px solid #bee3f8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                flexWrap: 'wrap'
              }}>
                
                <span>| Alert: {insuranceData.alertThreshold.toLocaleString()}</span>
                <span>| Used: {insuranceData.used.toLocaleString()}</span>
                <span>| Status: <strong style={{ 
                  color: insuranceData.used >= insuranceData.alertThreshold ? '#c53030' : '#276749'
                }}>
                  {insuranceData.used >= insuranceData.alertThreshold ? '⚠️ EXCEEDED' : '✅ SAFE'}
                </strong></span>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Add CSS Animation */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </>
  );
}