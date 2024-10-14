import React from 'react';
import { NavLink } from '@mantine/core';
import { IconHome, IconBook, IconMessage } from '@tabler/icons-react';

function OriginMenu({ onNavigate }) {
  return (
    <nav>
      <NavLink
        label="首頁"
        leftSection={<IconHome size="1rem" stroke={1.5} />}
        onClick={() => onNavigate('/')}
      />
      <NavLink
        label="課程"
        leftSection={<IconBook size="1rem" stroke={1.5} />}
        onClick={() => onNavigate('/courses')}
      />
      <NavLink
        label="討論區"
        leftSection={<IconMessage size="1rem" stroke={1.5} />}
        onClick={() => onNavigate('/forum')}
      />
    </nav>
  );
}

export default OriginMenu;
