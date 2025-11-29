import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { generateAICapsule } from '../utils/api';

const AICapsule = () => {
  const [loading, setLoading] = useState(false);
  const [capsule, setCapsule] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');
  const navigate = useNavigate();

  const handleGenerateCapsule = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🤖 Generating AI capsule...');

      const { data } = await generateAICapsule();
      console.log('✅ Capsule generated:', data);
      setCapsule(data);
      setActiveTab('summary'); // Set first tab active
    } catch (error) {
      console.error('❌ Error generating capsule:', error);
      setError(error.response?.data?.message || 'Failed to generate AI capsule');
    } finally {
      setLoading(false);
    }
  };

  const tabs = capsule ? [
    { id: 'summary', label: 'Summary', icon: '📖' },
    { id: 'emotionalTone', label: 'Emotional Tone', icon: '💭' },
    { id: 'keyMoments', label: 'Key Moments', icon: '⭐' },
    { id: 'timeline', label: 'Timeline', icon: '📅' },
    { id: 'storytelling', label: 'Stories', icon: '📚' }
  ] : [];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-3">
              AI Memory Capsule 🤖✨
            </h1>
            <p className="text-gray-600 text-lg">
              Let AI analyze your memories and create beautiful insights about your life journey
            </p>
          </div>

          {/* Generate Button Section */}
          {!capsule && (
            <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="text-8xl mb-6">🔮</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Generate Your AI Capsule
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  Our AI will analyze all your memories and create:
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                  <div className="bg-indigo-50 rounded-xl p-4">
                    <div className="text-3xl mb-2">📖</div>
                    <p className="text-sm font-semibold text-indigo-900">Life Summary</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="text-3xl mb-2">💭</div>
                    <p className="text-sm font-semibold text-purple-900">Emotional Analysis</p>
                  </div>
                  <div className="bg-pink-50 rounded-xl p-4">
                    <div className="text-3xl mb-2">⭐</div>
                    <p className="text-sm font-semibold text-pink-900">Key Moments</p>
                  </div>
                  <div className="bg-yellow-50 rounded-xl p-4">
                    <div className="text-3xl mb-2">📅</div>
                    <p className="text-sm font-semibold text-yellow-900">Timeline View</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="text-3xl mb-2">📚</div>
                    <p className="text-sm font-semibold text-green-900">Story Format</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="text-3xl mb-2">🎯</div>
                    <p className="text-sm font-semibold text-blue-900">Insights</p>
                  </div>
                </div>

                <button
                  onClick={handleGenerateCapsule}
                  disabled={loading}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl text-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="inline-block animate-spin mr-3">⚙️</span>
                      Generating Magic...
                    </>
                  ) : (
                    <>
                      ✨ Generate AI Capsule
                    </>
                  )}
                </button>

                {error && (
                  <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-600 font-medium">{error}</p>
                    {error.includes('No memories') && (
                      <button
                        onClick={() => navigate('/add-memory')}
                        className="mt-3 text-indigo-600 hover:text-indigo-700 font-semibold"
                      >
                        Create Your First Memory →
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Capsule Results */}
          {capsule && (
            <div className="space-y-6">
              {/* Info Card */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Capsule Generated! 🎉</h3>
                    <p className="opacity-90">
                      Analyzed {capsule.totalMemories} memories • Generated on {new Date(capsule.generatedAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={handleGenerateCapsule}
                    className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors"
                  >
                    🔄 Regenerate
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="flex overflow-x-auto border-b">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 min-w-[120px] px-6 py-4 font-semibold transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{tab.icon}</span>
                      <span className="text-sm">{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Content */}
                <div className="p-8">
                  {capsule.capsules[activeTab] && (
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-5xl">{capsule.capsules[activeTab].icon}</span>
                        <h2 className="text-3xl font-bold text-gray-900">
                          {capsule.capsules[activeTab].title}
                        </h2>
                      </div>
                      
                      <div className="prose prose-lg max-w-none">
                        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                          {capsule.capsules[activeTab].content}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AICapsule;