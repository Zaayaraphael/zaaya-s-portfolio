import type { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  personal: {
    name: "Raphael Termough Zaaya",
    title: "Junior Full Stack Developer",
    bio: "I'm a full-stack developer based in Makurdi Benue State, Nigeria with 1+ years of hands-on experience building scalable, user-friendly web applications using MERN stack. I enjoy turning real problems into simple, functional solutions - whether it's cleanAPIs, optimizing frontend performance, or integrating AI features that make product smarter. My work focuses on writing maintainable code, improving application reliability, and delivering smooth user experiences. I thrive in fast-learning environments, collaborate well with teams, and continually challenge myself to master both frontend and backend development",
    photo: "/images/profile/hero-photo.jpeg",
    cvUrl: "/documents/cv.pdf"
  },

  companies: [
    {
      id: "company-1",
      name: "TechCorp",
      logo: "/images/companies/techcorp-logo.png",
      url: "https://techcorp.com"
    },
    {
      id: "company-2", 
      name: "InnovateLabs",
      logo: "/images/companies/innovatelabs-logo.png",
      url: "https://innovatelabs.com"
    },
    {
      id: "company-3",
      name: "StartupXYZ",
      logo: "/images/companies/startupxyz-logo.png",
      url: "https://startupxyz.com"
    },
    {
      id: "company-4",
      name: "Enterprise Solutions",
      logo: "/images/companies/enterprise-logo.png",
      url: "https://enterprise-solutions.com"
    }
  ],

  experience: {
    yearsOfExperience: 1,
    services: [
      {
        id: "service-1",
        title: "Full Stack Development",
        description: "End-to-end web application development using modern frameworks like React,  Node.js, and MongoDB From concept to deployment with focus on scalability and performance.",
        icon: "code"
      },
      {
        id: "service-2", 
        title: "Backend & API Development",
        description: "Design and develop secure, efficient and high-performance REST APIs. Focus on server logic, database structuring, authentication and building systems that handle real-world workloads smoothly.",
        icon: "cloud"
      },
      {
        id: "service-3",
        title: "Frontend UI Development",
        description: "Create user-friendly, intuitive and visually appealing interfaces that work seamlessly across devices. Prioritize performance, accessibility and modern design principles to enhance user experience",
        icon: "users"
      }
    ]
  },

  about: {
    bio: "As an Industrial Physics graduate and dedicated software developer, I'm driven by the challenge of turning ideas into practical, impactful digital solutions. I enjoy exploring how technology can simplify real-world problems and I'm especially focused on building scalable, high-performance web applications that deliver smooth and meaningfu user experiences. With experinece across both frontend and backend development, I approach every project with a balance of technical depth and clear problem-solving. My background in science strengthens my analytical thinking, helping me design systems that are efficient, reliable and adaptable. I', particularly passionate about creating clean architectures, improving performance and developing solutions that aligns with real business needs. Every line of code is an opportunity for me to build something that works, matters and can grow",
    photo: "/images/profile/hero-photo.jpeg",
    technologies: [
      "JavaScript", "TypeScript", "React",  "Node.js", 
         "MongoDB", 
       "REST APIs", "Tailwind CSS", "Git",  "Microservices"
    ]
  }, 
 projects: [
    {
      id: "project-1",
      name: "An AI assistant Medical platform",
      description: "MediMama is an intuitive health app that provides quick, AI-powered guidance based on user-described symptoms. With a clean interface and practical recommendations, it simplifies access and reliable health information while encouraging professional care when needed. This project highlights my skills in building user-focused, scalable applications with real-world impact",
      technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS",  "Google Germini AI", ],
      screenshot: "/images/projects/MedimamaApp.png",
      liveUrl: "https://medimama.netlify.app/",
      githubUrl: "https://github.com/Zaayaraphael/medimama",
      featured: true
    },
    {
      id: "project-2",
      name: "ShePower Nexus Hub",
      description: "Collaborate to build a women learning empoverment platform where users can register to take courses and complete a a learning track and earn digital stars while acquiring digital skills.",
      technologies: ["React", "Express", "MongoDB", "Tailwind CSS", "shadcn", "Socket.io", "Tailwind CSS"],
      screenshot: "/images/projects/shepower.png",
      liveUrl: "https://shepowernexushub.vercel.app/",
      githubUrl: "https://github.com/Zaayaraphael/plp-mern-ricky-rexis-project",
      featured: true
    },
    {
      id: "project-3",
      name: "Ter Business",
      description: "Ter business is a simple yet powerful business tracking app built for small business owners, students, and entrepreneurs. it helps users manage daily sales and expenses, calculate profits, generate receipts, and even receive ai-powered business advice — all in one place",
      technologies: ["React", "CSS", "HTML", "Google Germini AI"],
      screenshot: "/images/projects/terbiz.png",
      liveUrl: "https://zaayaraphael.github.io/ter-business/",
      githubUrl: "https://github.com/Zaayaraphael/ter-business?tab=readme-ov-file",
      featured: true
    }
  ],

  education: [
    {
      id: "edu-1",
      category: "degree",
      title: "Bachelor of Science in Industrial Physics",
      institution: "Joseph Sarwuan Tarka University, Makurdi",
      dates: "2019 - 2024",
      description: "Earned a solid foundation in analytical thinking, problem-solving and scientific reasoning, with hands-on experience in research, data interpretation and real-world system analysis. Conducted a research on The Annealing Effect on the Optical Properties of Zinc Doped Cadmium Sulfide (CDS:Zn) Thin Films. This background strengthens my structured approach to technology and software development.",
      certificateUrl: "/certificates/result.jpg"
    },
    {
      id: "edu-2",
      category: "certification",
      title: "Software Development",
      institution: "3MTT Nigeria & NITDA",
      dates: "2025",
      description: "Professional certification demonstrating expertise in building full stack React application. Covered advanced topics in React, Node.js, Express and MongoDB, with a focus on creating scalable, maintainable web applications. Validated skills in frontend and backend development, API design and deployment best practices.",
      certificateUrl: "/certificates/3mtt.png"
    },

    {
      id: "edu-3",
      category: "course",
      title: "TypeScript for JavaScript Developers",
      institution: "LinkedIn Learning",
      dates: "2025",
      description: "Completed a hands-on course focused on using TypeScript to write safer, more maintainable JavaScript code. Gained practical experience with static typing, interfaces, generics and type-safe application structure, improving my ability to build scalable and reliable web applications",
      certificateUrl: "/certificates/typeScript.png"
    },
    
    {
      id: "edu-4",
      category: "course",
      title: "Career Essentials in Generative AI",
      institution: "Microsoft & LinkedIn",
      dates: "2025",
      description: "Completed a foundational program covering core concepts of generative AI, practical use cases, responsible AI principles and real-world applications. Gained a solid understanding of how to integrate AI tools to enhance productivity and build smarter solutions",
      certificateUrl: "/certificates/generativeAI.png"
    },
    
  ],

  contact: {
    email: "raphaelzaaya1@gmail.com",
    description: "I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, feel free to reach out!"
  },

  social: [
    {
      id: "social-1",
      platform: "GitHub",
      url: "https://github.com/Zaayaraphael",
      icon: "github"
    },
    {
      id: "social-2",
      platform: "LinkedIn",
      url: "https://linkedin.com/in/zaaya-raphael",
      icon: "linkedin"
    },
    {
      id: "social-3",
      platform: "Twitter",
      url: "https://twitter.com/zaaya_raphael",
      icon: "twitter"
    },
    {
      id: "social-4",
      platform: "Email",
      url: "mailto:raphaelzaaya1@gmail.com",
      icon: "mail"
    },
    {
      id: "social-5",
      platform: "WhatsApp",
      url: "https://wa.me/2348107016650",  
      icon: "whatsapp"
    },
    {
      id: "social-6",
      platform: "Phone",
      url: "tel:+2348107016650",  
      icon: "phone"
    }
  ]
};