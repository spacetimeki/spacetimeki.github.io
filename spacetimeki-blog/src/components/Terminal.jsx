import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import RepoCard from "./RepoCard";

export default function Terminal() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  const fetchGitHubRepos = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.github.com/users/spacetimeki/repos?sort=updated&per_page=10');
      
      if (!response.ok) {
        throw new Error('Failed to fetch repositories');
      }
      
      const data = await response.json();
      setRepos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching repos:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-terminal-dark-bg p-4 md:p-8">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="mb-8 border border-terminal-border rounded-lg p-6 bg-terminal-light-bg shadow-lg shadow-terminal-blue/20">
          <div className="flex items-center justify-between mb-4">
            <p className="text-terminal-blue font-bold">
              <span className="text-terminal-green">spacetimeki</span>
              <span className="text-terminal-text">@</span>
              <span className="text-terminal-blue">archlinux</span>
              <span className="text-purple-400"> ~/projects</span>
              <span className="text-terminal-green">$</span>
            </p>
            <a
              href="../index.html"
              className="text-terminal-blue hover:text-white transition-colors underline text-sm"
            >
              ← back to terminal
            </a>
          </div>
          <p className="text-terminal-blue mb-2"># hi, i'm ki 👋</p>
          <p className="text-terminal-text">All things Cybersecurity</p>
        </div>

        {/* Repos Section */}
        <div className="border border-terminal-border rounded-lg p-6 bg-terminal-light-bg shadow-lg shadow-terminal-blue/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-terminal-blue text-xl font-bold">
              [~] github repositories
            </h2>
            <button
              onClick={fetchGitHubRepos}
              className="text-sm text-terminal-blue hover:text-white transition-colors underline"
              disabled={loading}
            >
              {loading ? 'refreshing...' : 'refresh'}
            </button>
          </div>

          {loading && (
            <div className="text-terminal-text animate-pulse">
              <p>$ fetching repos from github...</p>
              <p className="mt-2">loading<span className="cursor">_</span></p>
            </div>
          )}

          {error && (
            <div className="text-red-400 border border-red-400 rounded p-4">
              <p className="font-bold">Error:</p>
              <p>{error}</p>
              <button
                onClick={fetchGitHubRepos}
                className="mt-2 underline hover:text-red-300"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && repos.length > 0 && (
            <div className="space-y-4">
              {repos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          )}

          {!loading && !error && repos.length === 0 && (
            <p className="text-terminal-text">No repositories found.</p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 border border-terminal-border rounded-lg p-6 bg-terminal-light-bg shadow-lg shadow-terminal-blue/20">
          <p className="text-terminal-blue font-bold mb-3">[~] connect with me:</p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.linkedin.com/in/ki-antic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-text hover:text-terminal-blue transition-colors underline"
            >
              → LinkedIn
            </a>
            <a
              href="https://github.com/spacetimeki"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-text hover:text-terminal-blue transition-colors underline"
            >
              → GitHub
            </a>
            <a
              href="https://instagram.com/spacetimeki"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-text hover:text-terminal-blue transition-colors underline"
            >
              → Instagram
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
