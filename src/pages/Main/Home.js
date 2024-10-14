import React from 'react';
import Header from '../../components/layout/Header';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';

function Home() {
    const [opened, { toggle }] = useDisclosure();

    return (
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
            <Header opened={opened} toggle={toggle} />
        </AppShell.Header>
  
        <AppShell.Navbar p="md">Navbar</AppShell.Navbar>
  
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    );
}

export default Home;
