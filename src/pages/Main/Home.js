import React from 'react';
import Header from '../../components/layout/Header';
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

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
  
        <AppShell.Main>Main</AppShell.Main>
      </AppShell>
    );
}

export default Home;