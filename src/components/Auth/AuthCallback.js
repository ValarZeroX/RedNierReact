import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchUserData } from '../../services/authService';
import { useMantineColorScheme } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';

function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setColorScheme } = useMantineColorScheme();
  const dispatch = useDispatch();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    const handleUserAuthentication = async (token) => {
      try {
        localStorage.setItem('token', token);
        
        const user = await fetchUserData(token);
        if (user) {
          setColorScheme(user.theme);
          dispatch(setUser(user));
          navigate('/');
        }
      } catch (error) {
        console.error('Error during user authentication:', error);
        navigate('/login?error=auth_failed');
      }
    };

    if (token) {
      handleUserAuthentication(token);
    } else {
      navigate('/login?error=auth_failed');
    }
  }, [navigate, location, setColorScheme, dispatch]);

  return <div>處理認證中...</div>;
}

export default AuthCallback;
