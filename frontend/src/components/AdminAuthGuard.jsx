import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const AdminAuthGuard = ({ children }) => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        // If no user in Redux store or no admin token, redirect to login
        if (!user && !adminToken) {
          navigate('/admin/login');
          return;
        }

        // Verify token with backend
        const response = await axios.get(`${BASE_URL}/admin/verify`, {
          withCredentials: true
        });

        if (!response.data.success) {
          // Token is invalid, clear user and redirect
          dispatch(removeUser());
          navigate('/admin/login');
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        // Clear user and redirect to login on any error
        dispatch(removeUser());
        navigate('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [user, dispatch, navigate]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated, render the protected content
  return children;
};

export default AdminAuthGuard;
