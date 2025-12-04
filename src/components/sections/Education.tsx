import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, GraduationCap, BookOpen } from 'lucide-react';
import type { EducationItem } from '../../types/portfolio';

interface EducationProps {
  education: EducationItem[];
}

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificateUrl: string;
  title: string;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ 
  isOpen, 
  onClose, 
  certificateUrl, 
  title 
}) => {
  // Handle keyboard events
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-background border border-border rounded-lg w-full max-w-6xl max-h-[95vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border bg-background/95 backdrop-blur-sm">
            <h3 className="text-base sm:text-lg font-inter font-semibold text-foreground truncate pr-4">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 hover:bg-muted rounded-lg transition-colors touch-target"
              aria-label="Close certificate modal"
            >
              <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </button>
          </div>
          
          {/* Certificate Image Container */}
          <div className="relative overflow-auto max-h-[calc(95vh-80px)]">
            <div className="p-3 sm:p-6 flex items-center justify-center min-h-[300px]">
              <img
                src={certificateUrl}
                alt={`Certificate for ${title}`}
                className="w-full h-auto max-w-full object-contain rounded-lg shadow-lg"
                style={{ maxHeight: 'calc(95vh - 120px)' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  // Fallback to a placeholder if image fails to load
                  target.src = `data:image/svg+xml;base64,${btoa(`
                    <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100%" height="100%" fill="#f3f4f6"/>
                      <rect x="50" y="50" width="700" height="500" fill="none" stroke="#82aaff" stroke-width="4"/>
                      <text x="400" y="280" font-family="Arial" font-size="24" fill="#82aaff" text-anchor="middle">Certificate</text>
                      <text x="400" y="320" font-family="Arial" font-size="18" fill="#666" text-anchor="middle">${title}</text>
                    </svg>
                  `)}`;
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'degree':
      return <GraduationCap className="w-6 h-6 text-primary" />;
    case 'certification':
      return <Award className="w-6 h-6 text-primary" />;
    case 'course':
      return <BookOpen className="w-6 h-6 text-primary" />;
    default:
      return <BookOpen className="w-6 h-6 text-primary" />;
  }
};

const getCategoryTitle = (category: string) => {
  switch (category) {
    case 'degree':
      return 'Degrees';
    case 'certification':
      return 'Certifications';
    case 'course':
      return 'Courses';
    default:
      return 'Education';
  }
};

export const Education: React.FC<EducationProps> = ({ education }) => {
  const [selectedCertificate, setSelectedCertificate] = useState<{
    url: string;
    title: string;
  } | null>(null);

  // Group education items by category
  const groupedEducation = education.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, EducationItem[]>);

  const categoryOrder = ['degree', 'certification', 'course'];
  const sortedCategories = categoryOrder.filter(category => groupedEducation[category]);

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
            <span className="text-primary">03.</span> Relevant Education
          </h2>
        </motion.div>

        {/* Education Categories */}
        <div className="space-y-12">
          {sortedCategories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                {getCategoryIcon(category)}
                <h3 className="text-xl md:text-2xl font-manrope font-semibold text-foreground">
                  {getCategoryTitle(category)}
                </h3>
              </div>

              {/* Education Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groupedEducation[category].map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-muted/20 border border-border rounded-lg p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Education Item Header */}
                    <div className="mb-4">
                      <h4 className="text-lg font-inter font-semibold text-foreground mb-2">
                        {item.title}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <p className="text-sm font-inter text-primary font-medium">
                          {item.institution}
                        </p>
                        <p className="text-sm font-inter text-muted-foreground">
                          {item.dates}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    {item.description && (
                      <p className="text-sm font-inter text-muted-foreground leading-relaxed mb-4">
                        {item.description}
                      </p>
                    )}

                    {/* Certificate Image - Available for all items */}
                    <div className="mt-4">
                      <button
                        onClick={() => setSelectedCertificate({
                          url: item.certificateUrl || `data:image/svg+xml;base64,${btoa(`
                            <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                              <rect width="100%" height="100%" fill="#f3f4f6"/>
                              <rect x="50" y="50" width="700" height="500" fill="none" stroke="#82aaff" stroke-width="4"/>
                              <text x="400" y="280" font-family="Arial" font-size="24" fill="#82aaff" text-anchor="middle">Certificate</text>
                              <text x="400" y="320" font-family="Arial" font-size="18" fill="#666" text-anchor="middle">${item.title}</text>
                            </svg>
                          `)}`,
                          title: item.title
                        })}
                        className="group relative block w-full"
                        aria-label={`View certificate for ${item.title}`}
                      >
                        <div className="relative overflow-hidden rounded-lg border border-border">
                          <img
                            src={item.certificateUrl || `data:image/svg+xml;base64,${btoa(`
                              <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                                <rect width="100%" height="100%" fill="#f3f4f6"/>
                                <rect x="20" y="20" width="360" height="260" fill="none" stroke="#82aaff" stroke-width="2"/>
                                <text x="200" y="140" font-family="Arial" font-size="16" fill="#82aaff" text-anchor="middle">Certificate</text>
                                <text x="200" y="160" font-family="Arial" font-size="12" fill="#666" text-anchor="middle">${item.title}</text>
                              </svg>
                            `)}`}
                            alt={`Certificate for ${item.title}`}
                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-inter">
                              View Certificate
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={selectedCertificate !== null}
        onClose={() => setSelectedCertificate(null)}
        certificateUrl={selectedCertificate?.url || ''}
        title={selectedCertificate?.title || ''}
      />
    </section>
  );
};

export default Education;