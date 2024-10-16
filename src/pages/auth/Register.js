import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Paper, Title, Container, Box, Text, Loader, Center } from '@mantine/core';
import { register } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError(t('register.passwordError'));
      setIsLoading(false);
      return;
    }

    try {
      const response = await register(email, password);      
      // 註冊成功後，直接導航到驗證郵件頁面
      navigate('/register-success');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        const errors = err.response.data.errors;
        const firstErrorField = Object.keys(errors)[0]; // 取第一個字段名
        const firstErrorMessage = errors[firstErrorField][0]; // 取第一個錯誤訊息
    setError(firstErrorMessage); // 設置錯誤訊息
      } else {
        setError(t('register.error'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title align="center" order={2} mb={30}>
        {t('register.title')}
      </Title>
      <Paper withBorder shadow="md" p={30} radius="md">
        {isLoading ? (
          <Center style={{ height: 300 }}>
            <Loader color="blue" size="xl" />
          </Center>
        ) : (
          <>
            {error && <Text color="red" mb="md">{error}</Text>}
            <form onSubmit={handleSubmit}>
              <Box mb="md">
                <TextInput
                  label={t('register.email')}
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
                  label={t('register.password')}
                  placeholder={t('register.passwordPlaceholder')}
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
                  label={t('register.confirmPassword')}
                  placeholder={t('register.confirmPasswordPlaceholder')}
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
                {t('register.register')}
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default Register;
