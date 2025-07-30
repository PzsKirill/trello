import React from 'react';

type SidebarItemProps = {
  icon: React.ReactNode;
  title: string;
};

const SidebarItem = ({ icon, title }: SidebarItemProps) => {
  return (
    <a className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded" href="#">
      <span>{icon}</span>
      <span>{title}</span>
    </a>
  );
};

export default SidebarItem;
