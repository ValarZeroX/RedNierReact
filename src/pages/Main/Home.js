import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Header from '../../components/layout/Header';
import UserMenu from '../../components/layout/UserMenu';
import OriginMenu from '../../components/layout/OriginMenu';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { logout } from '../../services/authService'; // 確保導入 logout 函數

function Home() {
    const [opened, { toggle }] = useDisclosure();
    const [isUserMenu, setIsUserMenu] = useState(false);
    const navigate = useNavigate();

    const toggleUserMenu = () => {
        setIsUserMenu(!isUserMenu);
    };

    const handleLogout = async () => {
        try {
            await logout();
            setIsUserMenu(false);
            navigate('/'); // 登出後導航到首頁
        } catch (error) {
            console.error('登出時發生錯誤:', error);
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

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
            <Header opened={opened} toggle={toggle} toggleUserMenu={toggleUserMenu} />
        </AppShell.Header>
  
        <AppShell.Navbar p="md">
          {isUserMenu ? (
            <UserMenu onLogout={handleLogout} onNavigate={handleNavigation} />
          ) : (
            <OriginMenu onNavigate={handleNavigation} />
          )}
        </AppShell.Navbar>
  
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    );
}

export default Home;
