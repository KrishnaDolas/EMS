import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Correct way: headers are a separate argument
          const response = await axios.post(
            'https://bq6kmv94-8000.inc1.devtunnels.ms/api/auth/verify',
            {}, // empty request body
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.success) {
            setUser(response.data.user);
          } else {
            // If verification failed, remove token and navigate to login
            localStorage.removeItem('token');
            setUser(null);
            setLoading(false)
            // Optional: navigate to login
            // navigate('/login');
          }
        } catch (error) {
          // Handle error: token invalid, server error, etc.
          if (error.response && error.response.data.error === 'Token Not Provided') {
            // No token or token missing
            setUser(null);
            // Optional: navigate('/login');
          } else {
            // Other errors
            console.error('Verification error:', error);
            setUser(null);
            // Optional: navigate('/login');
          }
        }
      } else {
        setUser(null);
        // Optional: navigate('/login');
      }
      setLoading(false);
    };
    verifyUser();
  }, [navigate]);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;