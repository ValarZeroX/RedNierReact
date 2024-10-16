// import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';
import { Button, Container, Title, Text, Modal, Divider, Checkbox, TextInput, PasswordInput, Paper } from '@mantine/core';
import { loginWithGoogle, processTokenFromURL, login } from '../../services/authService';  // 引入 login 函數
import { IconBrandGoogleFilled, IconBrandFacebookFilled } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/form';
import { Link } from 'react-router-dom';

function Login({ opened, close }) {
    const [error, setError] = useState('');
    const { t } = useTranslation();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
            termsOfService: false,
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 8 ? 'Password must be at least 8 characters' : null),
        },
    });

    const handleLogin = async (values) => {
        try {
            await login(values.email, values.password);
            // 登入成功後的處理，例如關閉 Modal 或重定向
            close();
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError(t(err.response.data.message));
              } else {
                setError(t('login.error'));
              }
            // 處理登入錯誤，例如顯示錯誤消息
            // console.error('Login failed:', error);
            // 這裡可以添加錯誤處理邏輯，比如設置表單錯誤狀態
        }
    };

    const handleRegisterClick = (e) => {
        close(); // 關閉 Modal
    };

    return (
        <>
            <Modal opened={opened} onClose={close} title="" centered>
                <Container size="xs">
                    <Title order={2} align="center" style={{ marginBottom: 30 }}>
                        {t('login.title')}
                    </Title>
                    <Text align="center" size="sm" style={{ marginBottom: 20 }}>
                        繼續操作即表示您同意我們的使用者協議,並確認您了解隱私權政策。
                    </Text>
                    {error && (  // 顯示錯誤訊息
                        <Text color="red" size="sm" align="center" style={{ marginBottom: 10 }}>
                            {error}
                        </Text>
                    )}
                    <form onSubmit={form.onSubmit(handleLogin)}>
                        <TextInput
                            withAsterisk
                            label="電子信箱"
                            placeholder="your@email.com"
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                        />
                        <PasswordInput
                            withAsterisk
                            label="密碼"
                            placeholder="Password"
                            key={form.key('password')}
                            {...form.getInputProps('password')}
                        />
                        <Checkbox
                            mt="md"
                            label="保持登入"
                            key={form.key('termsOfService')}
                            {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                            style={{ marginBottom: 10 }}
                        />
                        <Button fullWidth type="submit" variant="default">登入</Button>
                    </form>
                    <Divider my="md" label={t('login.or')} labelPosition="center" />
                    <Button justify="space-between" fullWidth leftSection={<IconBrandGoogleFilled size={14} />} variant="default" onClick={loginWithGoogle} style={{ marginBottom: 10 }} rightSection={<span />}>
                        {t('login.google')}
                    </Button>
                    <Button justify="space-between" fullWidth leftSection={<IconBrandFacebookFilled size={14} />} variant="default" style={{ marginBottom: 10 }} rightSection={<span />}>
                        {t('login.facebook')}
                    </Button>
                    <Text size="sm" style={{ marginBottom: 30 }}>
                        還沒有帳號？ <Link to="/register" onClick={handleRegisterClick}>註冊</Link>
                    </Text>
                </Container>
            </Modal>
        </>
    );
}

export default Login;
