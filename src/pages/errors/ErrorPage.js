// src/pages/errors/ErrorPage.js

import React from 'react';
import { Title, Text, Button, Container, Group } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';
import classes from '../../assets/NotFoundTitle.module.css';
import { useTranslation } from 'react-i18next';

function ErrorPage({ status }) {
    const navigate = useNavigate();
    //   const location = useLocation();
    const { t } = useTranslation();

    // 从导航状态中获取错误信息
    //   const { state } = location;
    //   const { status } = state || { status: 500 };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Container className={classes.root}>
            <div className={classes.label}>{status}</div>
            <Title className={classes.title}>
                {t('error.unexpected')}
            </Title>
            <Text color="dimmed" size="lg" align="center" className={classes.description}>
                {t('error.contactAdmin')}
            </Text>
            <Group justify="center">
                <Button size="md" onClick={handleGoHome}>
                    {t('notFound.button')}
                </Button>
            </Group>
        </Container>
    );
}

export default ErrorPage;
