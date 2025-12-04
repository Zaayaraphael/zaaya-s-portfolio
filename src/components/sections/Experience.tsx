import React from 'react';
import { motion } from 'framer-motion';
import { Code, Cloud, Users } from 'lucide-react';
import type { ExperienceData } from '../../types/portfolio';

interface ExperienceProps {
  experience: ExperienceData;
}

// Icon mapping for service icons
const iconMap = {
  code: Code,
  cloud: Cloud,
  users: Users,
} as const;

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Years of Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-manrope font-bold text-primary mb-4">
            {experience.yearsOfExperience}+
          </h2>
          <p className="text-xl md:text-2xl font-inter text-muted-foreground">
            Years of Experience
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experience.services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Code;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30"
              >
                {/* Icon */}
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <IconComponent 
                      size={24} 
                      className="text-primary group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-manrope font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="font-inter text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;