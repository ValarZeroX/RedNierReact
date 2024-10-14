import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState('Verifying...');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const urlParams = new URLSearchParams(location.search);
      const id = urlParams.get('id');
      const hash = urlParams.get('hash');

      if (id && hash) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/email/verify/${id}/${hash}`, {
            withCredentials: true
          });
          setVerificationStatus('Email verified successfully!');
          console.log(response);
        //   setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
          console.error('Verification error:', error);
          setVerificationStatus('Verification failed. Please try again.');
        }
      } else {
        setVerificationStatus('Invalid verification link.');
      }
    };

    verifyEmail();
  }, [location, navigate]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{verificationStatus}</p>
    </div>
  );
}

export default VerifyEmail;
