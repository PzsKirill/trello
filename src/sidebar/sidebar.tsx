import SidebarItem from './sidebarItem';
import SidebarData from './sidebarData';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-yellow-100 p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">My App</h2>
      {SidebarData.map(item => (
        <SidebarItem key={item.id} icon={item.icon} title={item.title} />
      ))}
    </div>
  );
};

export default Sidebar;