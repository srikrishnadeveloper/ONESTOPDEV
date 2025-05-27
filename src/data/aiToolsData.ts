
// Define the AiTool type
export interface AiTool {
  id: string;
  name: string;
  description: string;
  category: string;
  features: string[];
  pricingModel: "Free" | "Paid" | "Freemium";
  link: string;
  popularity: number;
  releaseDate: string;
}

// Create AI tools data
export const aiToolsData: AiTool[] = [
  // Text Generation
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "Advanced language model for natural conversations and content creation",
    category: "Text Generation",
    features: [
      "Natural language processing",
      "Content creation assistance",
      "Question answering",
      "Code writing & debugging"
    ],
    pricingModel: "Freemium",
    link: "https://chat.openai.com",
    popularity: 98,
    releaseDate: "2022-11-30"
  },
  {
    id: "claude",
    name: "Claude",
    description: "Anthropic's conversational AI assistant with strong reasoning capabilities",
    category: "Text Generation",
    features: [
      "Constitutional AI framework",
      "Lower hallucination rate",
      "Long context window",
      "Detailed analysis"
    ],
    pricingModel: "Freemium",
    link: "https://claude.ai",
    popularity: 90,
    releaseDate: "2022-12-15"
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "Google's multimodal AI built to understand text, images, audio and more",
    category: "Text Generation",
    features: [
      "Multimodal understanding",
      "Advanced reasoning",
      "Code understanding",
      "Real-time information"
    ],
    pricingModel: "Freemium",
    link: "https://gemini.google.com",
    popularity: 92,
    releaseDate: "2023-12-06"
  },
  {
    id: "perplexity",
    name: "Perplexity",
    description: "AI-powered answer engine that provides cited, real-time information",
    category: "Text Generation",
    features: [
      "Real-time information retrieval",
      "Source citation",
      "Conversational interface",
      "Accurate answers with evidence"
    ],
    pricingModel: "Freemium",
    link: "https://perplexity.ai",
    popularity: 85,
    releaseDate: "2022-08-30"
  },
  {
    id: "llama3",
    name: "Llama 3",
    description: "Meta's open-source large language model with improved reasoning capabilities",
    category: "Text Generation",
    features: [
      "Open-source architecture",
      "Strong reasoning skills",
      "Local deployment options",
      "Commercial usage allowed"
    ],
    pricingModel: "Free",
    link: "https://llama.meta.com",
    popularity: 88,
    releaseDate: "2023-07-18"
  },
  
  // Image Generation
  {
    id: "midjourney",
    name: "Midjourney",
    description: "AI art generator creating stunning high-quality images from text descriptions",
    category: "Image Generation",
    features: [
      "Photorealistic image generation",
      "Creative art styles",
      "High resolution outputs",
      "Discord-based interface"
    ],
    pricingModel: "Paid",
    link: "https://www.midjourney.com",
    popularity: 95,
    releaseDate: "2022-07-12"
  },
  {
    id: "dalle",
    name: "DALL-E 3",
    description: "OpenAI's image generation model creating detailed imagery from text prompts",
    category: "Image Generation",
    features: [
      "Highly detailed image creation",
      "Text-to-image generation",
      "Understands complex prompts",
      "Style customization"
    ],
    pricingModel: "Freemium",
    link: "https://openai.com/dall-e-3",
    popularity: 94,
    releaseDate: "2023-10-10"
  },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion",
    description: "Open-source AI art model for generating images that can run on consumer hardware",
    category: "Image Generation",
    features: [
      "Open-source framework",
      "Local installation option",
      "Multiple fine-tuned models",
      "Active community development"
    ],
    pricingModel: "Free",
    link: "https://stablediffusionweb.com",
    popularity: 92,
    releaseDate: "2022-08-22"
  },
  {
    id: "runway",
    name: "Runway Gen-2",
    description: "Advanced AI system for generating and editing images and videos",
    category: "Image Generation",
    features: [
      "Text-to-image generation",
      "Image-to-image transformation",
      "Video generation capabilities",
      "Professional creative tools"
    ],
    pricingModel: "Freemium",
    link: "https://runway.ai",
    popularity: 87,
    releaseDate: "2022-09-05"
  },
  {
    id: "leonardo",
    name: "Leonardo.ai",
    description: "AI-powered creative studio for generating and customizing images",
    category: "Image Generation",
    features: [
      "High-quality image generation",
      "Custom model training",
      "Batch generation",
      "Creative asset library"
    ],
    pricingModel: "Freemium",
    link: "https://leonardo.ai",
    popularity: 83,
    releaseDate: "2022-12-20"
  },
  
  // Audio & Music
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    description: "AI voice generator creating ultra-realistic voices and audio",
    category: "Audio & Music",
    features: [
      "Realistic voice synthesis",
      "Voice cloning technology",
      "Multilingual support",
      "Emotional voice control"
    ],
    pricingModel: "Freemium",
    link: "https://elevenlabs.io",
    popularity: 89,
    releaseDate: "2022-01-23"
  },
  {
    id: "musiclm",
    name: "MusicLM",
    description: "Google's AI system that generates high-fidelity music from text descriptions",
    category: "Audio & Music",
    features: [
      "Text-to-music generation",
      "Various musical styles",
      "Consistent long compositions",
      "Prompt-based music creation"
    ],
    pricingModel: "Free",
    link: "https://google-research.github.io/seanet/musiclm/examples",
    popularity: 82,
    releaseDate: "2023-01-27"
  },
  {
    id: "soundraw",
    name: "Soundraw",
    description: "AI music generator creating original royalty-free tracks for content creators",
    category: "Audio & Music",
    features: [
      "Custom music generation",
      "Royalty-free licensing",
      "Genre and mood selection",
      "Length and tempo adjustment"
    ],
    pricingModel: "Freemium",
    link: "https://soundraw.io",
    popularity: 79,
    releaseDate: "2021-06-15"
  },
  {
    id: "mubert",
    name: "Mubert",
    description: "AI-powered music generator creating unlimited royalty-free tracks",
    category: "Audio & Music",
    features: [
      "Royalty-free music generation",
      "Text-to-music creation",
      "Customizable parameters",
      "API access available"
    ],
    pricingModel: "Freemium",
    link: "https://mubert.com",
    popularity: 77,
    releaseDate: "2017-09-01"
  },
  {
    id: "playht",
    name: "Play.ht",
    description: "AI voice generator with 900+ voices in 142 languages",
    category: "Audio & Music",
    features: [
      "Natural-sounding voices",
      "Voice cloning capabilities",
      "Multilingual support",
      "Text-to-speech API"
    ],
    pricingModel: "Freemium",
    link: "https://play.ht",
    popularity: 81,
    releaseDate: "2020-05-12"
  },
  
  // Video Generation
  {
    id: "runway-gen2",
    name: "Runway Gen-2",
    description: "Advanced AI video generator creating videos from text or images",
    category: "Video Generation",
    features: [
      "Text-to-video generation",
      "Image-to-video transformation",
      "Video editing capabilities",
      "Professional video tools"
    ],
    pricingModel: "Paid",
    link: "https://runwayml.com",
    popularity: 90,
    releaseDate: "2023-03-20"
  },
  {
    id: "synthesia",
    name: "Synthesia",
    description: "AI video platform creating professional videos with virtual presenters",
    category: "Video Generation",
    features: [
      "AI video avatars",
      "Text-to-video generation",
      "50+ languages supported",
      "Professional templates"
    ],
    pricingModel: "Paid",
    link: "https://www.synthesia.io",
    popularity: 86,
    releaseDate: "2019-06-25"
  },
  {
    id: "heygen",
    name: "HeyGen",
    description: "AI video platform for creating customizable video presentations with avatars",
    category: "Video Generation",
    features: [
      "Customizable AI avatars",
      "Multiple languages",
      "Voice cloning",
      "Quick video production"
    ],
    pricingModel: "Freemium",
    link: "https://www.heygen.com",
    popularity: 83,
    releaseDate: "2021-10-18"
  },
  {
    id: "pika",
    name: "Pika",
    description: "AI-powered video creation and editing tool for instant videos",
    category: "Video Generation",
    features: [
      "Text-to-video generation",
      "Image-to-video transformation",
      "Video editing capabilities",
      "Style customization"
    ],
    pricingModel: "Freemium",
    link: "https://www.pika.art",
    popularity: 84,
    releaseDate: "2023-05-10"
  },
  {
    id: "sora",
    name: "Sora",
    description: "OpenAI's text-to-video model generating realistic and imaginative scenes",
    category: "Video Generation",
    features: [
      "High-quality video generation",
      "Complex scene understanding",
      "Motion and physics simulation",
      "Realistic human movement"
    ],
    pricingModel: "Paid",
    link: "https://openai.com/research/sora",
    popularity: 94,
    releaseDate: "2024-02-15"
  },
  
  // Code Assistants
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    description: "AI pair programmer that helps you write code faster with suggestions",
    category: "Code Assistants",
    features: [
      "Real-time code completion",
      "Multi-language support",
      "Context-aware suggestions",
      "IDE integration"
    ],
    pricingModel: "Paid",
    link: "https://github.com/features/copilot",
    popularity: 96,
    releaseDate: "2021-06-29"
  },
  {
    id: "codeium",
    name: "Codeium",
    description: "Free AI-powered code completion tool supporting 70+ languages",
    category: "Code Assistants",
    features: [
      "AI code completion",
      "Multi-IDE support",
      "Natural language processing",
      "Code explanation"
    ],
    pricingModel: "Freemium",
    link: "https://codeium.com",
    popularity: 85,
    releaseDate: "2022-04-15"
  },
  {
    id: "tabnine",
    name: "Tabnine",
    description: "AI code assistant that learns your coding patterns for better suggestions",
    category: "Code Assistants",
    features: [
      "Adaptive code completion",
      "Privacy-focused",
      "Local processing option",
      "Multi-language support"
    ],
    pricingModel: "Freemium",
    link: "https://www.tabnine.com",
    popularity: 84,
    releaseDate: "2019-02-28"
  },
  {
    id: "replit-ghostwriter",
    name: "Replit Ghostwriter",
    description: "AI coding assistant integrated into Replit's development environment",
    category: "Code Assistants",
    features: [
      "Code completion",
      "Bug fixing assistance",
      "Code explanation",
      "Integrated development"
    ],
    pricingModel: "Freemium",
    link: "https://replit.com/ghostwriter",
    popularity: 82,
    releaseDate: "2022-09-07"
  },
  {
    id: "amazon-codewhisperer",
    name: "Amazon CodeWhisperer",
    description: "AI coding companion generating real-time code suggestions",
    category: "Code Assistants",
    features: [
      "Real-time code suggestions",
      "AWS service integration",
      "Security scanning",
      "Multi-language support"
    ],
    pricingModel: "Freemium",
    link: "https://aws.amazon.com/codewhisperer",
    popularity: 80,
    releaseDate: "2022-06-23"
  },
  
  // Data & Analytics
  {
    id: "datarobot",
    name: "DataRobot",
    description: "End-to-end AI platform automating the building and deployment of ML models",
    category: "Data & Analytics",
    features: [
      "Automated machine learning",
      "Data preparation tools",
      "Model deployment",
      "Model monitoring"
    ],
    pricingModel: "Paid",
    link: "https://www.datarobot.com",
    popularity: 85,
    releaseDate: "2015-06-10"
  },
  {
    id: "h2o-ai",
    name: "H2O.ai",
    description: "AI platform making it easier for companies to build and deploy ML models",
    category: "Data & Analytics",
    features: [
      "AutoML capabilities",
      "Open-source framework",
      "Model interpretability",
      "Enterprise scalability"
    ],
    pricingModel: "Freemium",
    link: "https://h2o.ai",
    popularity: 83,
    releaseDate: "2015-01-15"
  },
  {
    id: "obviously-ai",
    name: "Obviously AI",
    description: "No-code ML platform for predictions and analytics without coding",
    category: "Data & Analytics",
    features: [
      "No-code prediction models",
      "Automated data preparation",
      "Quick model deployment",
      "Integration capabilities"
    ],
    pricingModel: "Freemium",
    link: "https://www.obviously.ai",
    popularity: 78,
    releaseDate: "2020-02-05"
  },
  {
    id: "pecan",
    name: "Pecan",
    description: "AI-powered predictive analytics platform for business insights",
    category: "Data & Analytics",
    features: [
      "Automated predictive modeling",
      "Business-focused insights",
      "No coding required",
      "Quick implementation"
    ],
    pricingModel: "Paid",
    link: "https://www.pecan.ai",
    popularity: 75,
    releaseDate: "2018-09-20"
  },
  {
    id: "akkio",
    name: "Akkio",
    description: "No-code AI platform helping businesses make predictions from their data",
    category: "Data & Analytics",
    features: [
      "Fast model building",
      "No-code interface",
      "Easy integration",
      "Explainable AI features"
    ],
    pricingModel: "Freemium",
    link: "https://www.akkio.com",
    popularity: 76,
    releaseDate: "2019-12-10"
  },
  
  // No-Code AI
  {
    id: "zapier-ai",
    name: "Zapier AI",
    description: "AI assistant for automation workflows within the Zapier platform",
    category: "No-Code AI",
    features: [
      "AI-powered workflow creation",
      "Natural language processing",
      "Automation suggestions",
      "Integration with 5000+ apps"
    ],
    pricingModel: "Paid",
    link: "https://zapier.com/ai",
    popularity: 88,
    releaseDate: "2023-05-15"
  },
  {
    id: "makecom-ai",
    name: "Make.com AI",
    description: "Visual automation platform with AI capabilities for complex workflows",
    category: "No-Code AI",
    features: [
      "Visual workflow builder",
      "AI-powered automation",
      "Complex scenario creation",
      "Multi-app integration"
    ],
    pricingModel: "Freemium",
    link: "https://www.make.com",
    popularity: 85,
    releaseDate: "2023-01-30"
  },
  {
    id: "bubble-ai",
    name: "Bubble.io AI",
    description: "No-code platform with AI capabilities for building web applications",
    category: "No-Code AI",
    features: [
      "AI-powered app building",
      "Visual development",
      "Database integration",
      "Plugin ecosystem"
    ],
    pricingModel: "Freemium",
    link: "https://bubble.io",
    popularity: 84,
    releaseDate: "2022-11-20"
  },
  {
    id: "flutterflow-ai",
    name: "FlutterFlow AI",
    description: "No-code platform for building Flutter apps with AI assistance",
    category: "No-Code AI",
    features: [
      "Visual app building",
      "AI-powered design",
      "Native app generation",
      "Real-time collaboration"
    ],
    pricingModel: "Freemium",
    link: "https://flutterflow.io",
    popularity: 79,
    releaseDate: "2023-02-25"
  },
  {
    id: "botpress",
    name: "Botpress",
    description: "Open-source platform for building conversational AI with no coding",
    category: "No-Code AI",
    features: [
      "Visual chatbot builder",
      "NLU capabilities",
      "Conversation design",
      "Multi-channel deployment"
    ],
    pricingModel: "Freemium",
    link: "https://botpress.com",
    popularity: 81,
    releaseDate: "2017-08-10"
  },
  
  // Writing & Content
  {
    id: "jasper",
    name: "Jasper",
    description: "AI content platform that helps create marketing copy and content",
    category: "Writing & Content",
    features: [
      "AI content generation",
      "Marketing copy templates",
      "Collaboration tools",
      "Brand voice customization"
    ],
    pricingModel: "Paid",
    link: "https://www.jasper.ai",
    popularity: 89,
    releaseDate: "2021-01-30"
  },
  {
    id: "copy-ai",
    name: "Copy.ai",
    description: "AI copywriting tool generating marketing copy, emails, and social media content",
    category: "Writing & Content",
    features: [
      "Marketing copy templates",
      "Social media content",
      "Email writing",
      "Multiple language support"
    ],
    pricingModel: "Freemium",
    link: "https://www.copy.ai",
    popularity: 86,
    releaseDate: "2020-12-15"
  },
  {
    id: "writesonic",
    name: "Writesonic",
    description: "AI writer for creating SEO-optimized content, ads, and product descriptions",
    category: "Writing & Content",
    features: [
      "SEO content creation",
      "Marketing copy",
      "Product descriptions",
      "Fact-checking capability"
    ],
    pricingModel: "Freemium",
    link: "https://writesonic.com",
    popularity: 85,
    releaseDate: "2020-10-20"
  },
  {
    id: "contentbot",
    name: "ContentBot",
    description: "AI content creation assistant for blogs, ads, and social media",
    category: "Writing & Content",
    features: [
      "Long-form content writing",
      "Content repurposing",
      "SEO optimization",
      "Content templates"
    ],
    pricingModel: "Freemium",
    link: "https://contentbot.ai",
    popularity: 78,
    releaseDate: "2021-03-10"
  },
  {
    id: "grammarly",
    name: "Grammarly",
    description: "AI writing assistant checking grammar, clarity, and improving writing style",
    category: "Writing & Content",
    features: [
      "Grammar checking",
      "Style improvement",
      "Tone adjustment",
      "Plagiarism detection"
    ],
    pricingModel: "Freemium",
    link: "https://www.grammarly.com",
    popularity: 93,
    releaseDate: "2009-08-01"
  },
  
  // Speech & Voice
  {
    id: "descript",
    name: "Descript",
    description: "All-in-one audio/video editor with AI voice generation and transcription",
    category: "Speech & Voice",
    features: [
      "AI voice cloning",
      "Audio transcription",
      "Video editing",
      "Content repurposing"
    ],
    pricingModel: "Freemium",
    link: "https://www.descript.com",
    popularity: 88,
    releaseDate: "2017-01-15"
  },
  {
    id: "resemble-ai",
    name: "Resemble AI",
    description: "Voice AI platform for creating synthetic voices that sound like real people",
    category: "Speech & Voice",
    features: [
      "Voice cloning technology",
      "Realistic voice synthesis",
      "Emotion control",
      "API access"
    ],
    pricingModel: "Paid",
    link: "https://www.resemble.ai",
    popularity: 82,
    releaseDate: "2019-05-10"
  },
  {
    id: "wellsaid",
    name: "WellSaid Labs",
    description: "AI voice generator creating human-like voiceovers for content",
    category: "Speech & Voice",
    features: [
      "High-quality voice synthesis",
      "Studio-grade voiceovers",
      "Custom voice creation",
      "Collaborative tools"
    ],
    pricingModel: "Paid",
    link: "https://wellsaidlabs.com",
    popularity: 80,
    releaseDate: "2019-01-20"
  },
  {
    id: "speechify",
    name: "Speechify",
    description: "Text-to-speech app that reads articles, documents, and books aloud",
    category: "Speech & Voice",
    features: [
      "Natural-sounding voices",
      "Multiple languages",
      "Reading speed control",
      "Mobile app support"
    ],
    pricingModel: "Freemium",
    link: "https://speechify.com",
    popularity: 85,
    releaseDate: "2016-11-05"
  },
  {
    id: "murf",
    name: "Murf AI",
    description: "AI voice generator with studio-quality voices for videos and presentations",
    category: "Speech & Voice",
    features: [
      "Studio-quality voice generation",
      "Multiple languages and accents",
      "Voice customization",
      "Commercial usage rights"
    ],
    pricingModel: "Freemium",
    link: "https://murf.ai",
    popularity: 83,
    releaseDate: "2020-07-15"
  },
  
  // Image Editing
  {
    id: "remini",
    name: "Remini",
    description: "AI photo enhancer turning blurry pictures into clear, high-definition images",
    category: "Image Editing",
    features: [
      "Photo enhancement",
      "Face restoration",
      "Old photo repair",
      "Video enhancement"
    ],
    pricingModel: "Freemium",
    link: "https://remini.ai",
    popularity: 89,
    releaseDate: "2019-10-12"
  },
  {
    id: "lets-enhance",
    name: "Let's Enhance",
    description: "AI image upscaler improving resolution without losing quality",
    category: "Image Editing",
    features: [
      "Image upscaling",
      "Resolution enhancement",
      "Noise reduction",
      "Batch processing"
    ],
    pricingModel: "Freemium",
    link: "https://letsenhance.io",
    popularity: 84,
    releaseDate: "2017-11-01"
  },
  {
    id: "cleanup",
    name: "Cleanup.pictures",
    description: "AI tool removing unwanted objects, people, or text from images",
    category: "Image Editing",
    features: [
      "Object removal",
      "Background removal",
      "Text removal",
      "Free limited usage"
    ],
    pricingModel: "Freemium",
    link: "https://cleanup.pictures",
    popularity: 86,
    releaseDate: "2021-06-01"
  },
  {
    id: "photoroom",
    name: "PhotoRoom",
    description: "AI-powered photo editor for removing backgrounds and creating product photos",
    category: "Image Editing",
    features: [
      "Background removal",
      "Object removal",
      "Template designs",
      "Mobile app support"
    ],
    pricingModel: "Freemium",
    link: "https://www.photoroom.com",
    popularity: 85,
    releaseDate: "2019-09-15"
  },
  {
    id: "topaz-photo",
    name: "Topaz Photo AI",
    description: "AI-powered photo enhancement software for noise reduction and sharpening",
    category: "Image Editing",
    features: [
      "Noise reduction",
      "Image sharpening",
      "Detail enhancement",
      "Batch processing"
    ],
    pricingModel: "Paid",
    link: "https://www.topazlabs.com/topaz-photo-ai",
    popularity: 82,
    releaseDate: "2022-08-25"
  }
];
