import React from 'react';
import { NavLink, Divider } from '@mantine/core';
import { IconHome, IconFlame, IconMessage, IconGauge } from '@tabler/icons-react';
import CategoryMenu from '../category/CategoryMenu';

function OriginMenu({ onNavigate }) {
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
      <CategoryMenu />
    </nav>
  );
}

export default OriginMenu;
