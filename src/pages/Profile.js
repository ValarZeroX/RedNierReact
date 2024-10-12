import React from 'react';
import { useParams } from 'react-router-dom';

function Profile() {
  const { id } = useParams(); // 抓取路由參數

  return (
    <div>
      <h1>Profile Page for User: {id}</h1>
    </div>
  );
}

export default Profile;