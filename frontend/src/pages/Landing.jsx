import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight drop-shadow-2xl">
            Welcome to <span className="text-yellow-300">Memora</span>
          </h1>
          <p className="text-2xl md:text-3xl text-white mb-12 max-w-4xl mx-auto font-medium leading-relaxed drop-shadow-lg">
            Capture and cherish your life's precious moments. Save notes, photos, audio, and videos in one beautiful place.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="bg-white text-indigo-700 px-10 py-5 rounded-xl text-xl font-bold hover:bg-yellow-300 hover:text-indigo-900 transition-all duration-300 shadow-2xl hover:shadow-yellow-300/50 transform hover:scale-105"
              >
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-white text-indigo-700 px-10 py-5 rounded-xl text-xl font-bold hover:bg-yellow-300 hover:text-indigo-900 transition-all duration-300 shadow-2xl hover:shadow-yellow-300/50 transform hover:scale-105"
                >
                  Start Saving Moments ✨
                </Link>
                <Link
                  to="/login"
                  className="bg-transparent border-4 border-white text-white px-10 py-5 rounded-xl text-xl font-bold hover:bg-white hover:text-indigo-700 transition-all duration-300 shadow-2xl transform hover:scale-105"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-yellow-300/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
            <div className="text-6xl mb-6 text-center">📝</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">Notes</h3>
            <p className="text-gray-700 text-lg text-center leading-relaxed">
              Capture your thoughts and ideas instantly
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-purple-300/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
            <div className="text-6xl mb-6 text-center">📸</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">Photos & Videos</h3>
            <p className="text-gray-700 text-lg text-center leading-relaxed">
              Store your visual memories securely
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-pink-300/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
            <div className="text-6xl mb-6 text-center">🎙️</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">Audio</h3>
            <p className="text-gray-700 text-lg text-center leading-relaxed">
              Record and save your voice notes
            </p>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="mt-32 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 drop-shadow-lg">
            Why Choose Memora?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 border-2 border-white/30">
              <div className="text-4xl mb-3">🔒</div>
              <h4 className="text-xl font-bold text-white mb-2">Secure</h4>
              <p className="text-white/90 font-medium">Your memories are encrypted and safe</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 border-2 border-white/30">
              <div className="text-4xl mb-3">☁️</div>
              <h4 className="text-xl font-bold text-white mb-2">Cloud Storage</h4>
              <p className="text-white/90 font-medium">Access from anywhere, anytime</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 border-2 border-white/30">
              <div className="text-4xl mb-3">🎨</div>
              <h4 className="text-xl font-bold text-white mb-2">Beautiful UI</h4>
              <p className="text-white/90 font-medium">Elegant design for your memories</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 border-2 border-white/30">
              <div className="text-4xl mb-3">🚀</div>
              <h4 className="text-xl font-bold text-white mb-2">Fast & Easy</h4>
              <p className="text-white/90 font-medium">Simple and intuitive to use</p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-32 text-center pb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white mb-10 font-medium drop-shadow-lg">
            Join thousands of users preserving their precious moments
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="inline-block bg-yellow-400 text-indigo-900 px-12 py-6 rounded-xl text-2xl font-black hover:bg-yellow-300 transition-all duration-300 shadow-2xl hover:shadow-yellow-300/50 transform hover:scale-110"
            >
              Get Started Free 🎉
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;