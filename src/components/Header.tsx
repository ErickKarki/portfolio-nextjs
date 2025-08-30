'use client';

import { useState, useEffect } from 'react';
import { Terminal, Folder, FileText, Mail, ExternalLink } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navItems = [
    { name: './about', href: '#about', icon: Folder },
    { name: './projects', href: '#projects', icon: Folder },
    { name: './experience', href: '#experience', icon: FileText },
    { name: './contact', href: '#contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'experience', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      setActiveSection(currentSection || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 terminal-window border-b">
      <div className="container">
        <div className="flex items-center justify-between h-12">
          {/* Terminal Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-mono font-medium transition-colors hover:opacity-80"
            style={{ color: 'var(--text-primary)' }}
          >
            <Terminal className="w-4 h-4" style={{ color: 'var(--text-success)' }} />
            <span>erick@portfolio:~$</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`nav-link flex items-center gap-1 ${
                    activeSection === item.href.substring(1) ? 'active' : ''
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Resume Link */}
          <div className="hidden md:block">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs"
            >
              <FileText className="w-3 h-3" />
              resume.pdf
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 transition-colors hover:opacity-80"
            style={{ color: 'var(--text-primary)' }}
          >
            <Terminal className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t" style={{ borderColor: 'var(--border)' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`nav-link flex items-center gap-2 w-full text-left py-2 px-3 ${
                    activeSection === item.href.substring(1) ? 'active' : ''
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {item.name}
                </button>
              );
            })}
            <div className="pt-3 mt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full justify-center text-xs"
              >
                <FileText className="w-3 h-3" />
                resume.pdf
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;