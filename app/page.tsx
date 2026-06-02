import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          Vigileon
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-10">
          Master the art of modern development. High-quality video lessons for the next generation of creators.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/register" 
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-bold text-lg transition-all transform hover:scale-105"
          >
            Get Started for Free
          </Link>
          <Link 
            href="/login" 
            className="px-8 py-4 border border-gray-700 hover:bg-gray-800 rounded-full font-bold text-lg transition-all"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-gray-800/50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-6 rounded-2xl bg-gray-800 border border-gray-700">
            <div className="text-blue-500 text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-2">Fast Learning</h3>
            <p className="text-gray-400">Straight to the point lessons designed for busy developers.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-800 border border-gray-700">
            <div className="text-blue-500 text-3xl mb-4">🎥</div>
            <h3 className="text-xl font-bold mb-2">HD Video Content</h3>
            <p className="text-gray-400">Crystal clear video and audio quality for every single lesson.</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-800 border border-gray-700">
            <div className="text-blue-500 text-3xl mb-4">🛠️</div>
            <h3 className="text-xl font-bold mb-2">Real Projects</h3>
            <p className="text-gray-400">Build real-world applications that you can add to your portfolio.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 border-t border-gray-800">
        <p>© {new Date().getFullYear()} Vigileon. All rights reserved.</p>
      </footer>
    </div>
  );
}
