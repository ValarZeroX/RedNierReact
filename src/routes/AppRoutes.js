import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainRoutes from './MainRoutes';
// import MemberRoutes from './MemberRoutes';
// import ForumRoutes from './ForumRoutes';
// import AdminRoutes from './AdminRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* 主要路由 */}
      <Route path="/*" element={<MainRoutes />} />

      {/* 会员后台路由 */}
      {/* <Route path="/dashboard/*" element={<MemberRoutes />} /> */}

      {/* 讨论区路由 */}
      {/* <Route path="/forum/*" element={<ForumRoutes />} /> */}

      {/* 管理后台路由 */}
      {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
    </Routes>
  );
};

export default AppRoutes;