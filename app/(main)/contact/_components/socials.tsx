import { Container, Section } from "@/components/ds";
import { ArrowUpRight, Dribbble, Github, Linkedin, Twitter } from "lucide-react";

const socialLinks = [
  {
    name: "Twitter / X",
    handle: "@rubystudio",
    url: "https://twitter.com",
    icon: Twitter,
    color: "bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white",
  },
  {
    name: "LinkedIn",
    handle: "Ruby Studio",
    url: "https://linkedin.com",
    icon: Linkedin,
    color: "bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white",
  },
  {
    name: "Dribbble",
    handle: "rubystudio",
    url: "https://dribbble.com",
    icon: Dribbble,
    color: "bg-pink-500/10 text-pink-500 hover:bg-pink-500 hover:text-white",
  },
  {
    name: "GitHub",
    handle: "rubystudio",
    url: "https://github.com",
    icon: Github,
    color: "bg-zinc-800/10 text-zinc-800 hover:bg-zinc-900 hover:text-white dark:bg-white/10 dark:text-white",
  },
];

export function Socials() {
  return (
    <Section className="border-t">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
             <h2 className="text-3xl font-bold tracking-tight mb-4">
              Connect with us
            </h2>
            <p className="text-muted-foreground text-lg">
              Follow our journey, see behind-the-scenes work, and join our growing community of creators.
            </p>
          </div>
          <a href="#" className="flex items-center text-primary hover:underline font-medium">
             View all channels <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </div>
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between p-6 h-48 rounded-2xl border bg-background transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex justify-between items-start">
                 <div className={`p-3 rounded-full transition-colors duration-300 ${social.color}`}>
                    <social.icon size={24} />
                 </div>
                 <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-1">{social.name}</h3>
                <p className="text-sm text-muted-foreground">{social.handle}</p>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
}
