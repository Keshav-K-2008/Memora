import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/add-memory', icon: '➕', label: 'Add Memory' },
    { path: '/view-memory', icon: '👁️', label: 'View Memories' },
    { path: '/ai-capsule', icon: '🤖', label: 'AI Capsule' }, // New item
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-indigo-800 to-purple-900 text-white min-h-screen p-6 shadow-2xl">
      <div className="mb-10">
        <h2 className="text-3xl font-black mb-2">Memora</h2>
        <p className="text-indigo-200 text-sm">Your Memory Vault</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              location.pathname === item.path
                ? 'bg-white text-indigo-900 font-bold shadow-lg transform scale-105'
                : 'hover:bg-indigo-700 hover:pl-6'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-10">
        <div className="bg-indigo-700 rounded-lg p-4">
          <p className="text-sm text-indigo-200 mb-2">💡 Tip</p>
          <p className="text-xs text-white">
            Try the AI Capsule to get insights from your memories!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;