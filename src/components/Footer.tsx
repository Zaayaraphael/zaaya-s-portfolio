import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import type { SocialLink } from '../types/portfolio';

interface FooterProps {
  social: SocialLink[];
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
};

export const Footer: React.FC<FooterProps> = ({ social }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-4xl mx-auto">
        {/* Social Media Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center items-center gap-6 mb-8"
        >
          {social.map((link, index) => {
            const IconComponent = iconMap[link.icon as keyof typeof iconMap];
            
            if (!IconComponent) return null;

            return (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.1,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                viewport={{ once: true }}
                className="p-3 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label={`Visit ${link.platform} profile`}
              >
                <IconComponent className="w-5 h-5" />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Copyright Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-inter text-muted-foreground">
            © {currentYear} Raphael Zaaya. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;