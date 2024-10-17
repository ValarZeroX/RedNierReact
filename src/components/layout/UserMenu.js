import React from 'react';
import { NavLink, Stack } from '@mantine/core';
import { IconDashboard, IconUsers, IconSettings, IconLogout } from '@tabler/icons-react';

function UserMenu({ onLogout, onNavigate }) {
  return (
    <Stack justify="space-between" h="100%">
      <nav>
        <NavLink
          label="儀表板"
          leftSection={<IconDashboard size="1rem" stroke={1.5} />}
          onClick={() => onNavigate('/user/dashboard')}
        />
        <NavLink
          label="個人資料"
          leftSection={<IconUsers size="1rem" stroke={1.5} />}
          onClick={() => onNavigate('/user/profile')}
        />
        <NavLink
          label="設置"
          leftSection={<IconSettings size="1rem" stroke={1.5} />}
          onClick={() => onNavigate('/user/preferences')}
        />
      </nav>
      <NavLink
        label="登出"
        leftSection={<IconLogout size="1rem" stroke={1.5} />}
        onClick={onLogout}
        style={{ marginTop: 'auto' }}
      />
    </Stack>
  );
}

export default UserMenu;
