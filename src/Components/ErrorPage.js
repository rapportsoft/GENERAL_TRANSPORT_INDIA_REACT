import React, { useContext, useState ,useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Loader from "react-loader-spinner";
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DatePicker from "react-datepicker"; // Import the DatePicker component
import {

    Card,
    CardBody,

} from "reactstrap";
import AuthContext from "../Components/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowsRotate,
    faArrowsToEye,
    faArrowUpFromBracket,
    faEdit,
    faExclamationTriangle,
    faFileAlt,
    faFolderPlus,
    faPeopleGroup,
    faPlus,
    faPrint,
    faRecordVinyl,
    faRefresh,
    faSave,
    faTrash,
    faTruckArrowRight,
    faTruckFast,
    faTruckFront,
    faTruckMoving,
} from "@fortawesome/free-solid-svg-icons";
const defaultTheme = createTheme();
export default function ErrorPage() {




    const [showModal, setShowModal] = useState(false);

    const [loading, setLoading] = useState(true);

    // Simulate a delay for demonstration purposes (you can replace this with your actual data fetching logic)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Clean up the timeout to avoid memory leaks
        return () => clearTimeout(timeout);
    }, []);


    
    return (


        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <Typography component="h1" variant="h5" style={{ fontSize: '4rem' }}>
                            🌐
                        </Typography>
                    </Avatar>
                    <Typography component="h1" variant="h5" style={{ fontSize: '4rem' }}>
                        404 !
                    </Typography>
                    <Typography component="h1" variant="h5" style={{ fontSize: '2rem' }}>
                        WE ARE SORRY 🌐
                    </Typography>


                    <Box component="form" noValidate sx={{ mt: 1 }}>

                  
                        <Typography component="p" variant="body1">
                            Service temporarily unavailable. Lost connection.🚀
                        </Typography>
                        
                       

                    </Box>

                    
                </Box>

            </Container>
        </ThemeProvider>

    );
}