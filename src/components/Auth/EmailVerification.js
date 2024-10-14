import React, { useState } from 'react';
import { resendVerificationEmail } from '../../services/authService';
import { Button, Text } from '@mantine/core';

const EmailVerification = () => {
  const [message, setMessage] = useState('');

  const handleResend = async () => {
    try {
      const response = await resendVerificationEmail();
      setMessage(response.message);
    } catch (error) {
      setMessage('Error resending verification email');
    }
  };

  return (
    <div>
      <Text>Please verify your email address. Check your inbox for the verification link.</Text>
      <Button onClick={handleResend}>Resend Verification Email</Button>
      {message && <Text>{message}</Text>}
    </div>
  );
};

export default EmailVerification;
