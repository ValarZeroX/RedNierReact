import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Box } from '@mantine/core';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 這裡添加註冊邏輯
    console.log('註冊:', { email, password, confirmPassword });
  };

  return (
    <Container size={420} my={40}>
      <Title align="center" order={2} mb={30}>
        註冊新帳戶
      </Title>
      <Paper withBorder shadow="md" p={30} radius="md">
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
