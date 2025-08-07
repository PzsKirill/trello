import SidebarItem from './sidebarItem';
import SidebarData from './sidebarData';
import AccountDropdown from './AccountDropdown';
import './style/AccountDropdown.css'

const Sidebar: React.FC = () => {
  return (
    <div className="side-bar flex flex-col min-h-svh p-2 gap-2 justify-between">
      <nav className="flex flex-col gap-2">
        {SidebarData.map((item) => (
          <SidebarItem key={item.id} title={item.title} link={item.link} icon={item.icon} />
        ))}
      </nav>

      {/* Вкладка аккаунта */}
      <div className="pt-4">
        <AccountDropdown />
      </div>
    </div>
  );
};

export default Sidebar;