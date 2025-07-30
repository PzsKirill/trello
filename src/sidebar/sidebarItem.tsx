import React from "react";

type SidebarItemProps = {
  title: string;
  link: string;
  icon?: React.ReactNode;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ title, link, icon }) => {
  return (
    <a className="list-a flex items-center gap-3 w-full font-medium px-3 py-3 hover:bg-white/20" href={link}>
      {icon && <span>{icon}</span>}
      {title}
    </a>
  );
};

export default SidebarItem;
