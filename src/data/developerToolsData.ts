
export interface DeveloperTool {
  id: string;
  name: string;
  logo: string;
  description: string;
  url: string;
  tags: string[];
}

export const developerTools: DeveloperTool[] = [
  {
    id: "supabase",
    name: "Supabase",
    logo: "https://supabase.com/favicon/favicon-196x196.png",
    description: "Open-source Firebase alternative with authentication, database, and storage solutions.",
    url: "https://supabase.com",
    tags: ["Database", "Authentication", "Storage"]
  },
  {
    id: "vercel",
    name: "Vercel",
    logo: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png",
    description: "Platform for frontend frameworks and static sites, built to integrate with your headless content, commerce, or database.",
    url: "https://vercel.com",
    tags: ["Hosting", "Deployment", "Frontend"]
  },
  {
    id: "github",
    name: "GitHub",
    logo: "https://github.githubassets.com/favicons/favicon.svg",
    description: "Platform for version control and collaboration that lets you and others work together on projects.",
    url: "https://github.com",
    tags: ["Version Control", "Collaboration", "DevOps"]
  },
  {
    id: "netlify",
    name: "Netlify",
    logo: "https://www.netlify.com/icon.svg",
    description: "All-in-one platform for automating web projects. Build, deploy, and manage modern web projects.",
    url: "https://netlify.com",
    tags: ["Hosting", "Deployment", "CI/CD"]
  },
  {
    id: "firebase",
    name: "Firebase",
    logo: "https://www.gstatic.com/devrel-devsite/prod/vfe8699a5d354c41f3f953a7a9794768d4d2f39d37577d5708b5539be069912e1/firebase/images/touchicon-180.png",
    description: "Platform developed by Google for creating mobile and web applications.",
    url: "https://firebase.google.com",
    tags: ["Database", "Authentication", "Hosting", "Storage"]
  },
  {
    id: "aws",
    name: "AWS",
    logo: "https://a0.awsstatic.com/libra-css/images/site/touch-icon-iphone-114-smile.png",
    description: "Comprehensive and broadly adopted cloud platform, offering over 200 fully featured services from data centers globally.",
    url: "https://aws.amazon.com",
    tags: ["Cloud", "Hosting", "Storage", "Computing"]
  },
  {
    id: "docker",
    name: "Docker",
    logo: "https://www.docker.com/wp-content/uploads/2023/04/cropped-Docker-favicon-192x192.png",
    description: "Platform designed to make it easier to create, deploy, and run applications by using containers.",
    url: "https://www.docker.com",
    tags: ["DevOps", "Containers", "Deployment"]
  },
  {
    id: "postman",
    name: "Postman",
    logo: "https://www.postman.com/_ar-assets/images/favicon-1-192.png",
    description: "API platform for building and using APIs. Simplifies each step of the API lifecycle and streamlines collaboration.",
    url: "https://www.postman.com",
    tags: ["API", "Testing", "Development"]
  },
  {
    id: "mongodb",
    name: "MongoDB",
    logo: "https://www.mongodb.com/assets/images/global/favicon.ico",
    description: "Document database with the scalability and flexibility that you want with the querying and indexing that you need.",
    url: "https://www.mongodb.com",
    tags: ["Database", "NoSQL", "Cloud"]
  },
  {
    id: "digitalocean",
    name: "DigitalOcean",
    logo: "https://www.digitalocean.com/apple-touch-icon.png",
    description: "Cloud infrastructure provider dedicated to offering an easy and manageable experience for developers.",
    url: "https://www.digitalocean.com",
    tags: ["Cloud", "Hosting", "Infrastructure"]
  },
  {
    id: "figma",
    name: "Figma",
    logo: "https://static.figma.com/app/icon/1/favicon.svg",
    description: "Cloud-based design tool that is similar to Sketch in functionality and features, but with big differences.",
    url: "https://www.figma.com",
    tags: ["Design", "UI/UX", "Collaboration"]
  },
  {
    id: "vscode",
    name: "VS Code",
    logo: "https://code.visualstudio.com/apple-touch-icon.png",
    description: "Free source-code editor made by Microsoft for Windows, Linux and macOS. Features include support for debugging, syntax highlighting, intelligent code completion, snippets, code refactoring, and embedded Git.",
    url: "https://code.visualstudio.com",
    tags: ["Editor", "Development", "Tools"]
  }
];

export const allTags = [...new Set(developerTools.flatMap(tool => tool.tags))].sort();
