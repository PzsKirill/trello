import SidebarItem from './sidebarItem';
import SidebarData from './sidebarData';

const Sidebar: React.FC = () => {
  return (
    <div className="side-bar flex flex-col min-h-svh p-2 w-64 gap-2">
      <nav className="flex flex-col min-h-svh gap-2">
        {SidebarData.map((item) => (
          <SidebarItem key={item.id} title={item.title} link={item.link} icon={item.icon} />
        ))}
      </nav>
      <div>
        <span>
          <span>
            <img src='' />
          </span>
          <span>
            User name
          </span>
        </span>
        <span></span>
      </div>
    </div>
  );
};

export default Sidebar;