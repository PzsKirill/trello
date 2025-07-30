import { FaHome, FaUser } from 'react-icons/fa';
import React from 'react';
import { FaGlassWaterDroplet } from 'react-icons/fa6';

export type SidebarItemType = {
  id: number;
  title: string;
  icon: React.ReactNode;
};

const SidebarData: SidebarItemType[] = [
  {
    id: 1,
    title: 'Home',
    icon: <FaHome />,
  },
  {
    id: 2,
    title: 'Profile',
    icon: <FaUser />,
  },
  {
    id: 3,
    title: 'Setting',
    icon: <FaGlassWaterDroplet />,
  },
];

export default SidebarData;
