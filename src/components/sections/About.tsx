'use client';

import { FileCode, Database, Cloud, Code, User, Briefcase } from 'lucide-react';

const About = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: Code,
      skills: ['JavaScript', 'TypeScript', 'React.js', 'Redux', 'HTML/CSS', 'Tailwind']
    },
    {
      title: 'Backend',
      icon: FileCode,
      skills: ['Node.js', 'Express.js', 'Java Spring Boot', 'Python', 'REST APIs']
    },
    {
      title: 'Cloud & DevOps',
      icon: Cloud,
      skills: ['AWS (EC2, S3, CloudWatch)', 'GCP', 'Docker', 'CI/CD']
    },
    {
      title: 'Database',
      icon: Database,
      skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle']
    }
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-title">About Me</h2>
          <p className="text-body">
            Learn more about my background, skills, and experience
          </p>
        </div>

        {/* Background */}
        <div className="mb-16">
          <h3 className="text-subtitle flex items-center gap-3 mb-6">
            <User className="w-6 h-6" style={{ color: 'var(--text-success)' }} />
            Background
          </h3>
          <div className="text-body space-y-4">
            <p>
              I'm currently a Computer Engineering student at Pokhara University with hands-on 
              experience in full-stack development and cloud infrastructure. My recent internship 
              at Speedhome involved migrating legacy Python Flask applications to Java Spring Boot.
            </p>
            <p>
              I enjoy building scalable applications and solving complex technical challenges. 
              My projects range from AI-powered traffic monitoring systems to sustainable e-commerce platforms.
            </p>
          </div>
        </div>

        {/* Skills with Terminal Touch */}
        <div className="mb-16">
          <h3 className="text-subtitle flex items-center gap-3 mb-8">
            <Code className="w-6 h-6" style={{ color: 'var(--text-success)' }} />
            Technical Skills
          </h3>
          
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="flex items-center gap-2">
                <div className="terminal-dot red"></div>
                <div className="terminal-dot yellow"></div>
                <div className="terminal-dot green"></div>
              </div>
              <div className="text-xs text-mono" style={{ color: 'var(--text-secondary)' }}>
                skills.json
              </div>
            </div>
            <div className="terminal-content">
              <div className="grid md:grid-cols-2 gap-8">
                {skillCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div key={category.title}>
                      <div className="flex items-center gap-2 mb-4">
                        <Icon className="w-4 h-4" style={{ color: 'var(--text-warning)' }} />
                        <h4 className="text-base font-medium" style={{ color: 'var(--text-accent)' }}>
                          {category.title}
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <span
                            key={skill}
                            className="tech-tag"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div>
          <h3 className="text-subtitle flex items-center gap-3 mb-8">
            <Briefcase className="w-6 h-6" style={{ color: 'var(--text-success)' }} />
            Experience
          </h3>
          
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="flex items-center gap-2">
                <div className="terminal-dot red"></div>
                <div className="terminal-dot yellow"></div>
                <div className="terminal-dot green"></div>
              </div>
              <div className="text-xs text-mono" style={{ color: 'var(--text-secondary)' }}>
                experience.md
              </div>
            </div>
            <div className="terminal-content">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Software Engineering Intern
                    </h4>
                    <p className="text-base" style={{ color: 'var(--text-accent)' }}>Speedhome</p>
                  </div>
                  <span className="text-sm text-mono" style={{ color: 'var(--text-secondary)' }}>
                    June - August 2025
                  </span>
                </div>
                
                <div className="text-body">
                  <p className="mb-4">
                    Migrated legacy Python Flask applications to Java Spring Boot, modernizing backend 
                    architecture and implementing CI/CD pipelines. Collaborated remotely with senior 
                    developers to ensure seamless system integration.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {['Java', 'Spring Boot', 'Python Flask', 'CI/CD', 'Git'].map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;