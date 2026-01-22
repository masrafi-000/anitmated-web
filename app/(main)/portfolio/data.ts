export interface PortfolioWork {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  images: string[];
  client?: string;
  year?: string;
  tags: string[];
  
  // Detailed sections for individual project pages
  overview: {
    challenge: string;
    solution: string;
    results: string;
  };
  
  technologies: string[];
  features: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const portfolioWorks: PortfolioWork[] = [
  {
    id: "modern-ecommerce-platform",
    title: "Modern E-Commerce Platform",
    category: "Web Development",
    description: "A cutting-edge e-commerce solution with seamless user experience and powerful backend.",
    thumbnail: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    ],
    client: "TechStore Inc.",
    year: "2024",
    tags: ["Next.js", "E-Commerce", "UI/UX", "React"],
    overview: {
      challenge: "TechStore needed a modern e-commerce platform that could handle thousands of products while maintaining exceptional performance. Their existing system was slow, difficult to navigate, and lacked mobile optimization.",
      solution: "We built a comprehensive Next.js-based platform with server-side rendering for optimal performance, implemented advanced search with filters, integrated real-time inventory management, and created a streamlined checkout process with multiple payment options.",
      results: "The new platform achieved a 45% increase in conversion rates, 60% faster page load times, and a 35% reduction in cart abandonment. Mobile sales increased by 80% within the first three months."
    },
    technologies: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL", "Redis"],
    features: [
      "Real-time inventory management",
      "Advanced product search and filtering",
      "Personalized recommendations",
      "Multi-currency support",
      "Wishlist and comparison tools",
      "One-click checkout"
    ],
    metrics: [
      { label: "Conversion Rate Increase", value: "45%" },
      { label: "Page Load Time", value: "1.2s" },
      { label: "Mobile Sales Growth", value: "80%" },
      { label: "Customer Satisfaction", value: "4.8/5" }
    ],
    testimonial: {
      quote: "Ruby Studio transformed our online presence. The new platform is not only beautiful but incredibly fast and user-friendly. Our sales have skyrocketed!",
      author: "Sarah Johnson",
      role: "CEO, TechStore Inc."
    }
  },
  {
    id: "brand-identity-refresh",
    title: "Brand Identity Refresh",
    category: "Branding",
    description: "Complete brand overhaul for a leading tech startup, creating a modern and memorable identity.",
    thumbnail: "https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600132806608-231446b2e7af?q=80&w=1200&auto=format&fit=crop",
    ],
    client: "Innovate Labs",
    year: "2024",
    tags: ["Branding", "Logo Design", "Visual Identity"],
    overview: {
      challenge: "Innovate Labs had outgrown their initial branding and needed a sophisticated identity that reflected their position as an industry leader. Their existing brand felt dated and didn't resonate with their target enterprise clients.",
      solution: "We developed a comprehensive brand identity system from the ground up, including a modern logo, carefully curated color palette, custom typography, and detailed brand guidelines. The new identity balances innovation with professionalism.",
      results: "The rebrand led to a 50% increase in enterprise client inquiries, improved brand recognition by 65%, and positioned Innovate Labs as a premium player in their industry."
    },
    technologies: ["Adobe Illustrator", "Figma", "Adobe InDesign", "Adobe Photoshop"],
    features: [
      "Custom logo design",
      "Comprehensive brand guidelines",
      "Color palette and typography system",
      "Business card and stationery design",
      "Social media templates",
      "Brand application examples"
    ],
    metrics: [
      { label: "Brand Recognition", value: "+65%" },
      { label: "Enterprise Inquiries", value: "+50%" },
      { label: "Social Engagement", value: "+120%" }
    ],
    testimonial: {
      quote: "The new brand identity perfectly captures who we are as a company. Ruby Studio's attention to detail and strategic thinking exceeded our expectations.",
      author: "Michael Chen",
      role: "Founder, Innovate Labs"
    }
  },
  {
    id: "mobile-fitness-app",
    title: "Mobile Fitness App",
    category: "Mobile Development",
    description: "An intuitive fitness tracking app with personalized workout plans and nutrition guidance.",
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200&auto=format&fit=crop",
    ],
    client: "FitLife",
    year: "2023",
    tags: ["React Native", "Mobile", "Health Tech", "UI/UX"],
    overview: {
      challenge: "FitLife wanted to create a comprehensive fitness app that could compete with established players while offering unique AI-powered features. The app needed to work seamlessly across iOS and Android while integrating with various wearable devices.",
      solution: "We built a cross-platform mobile application using React Native, implemented AI-powered workout recommendations, created an intuitive progress tracking system, and integrated with popular wearable devices for real-time health monitoring.",
      results: "The app achieved 100,000+ downloads in the first six months, maintains a 4.7-star rating, and has a 70% monthly active user retention rate."
    },
    technologies: ["React Native", "TypeScript", "Node.js", "MongoDB", "TensorFlow", "Firebase"],
    features: [
      "AI-powered workout plans",
      "Progress tracking and analytics",
      "Nutrition guidance and meal planning",
      "Wearable device integration",
      "Social features and challenges",
      "Video exercise demonstrations"
    ],
    metrics: [
      { label: "Downloads", value: "100K+" },
      { label: "App Rating", value: "4.7/5" },
      { label: "User Retention", value: "70%" },
      { label: "Daily Active Users", value: "45K" }
    ],
    testimonial: {
      quote: "Ruby Studio brought our vision to life with incredible attention to user experience. The app is beautiful, intuitive, and our users love it!",
      author: "Emma Davis",
      role: "Product Manager, FitLife"
    }
  },
  {
    id: "corporate-website-redesign",
    title: "Corporate Website Redesign",
    category: "Web Design",
    description: "Modern, responsive website redesign for a Fortune 500 company with enhanced user experience.",
    thumbnail: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop",
    ],
    client: "Global Corp",
    year: "2024",
    tags: ["Web Design", "Corporate", "Responsive", "Accessibility"],
    overview: {
      challenge: "Global Corp's website was outdated, not mobile-friendly, and failed to meet modern accessibility standards. They needed a complete redesign that would serve their global audience while maintaining their corporate identity.",
      solution: "We created a modern, fully responsive website with a focus on accessibility (WCAG 2.1 AA compliance), implemented a comprehensive design system for consistency, and optimized for performance across all devices and connection speeds.",
      results: "The redesigned website saw a 55% increase in mobile traffic, 40% improvement in user engagement metrics, and achieved perfect accessibility scores."
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Contentful CMS"],
    features: [
      "Fully responsive design",
      "WCAG 2.1 AA accessibility",
      "Multi-language support",
      "Content management system",
      "Advanced search functionality",
      "Performance optimization"
    ],
    metrics: [
      { label: "Mobile Traffic", value: "+55%" },
      { label: "User Engagement", value: "+40%" },
      { label: "Accessibility Score", value: "100/100" },
      { label: "Page Speed", value: "95/100" }
    ]
  },
  {
    id: "saas-dashboard-ui",
    title: "SaaS Dashboard UI",
    category: "UI/UX Design",
    description: "Intuitive dashboard interface for a B2B SaaS platform with complex data visualization.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop",
    ],
    client: "DataFlow",
    year: "2023",
    tags: ["UI/UX", "Dashboard", "Data Visualization", "SaaS"],
    overview: {
      challenge: "DataFlow's existing dashboard was cluttered and overwhelming, making it difficult for users to extract meaningful insights from their data. They needed a complete UX overhaul that could handle complex data while remaining intuitive.",
      solution: "We redesigned the entire dashboard with a focus on information hierarchy, implemented advanced data visualization components, created customizable widgets, and added real-time collaboration features.",
      results: "User satisfaction scores increased by 75%, time-to-insight decreased by 50%, and customer churn reduced by 30%."
    },
    technologies: ["Figma", "React", "D3.js", "Chart.js", "TypeScript"],
    features: [
      "Customizable dashboard widgets",
      "Advanced data visualizations",
      "Real-time analytics",
      "Collaborative features",
      "Export and reporting tools",
      "Dark mode support"
    ],
    metrics: [
      { label: "User Satisfaction", value: "+75%" },
      { label: "Time to Insight", value: "-50%" },
      { label: "Customer Churn", value: "-30%" },
      { label: "Daily Active Users", value: "+40%" }
    ],
    testimonial: {
      quote: "The new dashboard is a game-changer. Our users can now find the insights they need in seconds instead of minutes. Ruby Studio's design expertise is unmatched.",
      author: "David Park",
      role: "CTO, DataFlow"
    }
  },
  {
    id: "restaurant-branding",
    title: "Restaurant Branding & Menu Design",
    category: "Branding",
    description: "Complete branding package for an upscale restaurant including logo, menu, and collateral.",
    thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?q=80&w=1200&auto=format&fit=crop",
    ],
    client: "La Maison",
    year: "2024",
    tags: ["Branding", "Print Design", "Hospitality"],
    overview: {
      challenge: "La Maison, a new upscale French restaurant, needed a sophisticated brand identity that would appeal to discerning diners while standing out in a competitive market. They required everything from logo to menu design.",
      solution: "We created an elegant brand identity inspired by classic French design with modern touches. The comprehensive package included logo design, menu layouts, signage, business cards, and marketing materials, all reflecting culinary excellence.",
      results: "The restaurant opened to critical acclaim, with the branding contributing to a fully booked first month and strong social media presence with 10K+ followers in the first quarter."
    },
    technologies: ["Adobe Illustrator", "Adobe InDesign", "Adobe Photoshop"],
    features: [
      "Custom logo and wordmark",
      "Menu design (dinner, wine, dessert)",
      "Interior and exterior signage",
      "Business cards and stationery",
      "Social media templates",
      "Packaging design"
    ],
    metrics: [
      { label: "Opening Month Bookings", value: "100%" },
      { label: "Social Followers", value: "10K+" },
      { label: "Press Coverage", value: "15+ outlets" }
    ],
    testimonial: {
      quote: "Ruby Studio captured the essence of French elegance perfectly. Our branding is as exquisite as our cuisine, and our guests notice and appreciate it.",
      author: "Chef Pierre Laurent",
      role: "Owner & Head Chef, La Maison"
    }
  },
];

export const categories = [
  "All",
  "Web Development",
  "Branding",
  "Mobile Development",
  "Web Design",
  "UI/UX Design",
];

export const portfolioStats = [
  { label: "Projects Completed", value: "150+" },
  { label: "Happy Clients", value: "80+" },
  { label: "Years of Excellence", value: "8+" },
  { label: "Team Members", value: "25+" },
];
