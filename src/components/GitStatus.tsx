'use client';

import { useState, useEffect } from 'react';
import { GitBranch, GitCommit, Calendar, Activity } from 'lucide-react';

const GitStatus = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const commitHistory = [
    { hash: 'a7f3c2d', message: 'feat: add interactive terminal component', time: '2 hours ago', author: 'Erick' },
    { hash: '9b8e1f4', message: 'style: enhance project card syntax highlighting', time: '5 hours ago', author: 'Erick' },
    { hash: 'c5d9a8b', message: 'fix: improve terminal command parsing', time: '1 day ago', author: 'Erick' },
    { hash: '2f6h9k3', message: 'docs: update README with new features', time: '2 days ago', author: 'Erick' },
    { hash: '8m4n7j1', message: 'refactor: optimize component performance', time: '3 days ago', author: 'Erick' }
  ];

  const stats = {
    totalCommits: 127,
    branches: 3,
    languages: ['JavaScript', 'TypeScript', 'Python', 'Java'],
    contributions: 89
  };

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="flex items-center gap-2">
          <div className="terminal-dot red"></div>
          <div className="terminal-dot yellow"></div>
          <div className="terminal-dot green"></div>
        </div>
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="text-xs text-mono" style={{ color: 'var(--text-secondary)' }}>
            git log --oneline
          </div>
          <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-success)' }}>
            <GitBranch className="w-3 h-3" />
            <span>main</span>
          </div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {currentTime}
          </div>
        </div>
      </div>
      
      <div className="terminal-content">
        <div className="space-y-4">
          {/* Git Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-lg font-semibold text-mono" style={{ color: 'var(--text-accent)' }}>
                {stats.totalCommits}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Commits
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-mono" style={{ color: 'var(--text-success)' }}>
                {stats.branches}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Branches
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-mono" style={{ color: 'var(--text-warning)' }}>
                {stats.languages.length}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Languages
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-mono" style={{ color: 'var(--text-accent)' }}>
                {stats.contributions}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                This Year
              </div>
            </div>
          </div>

          {/* Recent Commits */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4" style={{ color: 'var(--text-success)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                Recent Activity
              </span>
            </div>
            
            {commitHistory.map((commit, index) => (
              <div key={commit.hash} className="flex items-start gap-3 py-2">
                <GitCommit className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--text-success)' }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-mono font-medium" style={{ color: 'var(--text-warning)' }}>
                      {commit.hash}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {commit.time}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    {commit.message}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--text-accent)' }}></div>
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {commit.author}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Language Stats */}
          <div className="border-t pt-4" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4" style={{ color: 'var(--text-accent)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                Languages Used
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {stats.languages.map((lang) => (
                <span key={lang} className="tech-tag text-xs">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitStatus;