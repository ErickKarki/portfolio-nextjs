'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/erickkarki/',
      icon: Linkedin,
      color: 'hover:text-blue-600',
    },
    {
      name: 'GitHub',
      href: '#',
      icon: Github,
      color: 'hover:text-gray-900 dark:hover:text-gray-100',
    },
    {
      name: 'Email',
      href: 'mailto:contact.erickkarki@gmail.com',
      icon: Mail,
      color: 'hover:text-red-600',
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: 'contact.erickkarki@gmail.com',
      href: 'mailto:contact.erickkarki@gmail.com',
    },
    {
      icon: Phone,
      text: '+977 9803311109',
      href: 'tel:+9779803311109',
    },
    {
      icon: MapPin,
      text: 'Kathmandu, Nepal',
      href: '#',
    },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto container-padding">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">EK</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Erick Karki</h3>
                    <p className="text-gray-400">Full-Stack Software Engineer</p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed max-w-md">
                  Passionate about building innovative solutions with modern technologies. 
                  Specializing in cloud infrastructure, full-stack development, and AI-powered applications.
                </p>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex space-x-4"
              >
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 bg-gray-800 rounded-full transition-all duration-300 ${link.color} hover:bg-gray-700`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="sr-only">{link.name}</span>
                    </motion.a>
                  );
                })}
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Contact Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-6">Get In Touch</h4>
                <ul className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <li key={index}>
                        <a
                          href={info.href}
                          className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                        >
                          <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                          <span className="text-sm">{info.text}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Erick Karki. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Built with Next.js, TypeScript & Tailwind CSS</span>
              <span className="hidden sm:block">•</span>
              <span className="hidden sm:block">Made with ❤️ in Nepal</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;