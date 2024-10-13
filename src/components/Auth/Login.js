// import { useDisclosure } from '@mantine/hooks';
import React, { useEffect } from 'react';
import { Button, Container, Title, Text, Modal, Divider } from '@mantine/core';
import { loginWithGoogle, processTokenFromURL } from '../../services/authService';  // 引入 authService 中的函数
import { IconBrandGoogleFilled, IconBrandFacebookFilled } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

function Login({ opened, close }) {
    const { t } = useTranslation();
    useEffect(() => {
        // 处理 URL 中的 token
        processTokenFromURL();
    }, []);

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
                    <Button justify="space-between" fullWidth leftSection={<IconBrandGoogleFilled size={14} />} variant="default" onClick={loginWithGoogle} style={{ marginBottom: 10 }} rightSection={<span />}>
                        {t('login.google')}
                    </Button>
                    <Button justify="space-between" fullWidth leftSection={<IconBrandFacebookFilled size={14} />} variant="default" style={{ marginBottom: 10 }} rightSection={<span />}>
                        {t('login.facebook')}
                    </Button>
                    <Divider my="md" label={t('login.or')} labelPosition="center" />
                </Container>
            </Modal>

            {/* <Button onClick={open}>Open centered Modal</Button> */}
        </>
    );
}

export default Login;