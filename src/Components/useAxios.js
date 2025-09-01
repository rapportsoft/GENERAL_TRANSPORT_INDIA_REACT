// import axios from 'axios';
// import AuthContext from '../Components/AuthProvider';
// import { useContext } from 'react';
// import { toast } from "react-toastify";

// let isSessionExpired = false; // Module-level variable to track session expiry

// const useAxios = () => {
//   const {
//     jwtToken,
//     logout
//   } = useContext(AuthContext);

//   const axiosInstance = axios.create({
//     baseURL: 'http://localhost:8080', // Your API base URL
//   });




//   // Add Authorization header to all requests
//   axiosInstance.interceptors.request.use(
//     config => {
//       if (jwtToken) {
//         config.headers['Authorization'] = `Bearer ${jwtToken}`;
//       }
//       return config;
//     },
//     error => Promise.reject(error)
//   );

//   // Response interceptor to handle 401 errors
//   axiosInstance.interceptors.response.use(
//     response => response,
//     error => {
//       if (error.response && error.response.status === 401) {
//         if (!isSessionExpired) {
//           isSessionExpired = true;
//           logout();
//           toast.error("Session expired. Please log in again.", {
//             autoClose: 1000,
//             onClose: () => {
//               isSessionExpired = false; // Reset the flag when the toast is closed
//             }
//           });
//         }
//       }
//       return Promise.reject(error);
//     }
//   );

//   return axiosInstance;
// };

// export default useAxios;


import axios from 'axios';
import AuthContext from '../Components/AuthProvider';
import { useContext } from 'react';
import { toast } from "react-toastify";

let isSessionExpired = false;

const useAxios = () => {
  const { jwtToken, logout } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: 'http://103.240.90.122:8080/GENERAL',
  });

  axiosInstance.interceptors.request.use(
    config => {
      if (jwtToken) {
        config.headers['Authorization'] = `Bearer ${jwtToken}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      const { response } = error;

      if (response && response.status === 401) {
        const errorMessage = response.data?.message || '';

        // Only logout if the token is expired or unauthorized explicitly
        const isJwtExpired = errorMessage.toLowerCase().includes("expired") ||
          errorMessage.toLowerCase().includes("invalid token");

        if (isJwtExpired && !isSessionExpired) {
          isSessionExpired = true;
          logout();
          toast.error("Session expired. Please log in again.", {
            autoClose: 1000,
            onClose: () => {
              isSessionExpired = false;
            }
          });
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
