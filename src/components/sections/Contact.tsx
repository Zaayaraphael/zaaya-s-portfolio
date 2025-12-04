import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import type { ContactInfo } from '../../types/portfolio';

interface ContactProps {
  contact: ContactInfo;
}

export const Contact: React.FC<ContactProps> = ({ contact }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Numbered Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-manrope font-bold text-primary mb-4">
            04. What's Next?
          </h2>
        </motion.div>

        {/* Get In Touch Heading */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-manrope font-bold text-foreground mb-8"
        >
          Get In Touch
        </motion.h3>

        {/* Descriptive Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-base md:text-lg font-inter text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto"
        >
          {contact.description}
        </motion.p>

        {/* Email Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.a
            href={`mailto:${contact.email}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg text-lg font-inter font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Mail className="w-5 h-5" />
            Send me an email
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;