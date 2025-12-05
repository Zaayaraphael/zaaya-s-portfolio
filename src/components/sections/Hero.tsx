import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import type { PersonalInfo } from '../../types/portfolio';

interface HeroProps {
  personal: PersonalInfo;
}

export const Hero = ({ personal }: HeroProps) => {
  const handleDownloadCV = () => {
    if (personal.cvUrl) {
      // If it's a file path, trigger download
      if (personal.cvUrl.startsWith('/') || personal.cvUrl.startsWith('./')) {
        const link = document.createElement('a');
        link.href = personal.cvUrl;
        link.download = `${personal.name.replace(/\s+/g, '-')}-CV.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // If it's a URL, open in new tab
        window.open(personal.cvUrl, '_blank');
      }
    } else {
      // Fallback to mailto
      window.location.href = `mailto:${personal.name.toLowerCase().replace(/\s+/g, '.')}@example.com`;
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 md:py-24">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-manrope font-bold text-foreground mb-4"
            >
              {personal.name}
            </motion.h1>

            {/* Title/Role */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl lg:text-3xl font-inter font-medium text-primary mb-6"
            >
              {personal.title}
            </motion.h2>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base md:text-lg font-inter text-muted-foreground leading-relaxed mb-8 max-w-2xl"
            >
              {personal.bio}
            </motion.p>

            {/* Download CV Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadCV}
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-inter font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Download size={20} />
              Download My CV
            </motion.button>
          </motion.div>

          {/* Professional Photo - Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative border/background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl transform rotate-3"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-secondary/20 to-primary/20 rounded-2xl transform -rotate-2"></div>
              
              {/* Photo container */}
              <div className="relative bg-background border-2 border-primary/30 rounded-2xl p-2 shadow-2xl">
                <img
                  src={personal.photo}
                  alt={`${personal.name} - Professional Photo`}
                  className="w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[28rem] object-cover rounded-xl"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(personal.name)}&size=400&background=82aaff&color=ffffff&format=svg`;
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