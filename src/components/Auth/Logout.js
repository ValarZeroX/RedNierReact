import React from 'react';
import { Button, Container, Title } from '@mantine/core';
// import axios from 'axios';
import { logout } from '../../services/authService';

function Logout() {
  const handleLogout = async () => {
    const token = localStorage.getItem('token');  // 从 localStorage 获取用户 Token

    try {
      // 调用 authService.js 中的登出函数
      await logout(token);

      // 成功登出后清除 token 并重定向
      // localStorage.removeItem('token');
      // window.location.href = '/';
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <Container size="xs" style={{ marginTop: 100 }}>
      <Title align="center" style={{ marginBottom: 30 }}>
        登出
      </Title>
      <Button fullWidth color="red" size="lg" onClick={handleLogout}>
        登出
      </Button>
    </Container>
  );
}

export default Logout;