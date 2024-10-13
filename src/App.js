import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';  // 引入路由组件

function App() {
  return (
      <Router>
        <AppRoutes />  {/* 使用提取的路由组件 */}
      </Router>
  );
}

export default App;