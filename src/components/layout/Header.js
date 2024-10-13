import { Autocomplete, Group, Burger, rem, ActionIcon, useMantineColorScheme } from '@mantine/core';
// import { useColorScheme  } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from '../../assets/topbar.module.css';
import { IconBrandMantine, IconBrightnessDown, IconMoon, IconLogin, IconLanguage } from '@tabler/icons-react';
import Login from '../auth/Login';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';


const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

function Header({ opened, toggle }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const Icon = colorScheme === 'dark' ? IconBrightnessDown : IconMoon;
  const [loginModalOpened, { open: openLoginModal, close: closeLoginModal }] = useDisclosure(false);
  const { i18n, t } = useTranslation();
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zhtw' : 'en';
    i18n.changeLanguage(newLang);
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
          <ActionIcon variant="default" size="lg" onClick={openLoginModal}>
            <IconLogin />
          </ActionIcon>
          <ActionIcon variant="default" size="lg" onClick={toggleLanguage}>
            <IconLanguage />
          </ActionIcon>
          <ActionIcon
            variant="default"
            aria-label="Toggle theme"
            size="lg"
            onClick={() => toggleColorScheme()}
          >
            {/* 根据当前主题切换图标 */}
            <Icon style={{ width: '80%', height: '80%' }} stroke={1.5} />
          </ActionIcon>
        </Group>
        <Login opened={loginModalOpened} close={closeLoginModal} />
      </div>
    </div>
  );
}

export default Header; 