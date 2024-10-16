import React from 'react';
import { Title, Text, Button, Container, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from '../../assets/NotFoundTitle.module.css';
import { useTranslation } from 'react-i18next';

function NotFoundTitle() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>{t('notFound.title')}</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
      {t('notFound.error')}
      </Text>
      <Group justify="center">
        <Button size="md" onClick={handleGoHome}>{t('notFound.button')}</Button>
      </Group>
    </Container>
  );
}

export default NotFoundTitle;