import React, { useEffect } from 'react';
import { Button, Container, Title, Text } from '@mantine/core';
import { loginWithGoogle, processTokenFromURL } from '../../services/authService';  // 引入 authService 中的函数

function OAuthLogin() {
  useEffect(() => {
    // 处理 URL 中的 token
    processTokenFromURL();
  }, []);

  return (
    <Container size="xs" style={{ marginTop: 100 }}>
      <Title align="center" style={{ marginBottom: 30 }}>
        登入
      </Title>
      <Text align="center" size="lg" style={{ marginBottom: 20 }}>
        使用 Google 帳戶登入
      </Text>
      <Button variant="filled" color="blue" onClick={loginWithGoogle}>
        登入 Google
      </Button>
    </Container>
  );
}

export default OAuthLogin;