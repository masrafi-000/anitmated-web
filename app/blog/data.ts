"use client";

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  src: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "digital-aesthetics-2025",
    title: "The Evolution of Digital Aesthetics in 2025",
    description: "Exploring the shift from minimalism to immersive, emotional design systems.",
    date: "Jan 12, 2025",
    readTime: "5 min read",
    author: {
      name: "Sarah Chen",
      role: "Design Director",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
    },
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    tags: ["Design", "Trends", "UX"],
    content: `
      <p>The digital landscape is undergoing a seismic shift. As we settle into 2025, the clean, flat minimalism that dominated the last decade is giving way to something far more visceral: <strong>Emotional Design</strong>.</p>
      
      <h3>Beyond the Grid</h3>
      <p>Designers are breaking free from strict grid systems. We're seeing organic layouts, fluid typography, and a fearless use of color that evokes feeling rather than just conveying information. It's no longer just about usability; it's about memorability.</p>
      
      <h3>Immersive Micro-interactions</h3>
      <p>The difference between a good app and a great one lies in the details. Subtle animations, haptic feedback, and responsive elements turn static interfaces into living, breathing ecosystems. These micro-interactions guide the user's journey, providing silent cues that feel intuitive and satisfying.</p>
      
      <blockquote>"Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs</blockquote>
      
      <p>But in 2025, we'd add: Design is how it makes you <em>feel</em>.</p>
    `
  },
  {
    id: "nextjs-performance",
    title: "Maximizing Next.js Performance",
    description: "Deep dive into server components, streaming, and edge caching strategies.",
    date: "Jan 08, 2025",
    readTime: "8 min read",
    author: {
      name: "James Wilson",
      role: "Lead Engineer",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150&h=150"
    },
    src: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop",
    tags: ["Development", "Next.js", "Performance"],
    content: `
      <p>Speed is currency. In the age of Core Web Vitals, shipping a slow site is not an option. Next.js 15 has introduced powerful tools to ensure your application flies.</p>
      
      <h3>Partial Prerendering (PPR)</h3>
      <p>The holy grail of mixing static speed with dynamic flexibility. PPR allows you to shell out the static parts of your page immediately while streaming in the dynamic bits. This results in instant TTFB (Time to First Byte) without sacrificing personalization.</p>
      
      <h3>Optimizing Images</h3>
      <p>Are you still using standard <code>&lt;img&gt;</code> tags? The updated <code>next/image</code> component now handles AVIF serving automatically, providing better compression ratios than WebP without distinct quality loss.</p>
      
      <h3>Server Actions for Stability</h3>
      <p>Moving mutation logic to the server not only secures your API keys but also reduces the client-side JavaScript bundle. Less JS equals faster TTI (Time to Interactive).</p>
    `
  },
  {
    id: "brand-storytelling",
    title: "Brand Storytelling in the AI Era",
    description: "How to maintain human connection when content is machine-generated.",
    date: "Dec 15, 2024",
    readTime: "6 min read",
    author: {
      name: "Elena Rodriguez",
      role: "Strategy Lead",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150"
    },
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
    tags: ["Strategy", "Branding", "AI"],
    content: `
      <p>AI can write copy, generate images, and even edit video. But can it tell a story that makes you cry? Not yet. As AI content floods the web, authentic human storytelling has become a luxury asset.</p>
      
      <h3>The "Humanness" Premium</h3>
      <p>Brands that lean into imperfection, behind-the-scenes chaos, and genuine founder stories are standing out against the polished, sterile output of generative models. People crave connection with other people, not algorithms.</p>
      
      <h3>Using AI as a Compass, Not a Map</h3>
      <p>We use AI to brainstorm, structure, and refine, but the core narrative arc must come from lived experience. The most successful campaigns of 2024 were those that felt raw and unfiltered.</p>
    `
  },
  {
    id: "1",
    title: "Brand Storytelling in the AI Era",
    description: "How to maintain human connection when content is machine-generated.",
    date: "Dec 15, 2024",
    readTime: "6 min read",
    author: {
      name: "Elena Rodriguez",
      role: "Strategy Lead",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150"
    },
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
    tags: ["Strategy", "Branding", "AI"],
    content: `
      <p>AI can write copy, generate images, and even edit video. But can it tell a story that makes you cry? Not yet. As AI content floods the web, authentic human storytelling has become a luxury asset.</p>
      
      <h3>The "Humanness" Premium</h3>
      <p>Brands that lean into imperfection, behind-the-scenes chaos, and genuine founder stories are standing out against the polished, sterile output of generative models. People crave connection with other people, not algorithms.</p>
      
      <h3>Using AI as a Compass, Not a Map</h3>
      <p>We use AI to brainstorm, structure, and refine, but the core narrative arc must come from lived experience. The most successful campaigns of 2024 were those that felt raw and unfiltered.</p>
    `
  },
  {
    id: "3",
    title: "Brand Storytelling in the AI Era",
    description: "How to maintain human connection when content is machine-generated.",
    date: "Dec 15, 2024",
    readTime: "6 min read",
    author: {
      name: "Elena Rodriguez",
      role: "Strategy Lead",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150"
    },
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
    tags: ["Strategy", "Branding", "AI"],
    content: `
      <p>AI can write copy, generate images, and even edit video. But can it tell a story that makes you cry? Not yet. As AI content floods the web, authentic human storytelling has become a luxury asset.</p>
      
      <h3>The "Humanness" Premium</h3>
      <p>Brands that lean into imperfection, behind-the-scenes chaos, and genuine founder stories are standing out against the polished, sterile output of generative models. People crave connection with other people, not algorithms.</p>
      
      <h3>Using AI as a Compass, Not a Map</h3>
      <p>We use AI to brainstorm, structure, and refine, but the core narrative arc must come from lived experience. The most successful campaigns of 2024 were those that felt raw and unfiltered.</p>
    `
  },
  {
    id: "5",
    title: "Brand Storytelling in the AI Era",
    description: "How to maintain human connection when content is machine-generated.",
    date: "Dec 15, 2024",
    readTime: "6 min read",
    author: {
      name: "Elena Rodriguez",
      role: "Strategy Lead",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150"
    },
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
    tags: ["Strategy", "Branding", "AI"],
    content: `
      <p>AI can write copy, generate images, and even edit video. But can it tell a story that makes you cry? Not yet. As AI content floods the web, authentic human storytelling has become a luxury asset.</p>
      
      <h3>The "Humanness" Premium</h3>
      <p>Brands that lean into imperfection, behind-the-scenes chaos, and genuine founder stories are standing out against the polished, sterile output of generative models. People crave connection with other people, not algorithms.</p>
      
      <h3>Using AI as a Compass, Not a Map</h3>
      <p>We use AI to brainstorm, structure, and refine, but the core narrative arc must come from lived experience. The most successful campaigns of 2024 were those that felt raw and unfiltered.</p>
    `
  },
  {
    id: "4",
    title: "Brand Storytelling in the AI Era",
    description: "How to maintain human connection when content is machine-generated.",
    date: "Dec 15, 2024",
    readTime: "6 min read",
    author: {
      name: "Elena Rodriguez",
      role: "Strategy Lead",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150"
    },
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
    tags: ["Strategy", "Branding", "AI"],
    content: `
      <p>AI can write copy, generate images, and even edit video. But can it tell a story that makes you cry? Not yet. As AI content floods the web, authentic human storytelling has become a luxury asset.</p>
      
      <h3>The "Humanness" Premium</h3>
      <p>Brands that lean into imperfection, behind-the-scenes chaos, and genuine founder stories are standing out against the polished, sterile output of generative models. People crave connection with other people, not algorithms.</p>
      
      <h3>Using AI as a Compass, Not a Map</h3>
      <p>We use AI to brainstorm, structure, and refine, but the core narrative arc must come from lived experience. The most successful campaigns of 2024 were those that felt raw and unfiltered.</p>
    `
  },
  {
    id: "6",
    title: "Brand Storytelling in the AI Era",
    description: "How to maintain human connection when content is machine-generated.",
    date: "Dec 15, 2024",
    readTime: "6 min read",
    author: {
      name: "Elena Rodriguez",
      role: "Strategy Lead",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150"
    },
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
    tags: ["Strategy", "Branding", "AI"],
    content: `
      <p>AI can write copy, generate images, and even edit video. But can it tell a story that makes you cry? Not yet. As AI content floods the web, authentic human storytelling has become a luxury asset.</p>
      
      <h3>The "Humanness" Premium</h3>
      <p>Brands that lean into imperfection, behind-the-scenes chaos, and genuine founder stories are standing out against the polished, sterile output of generative models. People crave connection with other people, not algorithms.</p>
      
      <h3>Using AI as a Compass, Not a Map</h3>
      <p>We use AI to brainstorm, structure, and refine, but the core narrative arc must come from lived experience. The most successful campaigns of 2024 were those that felt raw and unfiltered.</p>
    `
  },
  
];
