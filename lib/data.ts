export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  tag: string;
  title: string;
  description: string;
  icon: "calendar-check" | "search" | "zap";
}

export interface SocialLink {
  label: string;
  href: string;
}

export const siteConfig = {
  name: "Miguel",
  title: "Miguel, Software Builder",
  description:
    "Software builder in the Philippines. Websites that bring local businesses more customers.",
  email: "hello@miguel.dev",
};

export const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Get Started", href: "#get-started" },
];

export interface Client {
  name: string;
  logo: string;
  href: string;
}

export const clients: Client[] = [
  {
    name: "Subic Sailing",
    logo: "/images/clients/subic-sailing.png",
    href: "https://subicsailing.com",
  },
  {
    name: "Lanosocorp",
    logo: "/images/clients/lanosocorp.png",
    href: "https://lanosocorp.vercel.app/",
  },
  {
    name: "Good Guys Deli",
    logo: "/images/clients/good-guys-deli.png",
    href: "https://goodguysdeli.com",
  },
  {
    name: "San Juan Surf",
    logo: "/images/clients/san-juan-surf.png",
    href: "https://sanjuansurfresort.ph",
  },
  {
    name: "Sipag",
    logo: "/images/clients/sipag.png",
    href: "https://sipag.ph",
  },
];

export const services: Service[] = [
  {
    id: "booking",
    tag: "Bookings",
    title: "Bookings & Reservations",
    description: "Fewer drop-offs. Less back-and-forth.",
    icon: "calendar-check",
  },
  {
    id: "seo",
    tag: "SEO",
    title: "Local SEO",
    description: "Found on Google. Ready for customers.",
    icon: "search",
  },
  {
    id: "automation",
    tag: "Automation",
    title: "Automation",
    description: "Forms, alerts, and admin. Handled.",
    icon: "zap",
  },
];

export const techTags: string[] = ["Laravel", "Next.js", "React", "MySQL"];

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    step: 1,
    title: "Discovery call",
    description: "Goals, customers, what done looks like.",
  },
  {
    id: "plan",
    step: 2,
    title: "Plan & design",
    description: "Structure and look, before we build.",
  },
  {
    id: "build",
    step: 3,
    title: "Build & iterate",
    description: "Clear phases, with regular check-ins.",
  },
  {
    id: "launch",
    step: 4,
    title: "Launch & support",
    description: "Go live. Hand over. Stay close.",
  },
];

export const aboutParagraphs = [
  "I'm Miguel, a software builder in the Philippines. I make sites and web apps for businesses that want to grow online.",
  "That includes the site customers see, and the tools, dashboards, and automations that keep things running behind it.",
];

export const socialLinks: SocialLink[] = [
  { label: "Email", href: "mailto:hello@miguel.dev" },
  { label: "LinkedIn", href: "https://linkedin.com/in/miguel" },
  { label: "GitHub", href: "https://github.com/miguel" },
];
