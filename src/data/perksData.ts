
import * as Icons from "lucide-react";

// Define the Perk type
export interface Perk {
  id: string;
  name: string;
  description: string;
  tags: string[];
  link: string;
  icon: keyof typeof Icons;
  isVerified?: boolean;
  isNew?: boolean;
  comingSoon?: boolean;
}

// List of perk tags for filtering
export const perkTags = [
  "Student-only",
  "Free Credits",
  "AI Tools",
  "Design Tools",
  "Developer Tools",
  "Cloud Platforms",
  "Open Source"
];

// Sample perks data
export const perks: Perk[] = [
  {
    id: "github-student-pack",
    name: "GitHub Student Pack",
    description: "Get access to 100+ free tools including GitHub Pro, Canva Pro, and more.",
    tags: ["Student-only", "Developer Tools"],
    link: "https://education.github.com/pack",
    icon: "GraduationCap",
    isVerified: true
  },
  {
    id: "aws-educate",
    name: "AWS Educate",
    description: "Access AWS services and credits for free through the AWS Educate program.",
    tags: ["Student-only", "Cloud Platforms", "Free Credits"],
    link: "https://aws.amazon.com/education/awseducate/",
    icon: "Cloud",
    isVerified: true
  },
  {
    id: "azure-for-students",
    name: "Azure for Students",
    description: "Get $100 in Azure credits and 25+ free services for a year with no credit card required.",
    tags: ["Student-only", "Cloud Platforms", "Free Credits"],
    link: "https://azure.microsoft.com/en-us/free/students/",
    icon: "Cloud",
    isVerified: true
  },
  {
    id: "figma-education",
    name: "Figma Education",
    description: "Get free access to Figma Professional for students and educators.",
    tags: ["Student-only", "Design Tools"],
    link: "https://www.figma.com/education/",
    icon: "Palette",
    isVerified: true
  },
  {
    id: "jetbrains-student",
    name: "JetBrains Student Pack",
    description: "Free access to all JetBrains tools including IntelliJ IDEA, PyCharm, WebStorm, and more.",
    tags: ["Student-only", "Developer Tools"],
    link: "https://www.jetbrains.com/community/education/#students",
    icon: "Code",
    isVerified: true
  },
  {
    id: "mongodb-atlas",
    name: "MongoDB Atlas",
    description: "Get started with 512MB of free storage with MongoDB Atlas database service.",
    tags: ["Free Credits", "Developer Tools", "Cloud Platforms"],
    link: "https://www.mongodb.com/cloud/atlas",
    icon: "Database",
    isVerified: true
  },
  {
    id: "notion-education",
    name: "Notion Education",
    description: "Get Notion's Personal Pro plan for free as a student or educator.",
    tags: ["Student-only", "Developer Tools"],
    link: "https://www.notion.so/product/notion-for-education",
    icon: "FileText",
    isVerified: true
  },
  {
    id: "digitalocean-startup",
    name: "DigitalOcean Startup Credits",
    description: "Receive $200 in credits over 60 days to build your apps and scale your infrastructure.",
    tags: ["Free Credits", "Cloud Platforms"],
    link: "https://www.digitalocean.com/try/startups",
    icon: "Server",
    isVerified: true
  },
  {
    id: "adobe-creative-cloud-student",
    name: "Adobe Creative Cloud for Students",
    description: "Get 60% off Creative Cloud with access to Photoshop, Illustrator, and more.",
    tags: ["Student-only", "Design Tools"],
    link: "https://www.adobe.com/creativecloud/buy/students.html",
    icon: "Brush",
    isVerified: true
  },
  {
    id: "cloudflare-developers",
    name: "Cloudflare for Developers",
    description: "Free tier for developers including CDN, DNS, DDoS protection, and more.",
    tags: ["Developer Tools", "Cloud Platforms"],
    link: "https://developers.cloudflare.com/",
    icon: "Globe",
    isVerified: true
  },
  {
    id: "openai-credits",
    name: "OpenAI API Credits",
    description: "Get started with $5 in free credits to build AI applications with OpenAI's APIs.",
    tags: ["AI Tools", "Free Credits"],
    link: "https://platform.openai.com/signup",
    icon: "Brain",
    isVerified: true
  },
  {
    id: "vercel-pro-student",
    name: "Vercel Pro for Students",
    description: "Get Vercel Pro for free with unlimited projects, builds, and team members.",
    tags: ["Student-only", "Developer Tools", "Cloud Platforms"],
    link: "https://vercel.com/docs/concepts/next.js/learn/pro-students",
    icon: "Box",
    isVerified: true
  },
  {
    id: "netlify-starter",
    name: "Netlify Starter",
    description: "Deploy sites with a generous free tier including continuous deployment and forms.",
    tags: ["Developer Tools", "Cloud Platforms"],
    link: "https://www.netlify.com/pricing/",
    icon: "Server",
    isVerified: true
  },
  {
    id: "github-copilot-student",
    name: "GitHub Copilot for Students",
    description: "Free access to GitHub Copilot for verified students through GitHub Education.",
    tags: ["Student-only", "AI Tools", "Developer Tools"],
    link: "https://docs.github.com/en/education/explore-the-benefits-of-teaching-and-learning-with-github-education/github-global-campus-for-students/about-github-community-exchange",
    icon: "GitPullRequest",
    isVerified: true,
    isNew: true
  },
  {
    id: "canva-pro-education",
    name: "Canva Pro for Education",
    description: "Free Canva Pro for students and teachers with premium features and templates.",
    tags: ["Student-only", "Design Tools"],
    link: "https://www.canva.com/education/",
    icon: "Image",
    isVerified: true
  },
  {
    id: "replit-edu-plan",
    name: "Replit Edu Plan",
    description: "Replit's education plan gives students access to multiplayer coding environment.",
    tags: ["Student-only", "Developer Tools"],
    link: "https://replit.com/site/teams-for-education",
    icon: "Terminal",
    isVerified: true
  },
  {
    id: "stackblitz-pro",
    name: "StackBlitz Pro",
    description: "Online IDE for web development with WebContainers technology.",
    tags: ["Developer Tools"],
    link: "https://stackblitz.com/",
    icon: "Code",
    isVerified: true
  },
  {
    id: "google-cloud-credits",
    name: "Google Cloud Credits",
    description: "Up to $300 in free credits for new users to try Google Cloud services.",
    tags: ["Free Credits", "Cloud Platforms"],
    link: "https://cloud.google.com/free",
    icon: "Cloud",
    isVerified: true
  },
  {
    id: "replicate-credits",
    name: "Replicate Credits",
    description: "Run machine learning models with a usage-based pricing and free starting credits.",
    tags: ["AI Tools", "Free Credits"],
    link: "https://replicate.com/pricing",
    icon: "Layers",
    isVerified: true
  },
  {
    id: "huggingface-pro",
    name: "Hugging Face Pro",
    description: "Access to advanced features on the Hugging Face platform for AI model development.",
    tags: ["AI Tools", "Developer Tools"],
    link: "https://huggingface.co/pricing",
    icon: "Cpu",
    comingSoon: true
  }
];
