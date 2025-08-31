'use client';

import { ExternalLink, Github, Folder, Play, Code } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 'traffic-monitor',
      title: 'Automated Traffic Violation Monitoring',
      description: 'AI-powered system using YOLO algorithm to detect overspeeding and vehicle number plates with real-time notifications for traffic personnel.',
      tech: ['Python', 'YOLOv8', 'DeepSORT', 'EasyOCR', 'FastAPI', 'PostgreSQL', 'React.js'],
      github: '#',
      demo: '#',
      status: 'Completed'
    },
    {
      id: 'retrorevive',
      title: 'RetroRevive - Thrift Store',
      description: 'Sustainable fashion platform enabling buying and selling of pre-owned clothes with advanced search and filtering capabilities.',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
      github: '#',
      status: 'Completed'
    },
    {
      id: 'url-shortener',
      title: 'URL Shortener API',
      description: 'RESTful service built with Spring Boot for URL shortening, demonstrating clean architecture with proper layered design.',
      tech: ['Java', 'Spring Boot', 'Spring Data JPA', 'H2 Database', 'Maven'],
      github: '#',
      status: 'Completed'
    }
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-title">My Projects</h2>
          <p className="text-body">
            Here are some projects I've built to solve real-world problems
          </p>
        </div>

        {/* Projects Overview */}
        <div className="terminal-window mb-12">
          <div className="terminal-header">
            <div className="flex items-center gap-2">
              <div className="terminal-dot red"></div>
              <div className="terminal-dot yellow"></div>
              <div className="terminal-dot green"></div>
            </div>
            <div className="text-xs text-mono" style={{ color: 'var(--text-secondary)' }}>
              projects_overview.json
            </div>
          </div>
          <div className="terminal-content">
            <div className="text-mono text-sm space-y-2">
              <div>&#123;</div>
              <div className="ml-4">
                <span className="syntax-string">"total_projects"</span>: <span className="syntax-number">3</span>,
              </div>
              <div className="ml-4">
                <span className="syntax-string">"status"</span>: <span className="syntax-string">"all_completed"</span>,
              </div>
              <div className="ml-4">
                <span className="syntax-string">"technologies"</span>: [<span className="syntax-string">"Python"</span>, <span className="syntax-string">"React"</span>, <span className="syntax-string">"Java"</span>, <span className="syntax-string">"AI/ML"</span>]
              </div>
              <div>&#125;</div>
            </div>
          </div>
        </div>

        {/* Project Cards */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div key={project.id} className="terminal-window">
              <div className="terminal-header">
                <div className="flex items-center gap-2">
                  <div className="terminal-dot red"></div>
                  <div className="terminal-dot yellow"></div>
                  <div className="terminal-dot green"></div>
                </div>
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: project.tech.includes('Python') ? '#3776ab' : project.tech.includes('React') ? '#61dafb' : '#f89820' }}
                    ></div>
                    <div className="text-xs text-mono" style={{ color: 'var(--text-secondary)' }}>
                      {project.tech.includes('Python') ? 'project.py' : 
                       project.tech.includes('React') ? 'project.jsx' : 
                       project.tech.includes('Java') ? 'project.java' : 'project.md'}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--text-success)' }}></div>
                    <span>main</span>
                  </div>
                </div>
              </div>
              <div className="terminal-content">
                <div className="mb-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <h3 className="text-xl font-semibold mb-2 lg:mb-0" style={{ color: 'var(--text-primary)' }}>
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-mono px-2 py-1 rounded" 
                            style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-success)' }}>
                        ✓ {project.status}
                      </span>
                      <div className="flex gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link hover:opacity-80 transition-opacity"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link hover:opacity-80 transition-opacity"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-body mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More Projects CTA */}
        <div className="text-center mt-12">
          <div className="terminal-window inline-block">
            <div className="terminal-header">
              <div className="flex items-center gap-2">
                <div className="terminal-dot red"></div>
                <div className="terminal-dot yellow"></div>
                <div className="terminal-dot green"></div>
              </div>
              <div className="text-xs text-mono" style={{ color: 'var(--text-secondary)' }}>
                explore_more.sh
              </div>
            </div>
            <div className="terminal-content">
              <div className="text-center">
                <p className="text-body mb-4">
                  Want to see more of my work?
                </p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2 justify-center"
                >
                  <Github className="w-4 h-4" />
                  View GitHub Profile
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;