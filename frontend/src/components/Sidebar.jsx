import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Add Memory', path: '/add-memory', icon: '➕' },
    { name: 'View Memories', path: '/view-memory', icon: '👁️' }
  ];

  return (
    <div className="w-64 bg-gray-800 min-h-screen text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-indigo-400">Memora</h2>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
              location.pathname === item.path ? 'bg-gray-700 text-white border-l-4 border-indigo-500' : ''
            }`}
          >
            <span className="text-2xl mr-3">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;