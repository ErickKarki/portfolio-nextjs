'use client';

import { Play, Github, Linkedin, Mail, Code, ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-12">
      <div className="container">
        <div className="max-w-4xl">
          {/* Main Introduction */}
          <div className="mb-12">
            <h1 className="text-display mb-6">
              Hi, I'm Erick Karki
            </h1>
            <p className="text-body mb-8 text-lg">
              A full-stack software engineer who builds scalable web applications and cloud infrastructure. 
              Currently pursuing Computer Engineering at Pokhara University while working on projects involving 
              React, Node.js, AWS, and AI/ML technologies.
            </p>
          </div>

          {/* Code Block - Simplified */}
          <div className="terminal-window mb-12">
            <div className="terminal-header">
              <div className="flex items-center gap-2">
                <div className="terminal-dot red"></div>
                <div className="terminal-dot yellow"></div>
                <div className="terminal-dot green"></div>
              </div>
              <div className="text-xs text-mono" style={{ color: 'var(--text-secondary)' }}>
                developer.js
              </div>
            </div>
            <div className="terminal-content">
              <div className="space-y-2 text-mono text-sm">
                <div>
                  <span className="syntax-keyword">const</span> <span className="syntax-function">developer</span> = &#123;
                </div>
                <div className="ml-4">
                  name: <span className="syntax-string">"Erick Karki"</span>,
                </div>
                <div className="ml-4">
                  role: <span className="syntax-string">"Full-Stack Developer"</span>,
                </div>
                <div className="ml-4">
                  location: <span className="syntax-string">"Kathmandu, Nepal"</span>,
                </div>
                <div className="ml-4">
                  available: <span className="syntax-keyword">true</span>,
                </div>
                <div className="ml-4">
                  skills: [<span className="syntax-string">"React"</span>, <span className="syntax-string">"Node.js"</span>, <span className="syntax-string">"AWS"</span>, <span className="syntax-string">"Python"</span>]
                </div>
                <div>&#125;;</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={() => scrollToSection('#projects')}
              className="btn-primary flex items-center gap-2 justify-center"
            >
              <Play className="w-4 h-4" />
              View My Work
            </button>
            
            <button
              onClick={() => scrollToSection('#about')}
              className="btn-secondary flex items-center gap-2 justify-center"
            >
              <Code className="w-4 h-4" />
              About Me
            </button>

            <button
              onClick={() => scrollToSection('#contact')}
              className="btn-secondary flex items-center gap-2 justify-center"
            >
              <Mail className="w-4 h-4" />
              Get In Touch
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <span className="text-sm text-mono" style={{ color: 'var(--text-secondary)' }}>Connect:</span>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/erickkarki/"
                target="_blank"
                rel="noopener noreferrer"
                className="link hover:opacity-80 transition-opacity flex items-center gap-2"
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="link hover:opacity-80 transition-opacity flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="mailto:contact.erickkarki@gmail.com"
                className="link hover:opacity-80 transition-opacity flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm">Email</span>
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="w-6 h-6" style={{ color: 'var(--text-secondary)' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;