import { useState, useEffect, Suspense, lazy } from 'react';
import { ThemeProvider } from './contexts/ThemeProvider';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { portfolioData } from './data/portfolio-data';

// Lazy load sections for code splitting
const Hero = lazy(() => import('./components/sections/Hero').then(module => ({ default: module.Hero })));
const Experience = lazy(() => import('./components/sections/Experience').then(module => ({ default: module.Experience })));
const About = lazy(() => import('./components/sections/About').then(module => ({ default: module.About })));
const Portfolio = lazy(() => import('./components/sections/Portfolio').then(module => ({ default: module.Portfolio })));
const Education = lazy(() => import('./components/sections/Education').then(module => ({ default: module.Education })));
const Contact = lazy(() => import('./components/sections/Contact').then(module => ({ default: module.Contact })));

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  // Add smooth scroll behavior to the document
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      {isLoading && <Loader onLoadComplete={handleLoadComplete} />}
      
      {!isLoading && (
        <>
          <Navbar />
          
          <main className="min-h-screen bg-background text-foreground">
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>}>
              {/* Hero Section */}
              <section id="home">
                <Hero personal={portfolioData.personal} />
              </section>

              {/* Section Divider */}
              <div className="section-divider"></div>

              {/* Experience Section */}
              <section id="experience">
                <Experience experience={portfolioData.experience} />
              </section>

              {/* Section Divider */}
              <div className="section-divider"></div>

              {/* About Section */}
              <section id="about">
                <About about={portfolioData.about} />
              </section>

              {/* Section Divider */}
              <div className="section-divider"></div>

              {/* Portfolio Section */}
              <section id="portfolio">
                <Portfolio projects={portfolioData.projects} />
              </section>

              {/* Section Divider */}
              <div className="section-divider"></div>

              {/* Education Section */}
              <section id="education">
                <Education education={portfolioData.education} />
              </section>

              {/* Section Divider */}
              <div className="section-divider"></div>

              {/* Contact Section */}
              <section id="contact">
                <Contact contact={portfolioData.contact} />
              </section>
            </Suspense>
          </main>

          <Footer social={portfolioData.social} />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
