'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Copy, Check } from 'lucide-react';

interface CodeDemo {
  title: string;
  description: string;
  code: string;
  language: string;
  output: string[];
  explanation: string;
}

const LiveCodeDemo: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [output, setOutput] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const demos: CodeDemo[] = [
    {
      title: 'Binary Search Algorithm',
      description: 'Efficient searching in sorted arrays with O(log n) complexity',
      language: 'javascript',
      code: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    }
    
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}

const result = binarySearch([1,3,5,7,9,11,13,15], 7);
console.log(\`Found at index: \${result}\`);`,
      output: [
        'Starting binary search...',
        'Array: [1, 3, 5, 7, 9, 11, 13, 15]',
        'Target: 7',
        'Step 1: mid=4, arr[4]=9 > 7, search left',
        'Step 2: mid=1, arr[1]=3 < 7, search right', 
        'Step 3: mid=3, arr[3]=7 === 7, found!',
        'Result: Found at index 3',
        'Complexity: O(log n)'
      ],
      explanation: 'Binary search efficiently finds elements by repeatedly dividing the search space.'
    },
    {
      title: 'React Custom Hook',
      description: 'Reusable state logic for API data fetching',
      language: 'typescript',
      code: `function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [url]);
  
  useEffect(() => { fetchData(); }, [fetchData]);
  
  return { data, loading, error, refetch: fetchData };
}`,
      output: [
        'Creating reusable API hook...',
        'Setting up state management',
        'Configuring fetch logic',
        'Adding error handling',
        'Implementing cache strategy',
        'Hook ready for use',
        'Benefits: Reusable, Type-safe, Error handling'
      ],
      explanation: 'Custom hooks encapsulate complex logic and make it reusable across components.'
    }
  ];

  const runDemo = () => {
    if (isRunning) {
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    setIsRunning(true);
    setCurrentLine(0);
    setOutput([]);

    const demo = demos[activeDemo];
    let lineIndex = 0;

    intervalRef.current = setInterval(() => {
      if (lineIndex < demo.output.length) {
        setOutput(prev => [...prev, demo.output[lineIndex]]);
        setCurrentLine(lineIndex + 1);
        lineIndex++;
      } else {
        setIsRunning(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }, 600);
  };

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentLine(0);
    setOutput([]);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(demos[activeDemo].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    resetDemo();
  }, [activeDemo]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const demo = demos[activeDemo];

  return (
    <div className="card">
      {/* Demo Tabs */}
      <div className="flex border-b border-primary mb-6">
        {demos.map((d, index) => (
          <button
            key={index}
            onClick={() => setActiveDemo(index)}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeDemo === index
                ? 'text-accent border-b-2 border-accent'
                : 'text-secondary hover:text-primary'
            }`}
          >
            {d.title}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Code Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-subtitle text-lg">{demo.title}</h3>
              <p className="text-body text-sm">{demo.description}</p>
            </div>
            <button
              onClick={copyCode}
              className="btn-secondary text-sm"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div className="code-block">
            <pre className="text-sm">
              <code className="text-primary text-mono leading-relaxed">
                {demo.code}
              </code>
            </pre>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={runDemo}
              className="btn-primary text-sm"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Pause' : 'Run'}
            </button>
            <button
              onClick={resetDemo}
              className="btn-secondary text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Output Terminal */}
        <div className="space-y-4">
          <h4 className="text-subtitle text-lg">Output</h4>
          
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-tertiary ml-auto">output</span>
            </div>
            <div className="terminal-content h-64 overflow-y-auto">
              <div className="text-success text-mono mb-2">$ {demo.title.toLowerCase()}</div>
              {output.map((line, index) => (
                <div
                  key={index}
                  className="text-secondary mb-1 text-mono text-sm"
                >
                  <span className="text-tertiary">→ </span>
                  {line}
                </div>
              ))}
              {isRunning && (
                <div className="text-accent text-mono">
                  <span className="animate-pulse">⚡</span> Executing...
                </div>
              )}
            </div>
          </div>

          <div className="card-minimal">
            <h5 className="text-accent font-semibold mb-2 text-sm">Technical Note</h5>
            <p className="text-body text-sm">{demo.explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveCodeDemo;