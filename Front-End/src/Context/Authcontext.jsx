import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

   useEffect(()=>{
        const verifyuser=async()=>{
            try {
                const response = await axios.get('https://bq6kmv94-8000.inc1.devtunnels.ms/api/auth/verify')
                if(response.data.success){
                    
                }
            } catch (error) {
               console.log(error);
               
            }
        }
    },[])

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;