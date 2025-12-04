import React from 'react';
import type { Company } from '../../types/portfolio';

interface CompaniesProps {
  companies: Company[];
}

export const Companies: React.FC<CompaniesProps> = ({ companies }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 font-manrope text-gray-900 dark:text-white">
          Companies I've Worked With
        </h2>
        
        {/* Desktop: Horizontal layout */}
        <div className="hidden md:flex justify-center items-center space-x-8 lg:space-x-12">
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex-shrink-0 transition-all duration-300 hover:scale-105"
            >
              {company.url ? (
                <a
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-12 lg:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 dark:brightness-0 dark:invert dark:hover:brightness-100 dark:hover:invert-0"
                  />
                </a>
              ) : (
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="h-12 lg:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 dark:brightness-0 dark:invert dark:hover:brightness-100 dark:hover:invert-0"
                />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: Grid layout */}
        <div className="grid grid-cols-2 gap-8 md:hidden">
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex justify-center items-center transition-all duration-300 hover:scale-105"
            >
              {company.url ? (
                <a
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 dark:brightness-0 dark:invert dark:hover:brightness-100 dark:hover:invert-0"
                  />
                </a>
              ) : (
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 dark:brightness-0 dark:invert dark:hover:brightness-100 dark:hover:invert-0"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;