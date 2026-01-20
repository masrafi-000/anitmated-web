export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "founder" | "leadership" | "team";
  image: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export const teamMembers: TeamMember[] = [
  // Founders
  {
    id: "john-doe",
    name: "John Doe",
    role: "CEO & Co-Founder",
    category: "founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    bio: "With over 15 years of experience in digital innovation, John leads Ruby Studio's vision and strategy. His passion for creating exceptional digital experiences drives our commitment to excellence.",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "john@rubystudio.com"
  },
  {
    id: "jane-smith",
    name: "Jane Smith",
    role: "COO & Co-Founder",
    category: "founder",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    bio: "Jane brings operational excellence and strategic planning expertise to Ruby Studio. Her focus on efficiency and team development ensures we deliver outstanding results for every client.",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "jane@rubystudio.com"
  },
  {
    id: "michael-chen",
    name: "Michael Chen",
    role: "CTO & Co-Founder",
    category: "founder",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    bio: "As our technical visionary, Michael leads our engineering team in building cutting-edge solutions. His expertise in modern technologies ensures we stay ahead of industry trends.",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "michael@rubystudio.com"
  },

  // Leadership
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    role: "Head of Design",
    category: "leadership",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop",
    bio: "Sarah leads our design team with a focus on user-centered design and visual excellence. Her creative vision shapes every project we deliver.",
    linkedin: "https://linkedin.com",
    email: "sarah@rubystudio.com"
  },
  {
    id: "david-park",
    name: "David Park",
    role: "Head of Development",
    category: "leadership",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
    bio: "David oversees our development team, ensuring code quality and technical excellence in every project. His leadership drives innovation and best practices.",
    linkedin: "https://linkedin.com",
    email: "david@rubystudio.com"
  },
  {
    id: "emily-davis",
    name: "Emily Davis",
    role: "Head of Strategy",
    category: "leadership",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop",
    bio: "Emily crafts winning strategies for our clients, combining market insights with creative thinking to deliver measurable results.",
    linkedin: "https://linkedin.com",
    email: "emily@rubystudio.com"
  },

  // Team Members
  {
    id: "alex-rodriguez",
    name: "Alex Rodriguez",
    role: "Senior UI/UX Designer",
    category: "team",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=800&auto=format&fit=crop",
    bio: "Alex creates intuitive and beautiful user experiences that delight users and drive engagement.",
    linkedin: "https://linkedin.com"
  },
  {
    id: "lisa-wang",
    name: "Lisa Wang",
    role: "Full Stack Developer",
    category: "team",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    bio: "Lisa builds robust and scalable applications with expertise in both frontend and backend technologies.",
    linkedin: "https://linkedin.com"
  },
  {
    id: "james-wilson",
    name: "James Wilson",
    role: "Brand Strategist",
    category: "team",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    bio: "James helps brands find their unique voice and position in the market through strategic thinking.",
    linkedin: "https://linkedin.com"
  },
  {
    id: "maria-garcia",
    name: "Maria Garcia",
    role: "Content Strategist",
    category: "team",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=800&auto=format&fit=crop",
    bio: "Maria crafts compelling content strategies that engage audiences and drive business results.",
    linkedin: "https://linkedin.com"
  },
  {
    id: "tom-anderson",
    name: "Tom Anderson",
    role: "Mobile Developer",
    category: "team",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop",
    bio: "Tom specializes in creating high-performance mobile applications for iOS and Android platforms.",
    linkedin: "https://linkedin.com"
  },
  {
    id: "nina-patel",
    name: "Nina Patel",
    role: "Project Manager",
    category: "team",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop",
    bio: "Nina ensures projects run smoothly from conception to delivery, keeping teams aligned and clients happy.",
    linkedin: "https://linkedin.com"
  },
];

export const getFounders = () => teamMembers.filter(m => m.category === "founder");
export const getLeadership = () => teamMembers.filter(m => m.category === "leadership");
export const getTeam = () => teamMembers.filter(m => m.category === "team");
