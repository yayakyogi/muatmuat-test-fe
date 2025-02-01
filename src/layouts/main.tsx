import React from "react";
import { Outlet } from "react-router";

const MainLayout: React.FC = () => {
  return (
    <div className="max-w-[800px] mx-a h-screen">
      <Outlet />
    </div>
  );
};

export default MainLayout;
