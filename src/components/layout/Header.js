import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from '../../services/authService';
import { clearUser } from '../../store/userSlice';
import { Autocomplete, Group, Burger, rem, ActionIcon, useMantineColorScheme, Button, Avatar, Menu } from '@mantine/core';
// import { useColorScheme  } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from '../../assets/topbar.module.css';
import { IconBrandMantine, IconBrightnessDown, IconMoon, IconLogin, IconLanguage, IconLogout, IconSettings } from '@tabler/icons-react';
import Login from '../auth/Login';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
// 新增這個 import
import { IconLayoutDashboard } from '@tabler/icons-react';

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

function Header({ opened, toggle, toggleUserMenu }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const Icon = colorScheme === 'dark' ? IconBrightnessDown : IconMoon;
  const [loginModalOpened, { open: openLoginModal, close: closeLoginModal }] = useDisclosure(false);
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.user);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zhHant' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(clearUser());
    } catch (error) {
      console.error('登出时发生错误:', error);
      dispatch(clearUser());
    }
  };

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));

  return (
    <div className={classes.header}>
      {console.log('Rendering Header, isLoggedIn:', isLoggedIn)}
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <IconBrandMantine
            style={{ width: rem(36), height: rem(36) }}
            stroke={1.5}
            color="var(--mantine-color-blue-filled)"
          />
          <div>RedNier</div>
          {/* <MantineLogo size={28} /> */}
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
            visibleFrom="xs"
          />
           {isLoggedIn ? (
            <Menu transitionProps={{ transition: 'rotate-right', duration: 150 }}>
              <Menu.Target>
                <Avatar radius="xl" style={{ cursor: 'pointer' }} name={user?.name} key={user?.name} color="initials" />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />} onClick={toggleUserMenu}>
                  帳號設定
                </Menu.Item>
                <Menu.Item leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />} color="red" onClick={handleLogout}>
                  登出
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <ActionIcon variant="default" size="lg" onClick={openLoginModal} aria-label="Login">
              <IconLogin />
            </ActionIcon>
          )}
          <ActionIcon variant="default" size="lg" onClick={toggleLanguage} aria-label="Language">
            <IconLanguage />
          </ActionIcon>
          <ActionIcon
            variant="default"
            aria-label="Toggle theme"
            size="lg"
            onClick={() => toggleColorScheme()}
          >
            <Icon style={{ width: '80%', height: '80%' }} stroke={1.5} />
          </ActionIcon>
        </Group>
        <Login opened={loginModalOpened} close={closeLoginModal} />
      </div>
    </div>
  );
}

export default Header;
