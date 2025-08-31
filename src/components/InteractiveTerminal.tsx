'use client';

import { useState, useRef, useEffect } from 'react';
import VisitorAnalytics from './VisitorAnalytics';
import ResumeDownload from './ResumeDownload';

interface TerminalCommand {
  input: string;
  output: string[];
  type?: 'success' | 'error' | 'info';
}

interface InteractiveTerminalProps {
  onMatrixToggle?: (enabled: boolean) => void;
}

const InteractiveTerminal = ({ onMatrixToggle }: InteractiveTerminalProps) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalCommand[]>([
    {
      input: '',
      output: ['Welcome to Erick\'s portfolio terminal!', 'Type "help" to see available commands.'],
      type: 'info'
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showVisitorAnalytics, setShowVisitorAnalytics] = useState(false);
  const [showResumeDownload, setShowResumeDownload] = useState(false);
  const [matrixEnabled, setMatrixEnabled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = {
    help: {
      output: [
        'Available commands:',
        '  whoami       - About me',
        '  ls projects  - List my projects',
        '  cat skills.txt - View my skills',
        '  git status   - Check my GitHub activity',
        '  who          - Show visitor analytics',
        '  matrix       - Toggle Matrix rain effect',
        '  download     - Download resume with progress',
        '  contact      - Get in touch',
        '  clear        - Clear terminal',
        '  pwd          - Current location'
      ],
      type: 'info' as const
    },
    whoami: {
      output: [
        'Erick Karki',
        'Full-Stack Software Engineer',
        'Location: Kathmandu, Nepal',
        'Education: Computer Engineering @ Pokhara University',
        'Status: Available for opportunities'
      ],
      type: 'success' as const
    },
    'ls projects': {
      output: [
        'total 5',
        'drwxr-xr-x  2 erick  staff   64 Dec 15 10:30 ecommerce-platform/',
        'drwxr-xr-x  2 erick  staff   64 Dec 10 14:20 weather-dashboard/',
        'drwxr-xr-x  2 erick  staff   64 Nov 28 16:45 ai-chatbot/',
        'drwxr-xr-x  2 erick  staff   64 Nov 15 09:15 task-manager/',
        'drwxr-xr-x  2 erick  staff   64 Oct 30 12:00 portfolio-website/',
        '',
        'Use "cat projects/[name]" for more details'
      ],
      type: 'success' as const
    },
    'cat skills.txt': {
      output: [
        '# Technical Skills',
        '',
        'Frontend:',
        '  ├── React, Next.js, TypeScript',
        '  ├── Tailwind CSS, Material-UI',
        '  └── Redux, Context API',
        '',
        'Backend:',
        '  ├── Node.js, Express.js',
        '  ├── Python, Django, FastAPI',
        '  └── REST APIs, GraphQL',
        '',
        'Database:',
        '  ├── MongoDB, PostgreSQL',
        '  └── Redis, Firebase',
        '',
        'Cloud & DevOps:',
        '  ├── AWS (EC2, S3, Lambda)',
        '  ├── Docker, Kubernetes',
        '  └── CI/CD, GitHub Actions'
      ],
      type: 'success' as const
    },
    'git status': {
      output: [
        'On branch main',
        'Your branch is up to date with \'origin/main\'.',
        '',
        'Recent activity:',
        '  ✓ 127 commits this year',
        '  ✓ 15 repositories',
        '  ✓ 8 languages used',
        '  ✓ Most active in JavaScript & Python',
        '',
        'nothing to commit, working tree clean'
      ],
      type: 'success' as const
    },
    contact: {
      output: [
        'Contact Information:',
        '  📧 Email: contact.erickkarki@gmail.com',
        '  💼 LinkedIn: linkedin.com/in/erickkarki/',
        '  🐙 GitHub: github.com/erickkarki',
        '  📍 Location: Kathmandu, Nepal',
        '',
        'Feel free to reach out for opportunities!'
      ],
      type: 'success' as const
    },
    pwd: {
      output: ['/home/erick/portfolio'],
      type: 'success' as const
    },
    who: {
      output: ['Loading visitor analytics...'],
      type: 'success' as const
    },
    clear: {
      output: [],
      type: 'success' as const
    }
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === 'clear') {
      setHistory([]);
      setShowVisitorAnalytics(false);
      setShowResumeDownload(false);
      return;
    }

    if (trimmedCmd === 'who') {
      setShowVisitorAnalytics(true);
      const result: TerminalCommand = {
        input: cmd,
        output: ['Loading visitor analytics...'],
        type: 'success'
      };
      setHistory(prev => [...prev, result]);
      return;
    }

    if (trimmedCmd === 'matrix') {
      const newMatrixState = !matrixEnabled;
      setMatrixEnabled(newMatrixState);
      onMatrixToggle?.(newMatrixState);
      const result: TerminalCommand = {
        input: cmd,
        output: [newMatrixState ? 'Matrix rain effect enabled' : 'Matrix rain effect disabled'],
        type: 'success'
      };
      setHistory(prev => [...prev, result]);
      return;
    }


    if (trimmedCmd === 'download') {
      setShowResumeDownload(true);
      const result: TerminalCommand = {
        input: cmd,
        output: ['Initializing resume download...'],
        type: 'success'
      };
      setHistory(prev => [...prev, result]);
      return;
    }


    let result: TerminalCommand;

    if (commands[trimmedCmd as keyof typeof commands]) {
      const command = commands[trimmedCmd as keyof typeof commands];
      result = {
        input: cmd,
        output: command.output,
        type: command.type
      };
    } else if (trimmedCmd === '') {
      result = { input: cmd, output: [] };
    } else {
      result = {
        input: cmd,
        output: [`Command not found: ${cmd}`, 'Type "help" to see available commands.'],
        type: 'error'
      };
    }

    setHistory(prev => [...prev, result]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const commandHistory = history.filter(h => h.input.trim() !== '').map(h => h.input);
    
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      if (newIndex >= 0) {
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      if (newIndex >= 0) {
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [history]);

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="flex items-center gap-2">
          <div className="terminal-dot red"></div>
          <div className="terminal-dot yellow"></div>
          <div className="terminal-dot green"></div>
        </div>
        <div className="text-xs text-mono" style={{ color: 'var(--text-secondary)' }}>
          terminal — interactive
        </div>
      </div>
      
      <div className="terminal-content h-80 overflow-y-auto">
        <div className="space-y-2 text-mono text-sm">
          {history.map((cmd, index) => (
            <div key={index}>
              {cmd.input && (
                <div className="flex items-center">
                  <span style={{ color: 'var(--text-success)' }}>➜</span>
                  <span className="ml-2" style={{ color: 'var(--text-accent)' }}>~</span>
                  <span className="ml-2">$</span>
                  <span className="ml-2">{cmd.input}</span>
                </div>
              )}
              {cmd.output.map((line, lineIndex) => (
                <div 
                  key={lineIndex} 
                  className={`${cmd.type === 'error' ? 'text-red-400' : cmd.type === 'success' ? '' : 'text-blue-400'}`}
                  style={{ 
                    color: cmd.type === 'error' ? 'var(--text-error)' : 
                           cmd.type === 'info' ? 'var(--text-accent)' : 
                           'var(--text-primary)' 
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          ))}
          
          {/* Current input line */}
          <form onSubmit={handleSubmit} className="flex items-center">
            <span style={{ color: 'var(--text-success)' }}>➜</span>
            <span className="ml-2" style={{ color: 'var(--text-accent)' }}>~</span>
            <span className="ml-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="ml-2 bg-transparent border-none outline-none flex-1 text-mono text-sm"
              style={{ color: 'var(--text-primary)' }}
              autoComplete="off"
              spellCheck={false}
            />
            <span className="animate-pulse" style={{ color: 'var(--text-accent)' }}>|</span>
          </form>
        </div>
      </div>
      
      {/* Visitor Analytics Panel */}
      {showVisitorAnalytics && (
        <div className="mt-4 terminal-window">
          <div className="terminal-header">
            <div className="flex items-center gap-2">
              <div className="terminal-dot red"></div>
              <div className="terminal-dot yellow"></div>
              <div className="terminal-dot green"></div>
            </div>
            <div className="flex items-center justify-between flex-1">
              <div className="text-xs text-mono" style={{ color: 'var(--text-secondary)' }}>
                visitor_analytics.log
              </div>
              <button
                onClick={() => setShowVisitorAnalytics(false)}
                className="text-xs hover:opacity-80"
                style={{ color: 'var(--text-secondary)' }}
              >
                ✕
              </button>
            </div>
          </div>
          <div className="terminal-content">
            <VisitorAnalytics />
          </div>
        </div>
      )}
      
      {/* Resume Download Panel */}
      {showResumeDownload && (
        <div className="mt-4">
          <ResumeDownload />
        </div>
      )}
      
    </div>
  );
};

export default InteractiveTerminal;