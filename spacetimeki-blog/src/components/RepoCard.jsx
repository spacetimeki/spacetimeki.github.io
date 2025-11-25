import { motion } from "framer-motion";

export default function RepoCard({ repo }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <motion.div
      className="border border-terminal-border rounded p-4 hover:border-terminal-blue transition-all duration-300 bg-terminal-dark-bg/50 hover:shadow-lg hover:shadow-terminal-blue/10"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-start justify-between mb-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-terminal-blue font-bold hover:text-white transition-colors text-lg"
        >
          {repo.name}
        </a>
        <div className="flex gap-3 text-xs text-terminal-text">
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1">
              ⭐ {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1">
              🔱 {repo.forks_count}
            </span>
          )}
        </div>
      </div>

      {repo.description && (
        <p className="text-terminal-text text-sm mb-3">
          → {repo.description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 text-xs text-terminal-text">
        {repo.language && (
          <span className="px-2 py-1 border border-terminal-border rounded bg-terminal-blue/20">
            {repo.language}
          </span>
        )}
        
        {repo.topics && repo.topics.length > 0 && (
          repo.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 border border-terminal-border rounded bg-terminal-blue/10"
            >
              #{topic}
            </span>
          ))
        )}

        <span className="ml-auto text-gray-500">
          updated {formatDate(repo.updated_at)}
        </span>
      </div>

      {repo.homepage && (
        <div className="mt-3 pt-3 border-t border-terminal-border">
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-terminal-blue hover:text-white transition-colors underline"
          >
            🔗 {repo.homepage.toLowerCase()}
          </a>
        </div>
      )}
    </motion.div>
  );
}
