import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getMemories, deleteMemory } from '../utils/api';

const ViewMemory = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this memory?')) {
      try {
        await deleteMemory(id);
        setMemories(memories.filter(m => m._id !== id));
      } catch (error) {
        console.error('Error deleting memory:', error);
      }
    }
  };

  const filteredMemories = filter === 'all' 
    ? memories 
    : memories.filter(m => m.type === filter);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Your Memories</h1>
            
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Types</option>
              <option value="note">Notes</option>
              <option value="photo">Photos</option>
              <option value="audio">Audio</option>
              <option value="video">Videos</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading memories...</p>
            </div>
          ) : filteredMemories.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600 mb-4">No memories found</p>
              <button
                onClick={() => navigate('/add-memory')}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
              >
                Create Your First Memory
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMemories.map((memory) => (
                <div key={memory._id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-3xl">
                      {memory.type === 'note' && '📝'}
                      {memory.type === 'photo' && '📸'}
                      {memory.type === 'audio' && '🎙️'}
                      {memory.type === 'video' && '🎥'}
                    </div>
                    <button
                      onClick={() => handleDelete(memory._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {memory.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {memory.description || memory.content}
                  </p>

                  {memory.tags && memory.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {memory.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="text-xs text-gray-500">
                    {new Date(memory.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMemory;