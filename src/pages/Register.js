import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Box, Text } from '@mantine/core';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('密碼不匹配');
      return;
    }

    try {
      const response = await register(email, password);
      console.log('註冊成功:', response);
      
      // 檢查響應中是否包含 access_token
      if (response.access_token) {
        localStorage.setItem('token', response.access_token);
        navigate('/dashboard');
      } else {
        // 如果沒有 token，可能需要額外的處理
        console.log('註冊成功，但未收到 token');
        navigate('/login'); // 或者導航到登錄頁面
      }
    } catch (err) {
      console.error('註冊錯誤:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('註冊失敗，請稍後再試');
      }
    }
  };

  return (
    <Container size={420} my={40}>
      <Title align="center" order={2} mb={30}>
        註冊新帳戶
      </Title>
      <Paper withBorder shadow="md" p={30} radius="md">
        {error && <Text color="red" mb="md">{error}</Text>}
        <form onSubmit={handleSubmit}>
          <Box mb="md">
            <TextInput
              label="電子郵件"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              styles={{
                label: {
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  fontWeight: 'bold',
                },
              }}
            />
          </Box>
          <Box mb="md">
            <PasswordInput
              label="密碼"
              placeholder="您的密碼"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              styles={{
                label: {
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  fontWeight: 'bold',
                },
              }}
            />
          </Box>
          <Box mb="xl">
            <PasswordInput
              label="確認密碼"
              placeholder="再次輸入密碼"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              styles={{
                label: {
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  fontWeight: 'bold',
                },
              }}
            />
          </Box>
          <Button type="submit" fullWidth>
            註冊
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Register;
