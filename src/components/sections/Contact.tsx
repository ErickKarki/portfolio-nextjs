'use client';

import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageSquare } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact.erickkarki@gmail.com',
      href: 'mailto:contact.erickkarki@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+977 9803311109',
      href: 'tel:+9779803311109'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kathmandu, Nepal',
      href: '#'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-title">Get In Touch</h2>
          <p className="text-body">
            Let's discuss your project or just say hello!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-subtitle flex items-center gap-3 mb-8">
                <MessageSquare className="w-6 h-6" style={{ color: 'var(--text-success)' }} />
                Let's Connect
              </h3>
              <p className="text-body mb-8">
                I'm always open to discussing new opportunities, interesting projects, 
                or just having a chat about technology. Feel free to reach out!
              </p>
            </div>

            {/* Contact Methods */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="flex items-center gap-2">
                  <div className="terminal-dot red"></div>
                  <div className="terminal-dot yellow"></div>
                  <div className="terminal-dot green"></div>
                </div>
                <div className="text-xs text-mono" style={{ color: 'var(--text-secondary)' }}>
                  contact_info.json
                </div>
              </div>
              <div className="terminal-content">
                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <a
                        key={info.label}
                        href={info.href}
                        className="flex items-center gap-4 p-4 rounded-lg transition-colors hover:bg-gray-800/50"
                      >
                        <Icon className="w-5 h-5" style={{ color: 'var(--text-accent)' }} />
                        <div>
                          <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                            {info.label}
                          </div>
                          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            {info.value}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="flex items-center gap-2">
                  <div className="terminal-dot red"></div>
                  <div className="terminal-dot yellow"></div>
                  <div className="terminal-dot green"></div>
                </div>
                <div className="text-xs text-mono" style={{ color: 'var(--text-secondary)' }}>
                  social_links.json
                </div>
              </div>
              <div className="terminal-content">
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.linkedin.com/in/erickkarki/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link hover:opacity-80 transition-opacity flex items-center gap-2 p-3 rounded-lg hover:bg-gray-800/50"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link hover:opacity-80 transition-opacity flex items-center gap-2 p-3 rounded-lg hover:bg-gray-800/50"
                  >
                    <Github className="w-5 h-5" />
                    <span className="text-sm">GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="flex items-center gap-2">
                  <div className="terminal-dot red"></div>
                  <div className="terminal-dot yellow"></div>
                  <div className="terminal-dot green"></div>
                </div>
                <div className="text-xs text-mono" style={{ color: 'var(--text-secondary)' }}>
                  availability_status.sh
                </div>
              </div>
              <div className="terminal-content">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span style={{ color: 'var(--text-success)' }}>Available for new opportunities</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="flex items-center gap-2">
                <div className="terminal-dot red"></div>
                <div className="terminal-dot yellow"></div>
                <div className="terminal-dot green"></div>
              </div>
              <div className="text-xs text-mono" style={{ color: 'var(--text-secondary)' }}>
                send_message.form
              </div>
            </div>
            <div className="terminal-content">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 transition-colors text-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 transition-colors text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 transition-colors text-white"
                    placeholder="Project discussion"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 transition-colors resize-none text-white"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-900/30 border border-green-700 rounded-lg">
                    <p style={{ color: 'var(--text-success)' }}>
                      ✓ Message sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg">
                    <p style={{ color: 'var(--text-error)' }}>
                      ✗ Something went wrong. Please try again or email me directly.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;