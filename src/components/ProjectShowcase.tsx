'use client';

import { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Database, Zap, Users, TrendingUp, Award } from 'lucide-react';

interface ProjectMetric {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TechStack {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'cloud' | 'tool';
  proficiency: number;
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  techStack: TechStack[];
  metrics: ProjectMetric[];
  features: string[];
  challenges: string[];
  solutions: string[];
  github?: string;
  demo?: string;
  architecture: string;
  impact: string;
}

const ProjectShowcase: React.FC = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'metrics'>('overview');

  const projects: Project[] = [
    {
      id: 'traffic-monitor',
      title: 'AI Traffic Violation Monitor',
      subtitle: 'Computer Vision & Real-time Processing',
      description: 'AI system using YOLOv8 for real-time traffic monitoring with 94% accuracy',
      longDescription: 'Enterprise-grade traffic monitoring system combining computer vision, machine learning, and real-time data processing. Processes live video feeds, detects violations, and generates automated reports.',
      techStack: [
        { name: 'Python', category: 'backend', proficiency: 95 },
        { name: 'YOLOv8', category: 'tool', proficiency: 90 },
        { name: 'OpenCV', category: 'tool', proficiency: 88 },
        { name: 'FastAPI', category: 'backend', proficiency: 92 },
        { name: 'PostgreSQL', category: 'database', proficiency: 85 },
        { name: 'Redis', category: 'database', proficiency: 80 },
        { name: 'Docker', category: 'cloud', proficiency: 87 },
        { name: 'React.js', category: 'frontend', proficiency: 90 }
      ],
      metrics: [
        { label: 'Detection Accuracy', value: '94.2%', icon: Award },
        { label: 'Processing Speed', value: '30 FPS', icon: Zap },
        { label: 'Violations Detected', value: '10K+', icon: TrendingUp },
        { label: 'System Uptime', value: '99.7%', icon: Users }
      ],
      features: [
        'Real-time vehicle detection and classification',
        'Speed violation detection with accuracy tracking',
        'Automatic license plate recognition (ALPR)',
        'Multi-camera feed processing',
        'Violation report generation',
        'Dashboard for traffic officials'
      ],
      challenges: [
        'Processing multiple HD video streams in real-time',
        'Maintaining accuracy in varying weather conditions',
        'Handling edge cases (motorcycles, trucks, etc.)',
        'Optimizing inference speed without sacrificing accuracy'
      ],
      solutions: [
        'Implemented multi-threading with GPU acceleration',
        'Created weather-adaptive detection models',
        'Trained custom models on diverse vehicle datasets',
        'Used model quantization and TensorRT optimization'
      ],
      github: '#',
      demo: '#',
      architecture: 'Microservices architecture with event-driven processing, Redis for caching, and PostgreSQL for data persistence. Deployed on AWS with auto-scaling groups.',
      impact: 'Reduced manual monitoring by 80% and improved violation detection rates by 300%'
    },
    {
      id: 'retrorevive',
      title: 'RetroRevive Marketplace',
      subtitle: 'Sustainable E-commerce Platform',
      description: 'Full-stack marketplace promoting sustainable fashion with 500+ active users',
      longDescription: 'Comprehensive e-commerce platform focused on sustainable fashion. Features intelligent search, image recognition for clothing categorization, secure payment processing, and social features.',
      techStack: [
        { name: 'React.js', category: 'frontend', proficiency: 92 },
        { name: 'Node.js', category: 'backend', proficiency: 90 },
        { name: 'Express.js', category: 'backend', proficiency: 88 },
        { name: 'MongoDB', category: 'database', proficiency: 85 },
        { name: 'Stripe API', category: 'tool', proficiency: 82 },
        { name: 'Cloudinary', category: 'cloud', proficiency: 80 }
      ],
      metrics: [
        { label: 'Active Users', value: '500+', icon: Users },
        { label: 'Transactions', value: '$25K+', icon: TrendingUp },
        { label: 'Items Listed', value: '2,500+', icon: Database },
        { label: 'User Satisfaction', value: '4.8/5', icon: Award }
      ],
      features: [
        'User registration and authentication',
        'Product listing with image upload',
        'Advanced search and filtering',
        'Secure payment processing',
        'User reviews and ratings',
        'Real-time messaging between users'
      ],
      challenges: [
        'Building scalable search functionality',
        'Implementing secure payment processing',
        'Managing user-generated content',
        'Optimizing image storage and delivery'
      ],
      solutions: [
        'Used Elasticsearch for advanced search capabilities',
        'Integrated Stripe for PCI-compliant payments',
        'Implemented content moderation workflows',
        'Used Cloudinary for optimized image handling'
      ],
      github: '#',
      demo: '#',
      architecture: 'MERN stack with RESTful API design, JWT authentication, and cloud storage integration. Deployed using Docker containers.',
      impact: 'Facilitated sustainable fashion choices for 500+ users, preventing textile waste'
    },
    {
      id: 'url-shortener',
      title: 'Enterprise URL Shortener',
      subtitle: 'High-Performance Microservice',
      description: 'Scalable URL shortening service with analytics, handling 10K+ URLs with sub-100ms response times',
      longDescription: 'High-performance URL shortening service following clean architecture principles. Features custom domains, detailed analytics, rate limiting, and enterprise-grade security.',
      techStack: [
        { name: 'Java', category: 'backend', proficiency: 90 },
        { name: 'Spring Boot', category: 'backend', proficiency: 88 },
        { name: 'Redis', category: 'database', proficiency: 85 },
        { name: 'PostgreSQL', category: 'database', proficiency: 87 },
        { name: 'Docker', category: 'cloud', proficiency: 82 }
      ],
      metrics: [
        { label: 'URLs Processed', value: '10K+', icon: Database },
        { label: 'Response Time', value: '<100ms', icon: Zap },
        { label: 'Uptime', value: '99.9%', icon: TrendingUp },
        { label: 'Daily Requests', value: '50K+', icon: Users }
      ],
      features: [
        'Custom short URL generation',
        'Click analytics and tracking',
        'Custom domain support',
        'Rate limiting and spam protection',
        'Bulk URL shortening API',
        'QR code generation'
      ],
      challenges: [
        'Designing collision-resistant ID generation',
        'Implementing efficient caching strategy',
        'Building horizontally scalable architecture',
        'Ensuring data consistency across replicas'
      ],
      solutions: [
        'Used Base62 encoding with counter-based IDs',
        'Implemented multi-level caching with Redis',
        'Designed stateless services with load balancing',
        'Used PostgreSQL with read replicas'
      ],
      github: '#',
      architecture: 'Clean architecture with CQRS pattern, Redis for caching, PostgreSQL for persistence, and comprehensive monitoring.',
      impact: 'Processes 50K+ requests daily with 99.9% uptime, serving multiple enterprise clients'
    }
  ];

  const project = projects[activeProject];

  const getTechColor = (category: TechStack['category']): string => {
    const colors = {
      frontend: 'bg-blue-600',
      backend: 'bg-green-600',
      database: 'bg-purple-600',
      cloud: 'bg-orange-600',
      tool: 'bg-gray-600'
    };
    return colors[category];
  };

  return (
    <div className="space-y-8">
      {/* Project Navigation */}
      <div className="flex flex-wrap gap-4 justify-center">
        {projects.map((proj, index) => (
          <button
            key={proj.id}
            onClick={() => {
              setActiveProject(index);
              setActiveTab('overview');
            }}
            className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
              activeProject === index
                ? 'bg-accent text-primary'
                : 'card-minimal hover:bg-tertiary'
            }`}
          >
            <div className="text-left">
              <div className="font-semibold text-sm">{proj.title}</div>
              <div className="text-xs text-secondary">{proj.subtitle}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Project Details */}
      <div className="card">
        {/* Header */}
        <div className="border-b border-primary pb-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-subtitle mb-3">{project.title}</h3>
              <p className="text-accent font-medium mb-4">{project.subtitle}</p>
              <p className="text-body">{project.longDescription}</p>
            </div>
            
            <div className="flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <ExternalLink className="w-4 h-4" />
                  Demo
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-primary mb-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'architecture', label: 'Architecture' },
            { id: 'metrics', label: 'Metrics' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'overview' | 'architecture' | 'metrics')}
              className={`px-6 py-3 font-medium transition-colors text-sm ${
                activeTab === tab.id
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Tech Stack */}
              <div>
                <h4 className="text-subtitle text-lg mb-6">Technology Stack</h4>
                <div className="space-y-4">
                  {project.techStack.map((tech) => (
                    <div key={tech.name} className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${getTechColor(tech.category)}`} />
                      <span className="text-primary flex-1">{tech.name}</span>
                      <div className="flex-1 bg-tertiary rounded-full h-2">
                        <div
                          className={`h-full rounded-full ${getTechColor(tech.category)} transition-all duration-1000`}
                          style={{ width: `${tech.proficiency}%` }}
                        />
                      </div>
                      <span className="text-secondary text-sm w-12 text-right">
                        {tech.proficiency}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features & Challenges */}
              <div className="space-y-8">
                <div>
                  <h4 className="text-subtitle text-lg mb-4">Key Features</h4>
                  <div className="space-y-2">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                        <span className="text-body text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-subtitle text-lg mb-4">Technical Challenges</h4>
                  <div className="space-y-4">
                    {project.challenges.map((challenge, index) => (
                      <div key={index} className="card-minimal">
                        <div className="text-body text-sm mb-2">{challenge}</div>
                        <div className="text-accent text-sm">
                          <strong>Solution:</strong> {project.solutions[index]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-subtitle text-lg mb-4">System Architecture</h4>
                <div className="card-minimal">
                  <p className="text-body">{project.architecture}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-subtitle text-lg mb-4">Impact & Results</h4>
                <div className="card-minimal">
                  <p className="text-body">{project.impact}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div>
              <h4 className="text-subtitle text-lg mb-6">Performance Metrics</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.metrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div key={metric.label} className="card text-center">
                      <Icon className="w-6 h-6 text-accent mx-auto mb-3" />
                      <div className="text-xl font-bold text-primary mb-1">
                        {metric.value}
                      </div>
                      <div className="text-sm text-secondary">{metric.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;