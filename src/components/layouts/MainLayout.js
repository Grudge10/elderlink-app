import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      {/* Header or Navbar can go here */}
      <main>
        <Outlet />
      </main>
      {/* Footer can go here */}
    </div>
  );
};

export default MainLayout;
