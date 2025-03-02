import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div>
      {/* Auth specific layout (e.g., no navbar) */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
