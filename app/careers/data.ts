export interface JobOpportunity {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  postedDate: string;
}

export const jobOpportunities: JobOpportunity[] = [
  // Design Roles
  {
    id: "senior-ui-ux-designer",
    title: "Senior UI/UX Designer",
    department: "Design",
    location: "New York, NY / Remote",
    type: "Full-time",
    experience: "5+ years",
    description: "We're seeking a talented Senior UI/UX Designer to lead design projects and mentor junior designers. You'll work on cutting-edge digital products for top-tier clients.",
    responsibilities: [
      "Lead end-to-end design projects from concept to delivery",
      "Create wireframes, prototypes, and high-fidelity designs",
      "Conduct user research and usability testing",
      "Collaborate with developers and stakeholders",
      "Mentor junior designers and contribute to design system",
      "Present design concepts to clients and team members"
    ],
    requirements: [
      "5+ years of UI/UX design experience",
      "Expert proficiency in Figma, Sketch, or Adobe XD",
      "Strong portfolio demonstrating user-centered design",
      "Experience with design systems and component libraries",
      "Excellent communication and presentation skills",
      "Understanding of frontend development (HTML/CSS)"
    ],
    benefits: [
      "Competitive salary ($90k-$130k)",
      "Health, dental, and vision insurance",
      "401(k) with company match",
      "Flexible work arrangements",
      "Professional development budget",
      "Unlimited PTO"
    ],
    postedDate: "2024-01-15"
  },
  {
    id: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "3+ years",
    description: "Join our design team to create beautiful, functional products that users love. You'll work closely with product managers and engineers to deliver exceptional experiences.",
    responsibilities: [
      "Design user interfaces for web and mobile applications",
      "Create user flows, wireframes, and interactive prototypes",
      "Conduct user research and incorporate feedback",
      "Collaborate with cross-functional teams",
      "Maintain and evolve design systems"
    ],
    requirements: [
      "3+ years of product design experience",
      "Proficiency in modern design tools (Figma preferred)",
      "Strong understanding of UX principles",
      "Portfolio showcasing shipped products",
      "Experience with responsive and mobile design",
      "Self-motivated and detail-oriented"
    ],
    benefits: [
      "Competitive salary ($75k-$110k)",
      "Comprehensive health benefits",
      "Stock options",
      "Remote work flexibility",
      "Learning and development opportunities",
      "Modern office with great amenities"
    ],
    postedDate: "2024-01-10"
  },

  // Development Roles
  {
    id: "senior-full-stack-developer",
    title: "Senior Full Stack Developer",
    department: "Development",
    location: "Remote",
    type: "Full-time",
    experience: "6+ years",
    description: "We're looking for an experienced Full Stack Developer to build scalable web applications using modern technologies. You'll work on challenging projects for enterprise clients.",
    responsibilities: [
      "Develop and maintain full-stack web applications",
      "Write clean, maintainable, and well-tested code",
      "Design and implement RESTful APIs",
      "Collaborate with designers and product managers",
      "Optimize application performance and scalability",
      "Mentor junior developers and conduct code reviews"
    ],
    requirements: [
      "6+ years of full-stack development experience",
      "Expert knowledge of React, Next.js, and TypeScript",
      "Strong backend experience (Node.js, Python, or similar)",
      "Experience with databases (PostgreSQL, MongoDB)",
      "Understanding of cloud platforms (AWS, GCP, or Azure)",
      "Excellent problem-solving and communication skills"
    ],
    benefits: [
      "Competitive salary ($110k-$160k)",
      "100% remote work",
      "Health and wellness benefits",
      "Home office stipend",
      "Professional development budget",
      "Flexible working hours"
    ],
    postedDate: "2024-01-12"
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    department: "Development",
    location: "Austin, TX / Remote",
    type: "Full-time",
    experience: "3+ years",
    description: "Join our frontend team to build beautiful, performant user interfaces. You'll work with the latest technologies and best practices.",
    responsibilities: [
      "Build responsive web applications using React and Next.js",
      "Implement pixel-perfect designs from Figma",
      "Optimize frontend performance and accessibility",
      "Write unit and integration tests",
      "Collaborate with designers and backend developers",
      "Contribute to component library and design system"
    ],
    requirements: [
      "3+ years of frontend development experience",
      "Strong proficiency in React, TypeScript, and modern CSS",
      "Experience with Next.js or similar frameworks",
      "Understanding of web performance optimization",
      "Knowledge of accessibility standards (WCAG)",
      "Git and version control expertise"
    ],
    benefits: [
      "Competitive salary ($80k-$120k)",
      "Flexible remote/hybrid work",
      "Health insurance",
      "401(k) matching",
      "Annual conference budget",
      "Generous PTO policy"
    ],
    postedDate: "2024-01-08"
  },

  // Strategy Roles
  {
    id: "digital-strategist",
    title: "Digital Strategist",
    department: "Strategy",
    location: "New York, NY",
    type: "Full-time",
    experience: "4+ years",
    description: "We're seeking a strategic thinker to help clients navigate digital transformation. You'll develop comprehensive strategies that drive business results.",
    responsibilities: [
      "Develop digital strategies for client projects",
      "Conduct market research and competitive analysis",
      "Create strategic roadmaps and recommendations",
      "Present strategies to stakeholders and clients",
      "Collaborate with design and development teams",
      "Track and analyze campaign performance"
    ],
    requirements: [
      "4+ years in digital strategy or consulting",
      "Strong analytical and problem-solving skills",
      "Experience with digital marketing and analytics",
      "Excellent presentation and communication skills",
      "Understanding of UX and design principles",
      "Bachelor's degree in Marketing, Business, or related field"
    ],
    benefits: [
      "Competitive salary ($85k-$125k)",
      "Performance bonuses",
      "Health and wellness benefits",
      "Professional development opportunities",
      "Hybrid work model",
      "Collaborative team environment"
    ],
    postedDate: "2024-01-14"
  },

  // Project Management
  {
    id: "senior-project-manager",
    title: "Senior Project Manager",
    department: "Project Management",
    location: "Chicago, IL / Remote",
    type: "Full-time",
    experience: "5+ years",
    description: "Lead complex digital projects from inception to delivery. You'll work with cross-functional teams to ensure projects are delivered on time and exceed client expectations.",
    responsibilities: [
      "Manage multiple projects simultaneously",
      "Create project plans, timelines, and budgets",
      "Coordinate with design, development, and strategy teams",
      "Communicate with clients and stakeholders",
      "Identify and mitigate project risks",
      "Ensure quality and timely delivery"
    ],
    requirements: [
      "5+ years of project management experience",
      "PMP or Agile certification preferred",
      "Experience with project management tools (Jira, Asana)",
      "Strong leadership and organizational skills",
      "Excellent client communication abilities",
      "Experience in digital agency environment"
    ],
    benefits: [
      "Competitive salary ($90k-$135k)",
      "Comprehensive benefits package",
      "Remote work options",
      "Professional certification support",
      "Career growth opportunities",
      "Team building events"
    ],
    postedDate: "2024-01-11"
  },

  // Marketing
  {
    id: "content-marketing-manager",
    title: "Content Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    experience: "4+ years",
    description: "Drive our content strategy and create compelling content that engages our audience and showcases our expertise.",
    responsibilities: [
      "Develop and execute content marketing strategy",
      "Create blog posts, case studies, and whitepapers",
      "Manage social media presence",
      "Collaborate with design team on visual content",
      "Analyze content performance and optimize",
      "Build thought leadership through content"
    ],
    requirements: [
      "4+ years in content marketing or related role",
      "Exceptional writing and editing skills",
      "Experience with SEO and content optimization",
      "Knowledge of marketing automation tools",
      "Strong understanding of digital marketing",
      "Portfolio of published content"
    ],
    benefits: [
      "Competitive salary ($70k-$100k)",
      "Fully remote position",
      "Health and dental insurance",
      "Professional development budget",
      "Flexible schedule",
      "Creative freedom"
    ],
    postedDate: "2024-01-09"
  }
];

export const departments = [
  "All Positions",
  "Design",
  "Development",
  "Strategy",
  "Project Management",
  "Marketing"
];

export const getDepartmentJobs = (department: string) => {
  if (department === "All Positions") return jobOpportunities;
  return jobOpportunities.filter(job => job.department === department);
};

export const companyBenefits = [
  {
    title: "Competitive Compensation",
    description: "Industry-leading salaries and performance bonuses"
  },
  {
    title: "Health & Wellness",
    description: "Comprehensive health, dental, and vision insurance"
  },
  {
    title: "Work-Life Balance",
    description: "Flexible hours, remote options, and unlimited PTO"
  },
  {
    title: "Professional Growth",
    description: "Learning budget, conferences, and mentorship programs"
  },
  {
    title: "Modern Workspace",
    description: "State-of-the-art offices with latest tools and technology"
  },
  {
    title: "Great Culture",
    description: "Collaborative environment with talented, passionate people"
  }
];
