
import React, { useContext, useEffect, useState } from "react";
import ipaddress from "./IpAddress";
import "../Components/Style.css";
import AuthContext from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { Row, Col } from "reactstrap";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { toast } from 'react-toastify';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Form } from "react-bootstrap"; // Assuming you're using react-bootstrap
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FormControl } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import logoUrl from "../Images/DGDCLogo.png"
const defaultTheme = createTheme();
// const logoUrl = 'https://www.dgdcseepz.com/sites/all/themes/mmtcec/img/logo.png'; // Your logo URL

export default function Login2() {
 
  return (
    <div>

    </div>
  );
}

