import { useContext } from 'react';
import useAxios from '../Components/useAxios';
import ipaddress from './IpAddress';
import AuthContext from './AuthProvider';

const useApi = () => {
   const {
      jwtToken,
   } = useContext(AuthContext);

   const axios = useAxios();

   const api = async (method, endpoint, data = null) => {
      const config = {
         method,
         url: `${ipaddress}${endpoint}`,
         headers: {
            Authorization: `Bearer ${jwtToken}`
         }
      };

      if (data) {
         config.data = data;
      }

      try {
         const response = await axios(config);
         return response.data;
      } catch (error) {
         console.error('API call error:', error);
         throw error;
      }
   };

   return api;
};

export default useApi;
