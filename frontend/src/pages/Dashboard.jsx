import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getMemories } from '../utils/api';

const Dashboard = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      const { data } = await getMemories();
      setMemories(data);
    } catch (error) {
      console.error('Error fetching memories:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Memories</h3>
              <p className="text-3xl font-bold text-indigo-600">{memories.length}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">This Month</h3>
              <p className="text-3xl font-bold text-purple-600">
                {memories.filter(m => new Date(m.createdAt).getMonth() === new Date().getMonth()).length}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">This Week</h3>
              <p className="text-3xl font-bold text-pink-600">
                {memories.filter(m => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(m.createdAt) > weekAgo;
                }).length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Memories</h2>
            {loading ? (
              <p className="text-gray-600">Loading memories...</p>
            ) : memories.length === 0 ? (
              <p className="text-gray-600">No memories yet. Start creating your first memory!</p>
            ) : (
              <div className="space-y-4">
                {memories.slice(0, 5).map((memory) => (
                  <div key={memory._id} className="border-l-4 border-indigo-500 pl-4 py-2">
                    <h3 className="font-semibold text-gray-900">{memory.title}</h3>
                    <p className="text-sm text-gray-600">{memory.description}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(memory.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;