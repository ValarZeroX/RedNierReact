import React from 'react';
import { NavLink, Divider } from '@mantine/core';
import { IconHome, IconFlame, IconMessage, IconPlus } from '@tabler/icons-react';
import CategoryMenu from '../category/CategoryMenu';
import { useSelector } from 'react-redux';

function OriginMenu({ onNavigate }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <nav>
      <NavLink
        label="首頁"
        leftSection={<IconHome size="1rem" stroke={1.5} />}
        onClick={() => onNavigate('/')}
      />
      <NavLink
        label="熱門"
        leftSection={<IconFlame size="1rem" stroke={1.5} />}
        onClick={() => onNavigate('/courses')}
      />
      <Divider my="xs" label="討論區" labelPosition="left" />
      {isLoggedIn && (
        <NavLink
          label="建立社群"
          leftSection={<IconPlus size="1rem" stroke={1.5} />}
          onClick={() => onNavigate('/user/create-community')}
        />
      )}
      <CategoryMenu />
      <Divider my="xs" label="部落格" labelPosition="left" />
    </nav>
  );
}

export default OriginMenu;
