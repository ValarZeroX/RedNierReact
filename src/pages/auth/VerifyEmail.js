import React, { useState } from 'react';
import { Button, Paper, Title, Container, Text } from '@mantine/core';
import { resendVerificationEmail } from '../../services/authService';

function VerifyEmail() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleResendEmail = async () => {
    try {
      await resendVerificationEmail();
      setMessage('驗證郵件已重新發送，請檢查您的郵箱。');
      setError('');
    } catch (err) {
      console.error('重新發送驗證郵件錯誤:', err);
      setError('重新發送驗證郵件失敗，請稍後再試。');
      setMessage('');
    }
  };

  return (
    <Container size={420} my={40}>
      <Title align="center" order={2} mb={30}>
        驗證您的電子郵件
      </Title>
      <Paper withBorder shadow="md" p={30} radius="md">
        <Text mb="md">
          我們已經向您的電子郵件地址發送了一封驗證郵件。請檢查您的郵箱並點擊驗證鏈接。
        </Text>
        {message && <Text color="green" mb="md">{message}</Text>}
        {error && <Text color="red" mb="md">{error}</Text>}
        <Button onClick={handleResendEmail} fullWidth>
          重新發送驗證郵件
        </Button>
      </Paper>
    </Container>
  );
}

export default VerifyEmail;