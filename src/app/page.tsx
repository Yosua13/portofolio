export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col font-sans">
      <header className="w-full p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Portfolio</h1>
          <nav>
            <ul className="flex space-x-6 text-sm font-medium text-slate-600 dark:text-slate-300">
              <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Projects</a></li>
              <li><a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          Welcome to My Web App
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mb-8 leading-relaxed">
          This is a starter template built with Next.js and Tailwind CSS. The boilerplate has been removed and it's ready for development.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-full hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-sm">
            Get Started
          </button>
          <button className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
            Learn More
          </button>
        </div>
      </main>

      <footer className="w-full p-6 text-center text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} Portfolio. All rights reserved.
      </footer>
    </div>
  );
}
