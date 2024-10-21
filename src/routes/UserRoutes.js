import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Profile from '../pages/user/Profile';
import Preferences from '../pages/user/Preferences';
import CreateCommunity from '../pages/CreateCommunity';

// import Dashboard from '../pages/user/Dashboard';
// import Settings from '../pages/user/Settings';

function UserRoutes() {
  return (
    <Routes>
      <Route index element={<Profile />} />
      <Route path="profile" element={<Profile />} />
      <Route path="/preferences" element={<Preferences />} />  {/* 新增這行 */}
      
      <Route path="/create-community" element={<CreateCommunity />} />
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* <Route path="settings" element={<Settings />} /> */}
    </Routes>
  );
}

export default UserRoutes;
