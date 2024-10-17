import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Paper, Title, Text, Loader, Button, Stack, Center } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { resendVerificationEmail } from '../../services/authService';

function VerifyEmail() {
  const [status, setStatus] = useState('verifying');
  const [resendStatus, setResendStatus] = useState('');
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(location.search);
      const verifyUrl = params.get('verify_url');

      // 使用 decodeURIComponent 將 URL 解碼回去
    const decodedUrl = decodeURIComponent(verifyUrl);
      if (!decodedUrl) {
        setStatus('error');
        return;
      }

      try {
        const response = await axios.get(decodedUrl, {
          headers: {
            // Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        if (response.data.message === 'Email already verified.') {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    };

    verifyEmail();
  }, [location]);

  const handleResendVerification = async () => {
    setResendStatus('sending');
    try {
      await resendVerificationEmail();
      setResendStatus('success');
    } catch (error) {
      console.error('Resend verification error:', error);
      setResendStatus('error');
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'verifying':
        return (
        <Center>
            <Loader size="xl" />
        </Center>
        );
      case 'success':
        return <Text>{t('verifyEmail.success')}</Text>;
      case 'error':
        return (
          <Stack>
            <Text color="red">{t('verifyEmail.error')}</Text>
            {resendStatus === 'success' && <Text color="green">{t('verifyEmail.resendSuccess')}</Text>}
            {resendStatus === 'error' && <Text color="red">{t('verifyEmail.resendError')}</Text>}
            <Button onClick={handleResendVerification} loading={resendStatus === 'sending'}>
              {t('verifyEmail.resend')}
            </Button>
          </Stack>
        );
      default:
        return null;
    }
  };

  return (
    <Container size={420} my={40}>
      <Title align="center" order={2} mb={30}>
        {t('verifyEmail.title')}
      </Title>
      <Paper withBorder shadow="md" p={30} radius="md">
        {renderContent()}
      </Paper>
    </Container>
  );
}

export default VerifyEmail;
