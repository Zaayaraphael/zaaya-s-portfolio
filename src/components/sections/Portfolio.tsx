import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../../types/portfolio';

interface PortfolioProps {
  projects: Project[];
}

export const Portfolio: React.FC<PortfolioProps> = ({ projects }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-manrope font-bold text-foreground">
            <span className="text-primary">02.</span> Featured Work
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-16 lg:space-y-24">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  isEven ? '' : 'lg:grid-flow-col-dense'
                }`}
              >
                {/* Project Image */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className={`relative group ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  {/* Featured Project Label */}
                  {project.featured && (
                    <div className="absolute -top-4 left-4 z-10">
                      <span className="bg-primary text-primary-foreground text-xs font-inter font-medium px-3 py-1 rounded-full shadow-lg">
                        FEATURED PROJECT
                      </span>
                    </div>
                  )}
                  
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-xl bg-card border border-border shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <img
                      src={project.screenshot}
                      alt={`${project.name} screenshot`}
                      className="w-full h-64 md:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/800x600/82aaff/ffffff?text=${encodeURIComponent(project.name)}`;
                      }}
                    />
                    
                    {/* Overlay with links */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 transition-colors duration-200 shadow-lg"
                          aria-label={`View ${project.name} live site`}
                        >
                          <ExternalLink size={20} />
                        </motion.a>
                      )}
                      
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-card text-foreground p-3 rounded-full hover:bg-muted transition-colors duration-200 shadow-lg"
                          aria-label={`View ${project.name} source code`}
                        >
                          <Github size={20} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Project Details */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={`${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-6`}
                >
                  {/* Project Name */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-manrope font-bold text-foreground">
                    {project.name}
                  </h3>

                  {/* Project Description */}
                  <p className="text-base md:text-lg font-inter text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: techIndex * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-primary/10 text-primary border border-primary/20 rounded-lg px-3 py-1 text-sm font-inter font-medium hover:bg-primary/20 transition-all duration-200"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* External Links (Desktop) */}
                  <div className="flex gap-4 pt-2">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-inter font-medium transition-colors duration-200"
                      >
                        <ExternalLink size={16} />
                        Live Site
                      </motion.a>
                    )}
                    
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-inter font-medium transition-colors duration-200"
                      >
                        <Github size={16} />
                        Source Code
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;