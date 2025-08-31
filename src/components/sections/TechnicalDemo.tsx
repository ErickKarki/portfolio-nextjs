'use client';

import { Terminal, Code, Play } from 'lucide-react';
import LiveCodeDemo from '../LiveCodeDemo';

const TechnicalDemo = () => {
  return (
    <section id="technical-demo" className="section">
      <div className="container">
        {/* Header */}
        <div className="mb-16 slide-up">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="w-8 h-8 text-accent" />
            <h2 className="text-title">Live Code Demonstrations</h2>
          </div>
          <p className="text-body max-w-3xl">
            Interactive code examples showing algorithms, patterns, and solutions in action. 
            Each demo includes real-time execution and technical explanations.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 slide-up">
          <div className="card text-center">
            <Code className="w-8 h-8 text-accent mx-auto mb-4" />
            <h3 className="text-subtitle text-lg mb-2">Algorithm Visualization</h3>
            <p className="text-body text-sm">Step-by-step execution with real output</p>
          </div>
          
          <div className="card text-center">
            <Play className="w-8 h-8 text-accent mx-auto mb-4" />
            <h3 className="text-subtitle text-lg mb-2">Interactive Execution</h3>
            <p className="text-body text-sm">Run, pause, and analyze code behavior</p>
          </div>
          
          <div className="card text-center">
            <Terminal className="w-8 h-8 text-accent mx-auto mb-4" />
            <h3 className="text-subtitle text-lg mb-2">Production Examples</h3>
            <p className="text-body text-sm">Real-world patterns and solutions</p>
          </div>
        </div>

        {/* Demo Component */}
        <div className="slide-up">
          <LiveCodeDemo />
        </div>
      </div>
    </section>
  );
};

export default TechnicalDemo;