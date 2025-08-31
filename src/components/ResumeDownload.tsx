'use client';

import { useState } from 'react';
import { FileText, Download, CheckCircle } from 'lucide-react';

const ResumeDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  const simulateDownload = () => {
    if (isDownloading || isCompleted) return;

    setIsDownloading(true);
    setProgress(0);
    setIsCompleted(false);

    // Simulate download progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setIsCompleted(true);
          
          // Create and trigger download
          const link = document.createElement('a');
          link.href = '/resume.pdf';
          link.download = 'Resume.pdf';
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Reset after 3 seconds
          setTimeout(() => {
            setIsCompleted(false);
            setProgress(0);
          }, 3000);

          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
  };

  const getProgressBar = () => {
    const filledBlocks = Math.floor((progress / 100) * 20);
    const emptyBlocks = 20 - filledBlocks;
    return '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);
  };

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="flex items-center gap-2">
          <div className="terminal-dot red"></div>
          <div className="terminal-dot yellow"></div>
          <div className="terminal-dot green"></div>
        </div>
        <div className="text-xs text-mono" style={{ color: 'var(--text-secondary)' }}>
          download_resume.sh
        </div>
      </div>
      
      <div className="terminal-content">
        <div className="space-y-4">
          {/* Download Header */}
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5" style={{ color: 'var(--text-accent)' }} />
            <div>
              <h4 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                Resume Download
              </h4>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Resume.pdf (245 KB)
              </p>
            </div>
          </div>

          {/* Terminal Output */}
          <div className="text-mono text-sm space-y-1">
            <div className="flex items-center gap-2">
              <span style={{ color: 'var(--text-success)' }}>$</span>
              <span>curl -O https://portfolio.erickkarki.com/resume.pdf</span>
            </div>
            
            {isDownloading && (
              <>
                <div style={{ color: 'var(--text-secondary)' }}>
                  % Total    % Received % Xferd  Average Speed
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  {progress.toFixed(0).padStart(3, ' ')}   245k  {progress.toFixed(0).padStart(3, ' ')}   245k    0     0  {Math.floor(Math.random() * 50 + 50)}k      0 --:--:-- --:--:-- --:--:-- {Math.floor(Math.random() * 50 + 50)}k
                </div>
              </>
            )}

            {isCompleted && (
              <div className="flex items-center gap-2" style={{ color: 'var(--text-success)' }}>
                <CheckCircle className="w-4 h-4" />
                <span>Download completed successfully!</span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {(isDownloading || isCompleted) && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span>Progress</span>
                <span>{Math.floor(progress)}%</span>
              </div>
              <div className="text-mono text-sm" style={{ color: 'var(--text-accent)' }}>
                [{getProgressBar()}]
              </div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {isCompleted ? 'Transfer complete' : `${Math.floor((progress / 100) * 245)} KB of 245 KB`}
              </div>
            </div>
          )}

          {/* Download Button */}
          {!isDownloading && !isCompleted && (
            <button
              onClick={simulateDownload}
              className="btn-primary flex items-center gap-2 w-full justify-center"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </button>
          )}

          {/* File Info */}
          <div className="border-t pt-3 text-xs space-y-1" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
            <div>Last modified: Dec 15, 2024</div>
            <div>Format: PDF</div>
            <div>Size: 245 KB</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeDownload;