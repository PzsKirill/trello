import React from "react";

export type SidebarItemType = {
  id: number;
  title: string;
  icon?: React.ReactNode;
  link: string;
};

const SidebarData: SidebarItemType[] = [
  {
    id: 1,
    title: "Домашняя страница",
    icon: undefined,
    link: "/trello/index.html",
  },
  {
    id: 2,
    title: "Команда",
    icon: undefined,
    link: "/trello/team.html",
  },
  {
    id: 3,
    title: "Проекты",
    icon: undefined,
    link: "/trello/projects.html",
  },
  {
    id: 4,
    title: "Настройки",
    icon: undefined,
    link: "/trello/settings.html",
  }
];

export default SidebarData;
