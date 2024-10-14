// import { useDisclosure } from '@mantine/hooks';
import React, { useEffect } from 'react';
import { Button, Container, Title, Text, Modal, Divider, Checkbox, TextInput, PasswordInput } from '@mantine/core';
import { loginWithGoogle, processTokenFromURL } from '../../services/authService';  // 引入 authService 中的函数
import { IconBrandGoogleFilled, IconBrandFacebookFilled } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/form';

function Login({ opened, close }) {
    const { t } = useTranslation();
    useEffect(() => {
        // 处理 URL 中的 token
        processTokenFromURL();
    }, []);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
            termsOfService: false,
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            confirmPassword: (value, values) =>
                value !== values.password ? 'Passwords did not match' : null,
        },
    });

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
                    <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
                        <Button fullWidth variant="default">登入</Button>
                    </form>
                    <Divider my="md" label={t('login.or')} labelPosition="center" />
                    <Button justify="space-between" fullWidth leftSection={<IconBrandGoogleFilled size={14} />} variant="default" onClick={loginWithGoogle} style={{ marginBottom: 10 }} rightSection={<span />}>
                        {t('login.google')}
                    </Button>
                    <Button justify="space-between" fullWidth leftSection={<IconBrandFacebookFilled size={14} />} variant="default" style={{ marginBottom: 10 }} rightSection={<span />}>
                        {t('login.facebook')}
                    </Button>
                    <Text size="sm" style={{ marginBottom: 30 }}>註冊</Text>    
                </Container>
            </Modal>
            {/* <Button onClick={open}>Open centered Modal</Button> */}
        </>
    );
}

export default Login;