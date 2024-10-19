import React from 'react';
import { NavLink, Divider } from '@mantine/core';
import { IconHome, IconBook, IconMessage, IconGauge } from '@tabler/icons-react';

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
      <Divider my="xs" label="討論區" labelPosition="left" />
      <NavLink
        label="討論區"
        leftSection={<IconMessage size="1rem" stroke={1.5} />}
        onClick={() => onNavigate('/forum')}
      />
      <NavLink
        href="#required-for-focus"
        label="First parent link"
        leftSection={<IconGauge size="1rem" stroke={1.5} />}
        childrenOffset={28}
      >
        <NavLink href="#required-for-focus" label="First child link" />
        <NavLink label="Second child link" href="#required-for-focus" />
        <NavLink label="Nested parent link" childrenOffset={28} href="#required-for-focus">
          <NavLink label="First child link" href="#required-for-focus" />
          <NavLink label="Second child link" href="#required-for-focus" />
          <NavLink label="Third child link" href="#required-for-focus" />
        </NavLink>
      </NavLink>
    </nav>
  );
}

export default OriginMenu;
