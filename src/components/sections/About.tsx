import React from 'react';
import { motion } from 'framer-motion';
import type { AboutData } from '../../types/portfolio';

interface AboutProps {
  about: AboutData;
}

export const About: React.FC<AboutProps> = ({ about }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Numbered Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-manrope font-bold text-foreground">
            <span className="text-primary">01.</span> About me
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Text Content - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            {/* Biography */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-base md:text-lg font-inter text-muted-foreground leading-relaxed mb-8"
            >
              {about.bio}
            </motion.p>

            {/* Technologies Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-inter font-semibold text-foreground mb-4">
                Technologies I work with:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {about.technologies.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-card border border-border rounded-lg px-3 py-2 text-sm font-inter text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-default"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Professional Photo - Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative border/background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl transform rotate-2"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-secondary/20 to-primary/20 rounded-2xl transform -rotate-1"></div>
              
              {/* Photo container */}
              <div className="relative bg-background border-2 border-primary/30 rounded-2xl p-2 shadow-xl">
                <img
                  src={about.photo}
                  alt="Professional photo"
                  className="w-64 h-80 md:w-72 md:h-96 lg:w-80 lg:h-[24rem] object-cover rounded-xl"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=About&size=400&background=82aaff&color=ffffff&format=svg`;
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;