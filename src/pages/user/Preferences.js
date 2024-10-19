import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme, Switch, Select, Paper, Title, Stack, Grid, Container, Button } from '@mantine/core';
import { IconMoon, IconSun, IconLanguage, IconDeviceFloppy } from '@tabler/icons-react';
import { updateUserSettings } from '../../services/userService';

function Preferences() {
  const { i18n, t } = useTranslation();
  const { colorScheme, toggleColorScheme, setColorScheme } = useMantineColorScheme();
  const [language, setLanguage] = useState(localStorage.getItem('language') || i18n.language);

  useEffect(() => {
    // 從 localStorage 讀取主題設置
    const savedTheme = localStorage.getItem('mantine-color-scheme-value');
    if (savedTheme) {
      setColorScheme(savedTheme);
    }

    // 從 localStorage 讀取語言設置
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (value) => {
    setLanguage(value);
    i18n.changeLanguage(value);
    localStorage.setItem('language', value);
  };

  const handleThemeChange = () => {
    const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
    toggleColorScheme();
    localStorage.setItem('mantine-color-scheme-value', newTheme);
  };

  const handleSaveSettings = async () => {
    try {
      const settings = {
        theme: colorScheme,
        language: language
      };
      await updateUserSettings(settings);
      // 可以在這裡添加成功提示
      console.log('Settings saved successfully');
    } catch (error) {
      // 錯誤處理
      console.error('Failed to save settings:', error);
    }
  };

  return (
    <Container size="sm">
      <Paper padding="md" radius="md">
        <Title order={2} mb="md">{t('preferences.title')}</Title>
        <Stack spacing="lg">
          <Grid align="center">
            <Grid.Col span={8}>
              <div>
                <Title order={4}>{t('preferences.theme')}</Title>
                {t('preferences.themeDescription')}
              </div>
            </Grid.Col>
            <Grid.Col span={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Switch
                checked={colorScheme === 'dark'}
                onChange={handleThemeChange}
                size="lg"
                onLabel={<IconMoon size="1rem" stroke={1.5} />}
                offLabel={<IconSun size="1rem" stroke={1.5} />}
              />
            </Grid.Col>
          </Grid>
          <Grid align="center">
            <Grid.Col span={8}>
              <div>
                <Title order={4}>{t('preferences.language')}</Title>
                {t('preferences.languageDescription')}
              </div>
            </Grid.Col>
            <Grid.Col span={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Select
                value={language}
                onChange={handleLanguageChange}
                data={[
                  { value: 'en', label: 'English' },
                  { value: 'zhHant', label: '繁體中文' },
                ]}
                icon={<IconLanguage size="1rem" />}
              />
            </Grid.Col>
          </Grid>
          <Button
            leftSection={<IconDeviceFloppy size="1rem" />}
            onClick={handleSaveSettings}
            style={{ alignSelf: 'flex-end' }}
          >
            {t('preferences.saveButton')}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

export default Preferences;
