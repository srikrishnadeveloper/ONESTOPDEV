
import { LucideIcon } from "lucide-react";

export interface WebTool {
  id: string;
  name: string;
  description: string;
  slug: string;
  tags: string[];
  icon: keyof typeof import("lucide-react");
  url?: string;
}

export const webToolsTags = [
  "CSS",
  "HTML",
  "JavaScript",
  "SEO",
  "Utilities",
  "Formatters",
  "Generators",
  "DevOps",
  "Design",
  "Performance",
  "Text",
  "Images"
];

export const webTools: WebTool[] = [
  {
    id: "tool-1",
    name: "CSS Flexbox Playground",
    description: "Visualize and learn how Flexbox works with interactive examples.",
    slug: "flexbox-playground",
    tags: ["CSS", "Layout", "Design"],
    icon: "Layout"
  },
  {
    id: "tool-2",
    name: "Color Palette Generator",
    description: "Create beautiful color palettes for your web projects.",
    slug: "color-palette",
    tags: ["CSS", "Design", "Generators"],
    icon: "Palette"
  },
  {
    id: "tool-7",
    name: "CSS Grid Generator",
    description: "Build and export CSS grid layouts with a visual editor.",
    slug: "grid-generator",
    tags: ["CSS", "Generators", "Design"],
    icon: "Grid"
  },
  {
    id: "tool-3",
    name: "JSON Formatter & Validator",
    description: "Format, validate, and analyze JSON with syntax highlighting.",
    slug: "json-formatter",
    tags: ["JavaScript", "Formatters", "Utilities"],
    icon: "Code"
  },
  {
    id: "tool-14",
    name: "HTML Validator",
    description: "Validate your HTML code against W3C standards and identify common errors.",
    slug: "html-validator",
    tags: ["HTML", "Validation", "Utilities"],
    icon: "FileCode"
  },
  {
    id: "tool-4",
    name: "Regex Tester",
    description: "Test and debug regular expressions with real-time highlighting.",
    slug: "regex-tester",
    tags: ["JavaScript", "Utilities", "DevOps"],
    icon: "Search"
  },
  {
    id: "tool-6",
    name: "Meta Tag Generator",
    description: "Generate HTML meta tags for better SEO and social sharing.",
    slug: "meta-tag-generator",
    tags: ["HTML", "SEO", "Generators"],
    icon: "Code"
  },
  {
    id: "tool-8",
    name: "HTTP Status Code Reference",
    description: "Quick reference guide for HTTP status codes and their meanings.",
    slug: "http-status-codes",
    tags: ["DevOps", "Utilities"],
    icon: "Server"
  },
  {
    id: "tool-9",
    name: "Markdown Preview",
    description: "Write and preview Markdown with real-time rendering.",
    slug: "markdown-preview",
    tags: ["Formatters", "Utilities"],
    icon: "FileText"
  },
  {
    id: "tool-12",
    name: "CSS Animation Generator",
    description: "Create and export CSS animations with a visual timeline.",
    slug: "css-animation-generator",
    tags: ["CSS", "Generators", "Design"],
    icon: "Zap"
  },
  {
    id: "tool-13",
    name: "CSS Formatter",
    description: "Format and beautify your CSS code or minify it for production.",
    slug: "css-formatter",
    tags: ["CSS", "Formatters", "Utilities"],
    icon: "Code"
  },
  {
    id: "tool-15",
    name: "JavaScript Minifier",
    description: "Minify JavaScript code to reduce file size and improve loading speed.",
    slug: "javascript-minifier",
    tags: ["JavaScript", "Performance", "Utilities"],
    icon: "Code"
  },
  {
    id: "tool-16",
    name: "HTML to JSX Converter",
    description: "Convert HTML code to React JSX syntax with automatic fixes for classes and self-closing tags.",
    slug: "html-to-jsx",
    tags: ["HTML", "JavaScript", "React", "Utilities"],
    icon: "Code2"
  },
  {
    id: "tool-17",
    name: "Base64 Encoder/Decoder",
    description: "Encode text and files to Base64 format or decode Base64 strings back to their original form.",
    slug: "base64-encoder-decoder",
    tags: ["Utilities", "JavaScript", "DevOps"],
    icon: "FileCode"
  },
  {
    id: "tool-18",
    name: "Button Generator",
    description: "Create customized buttons with live preview and get the HTML & CSS code.",
    slug: "button-generator",
    tags: ["CSS", "HTML", "Design", "Generators"],
    icon: "Square"
  },
  {
    id: "tool-20",
    name: "SVG Wave Generator",
    description: "Create customizable SVG wave patterns for website backgrounds and dividers.",
    slug: "svg-wave-generator",
    tags: ["CSS", "SVG", "Design", "Generators"],
    icon: "Waves"
  },
  {
    id: "tool-21",
    name: "CSS Gradient Generator",
    description: "Create beautiful linear and radial gradients with a visual editor.",
    slug: "css-gradient-generator",
    tags: ["CSS", "Design", "Generators"],
    icon: "Palette"
  },
  {
    id: "tool-22",
    name: "Box Shadow Generator",
    description: "Design and customize CSS box shadows with live preview.",
    slug: "box-shadow-generator",
    tags: ["CSS", "Design", "Generators"],
    icon: "Square"
  },
  {
    id: "tool-23",
    name: "Text Shadow Generator",
    description: "Create and customize CSS text shadows with live preview and multiple shadow layers.",
    slug: "text-shadow-generator",
    tags: ["CSS", "Design", "Generators"],
    icon: "Type"
  },
  {
    id: "tool-24",
    name: "Border Radius Generator",
    description: "Create custom CSS border radius values for elements with live preview.",
    slug: "border-radius-generator",
    tags: ["CSS", "Design", "Generators"],
    icon: "SquareCode"
  },
  {
    id: "tool-25",
    name: "UUID Generator",
    description: "Generate random UUIDs (v4) for use in applications and databases.",
    slug: "uuid-generator",
    tags: ["JavaScript", "Utilities", "Generators"],
    icon: "Key"
  },
  {
    id: "tool-26",
    name: "Text Case Converter",
    description: "Convert text between different case formats including camelCase, PascalCase, and more.",
    slug: "text-case-converter",
    tags: ["Formatters", "Utilities", "Text"],
    icon: "Type"
  },
  {
    id: "tool-27",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text for layouts, designs, and mockups in various formats.",
    slug: "lorem-ipsum-generator",
    tags: ["Text", "Content", "Generators", "Utilities"],
    icon: "FileText"
  },
  {
    id: "tool-29",
    name: "SEO Analyzer",
    description: "Analyze webpages for SEO issues and get actionable recommendations.",
    slug: "seo-analyzer",
    tags: ["SEO", "Performance", "Utilities"],
    icon: "Search"
  },
  {
    id: "tool-30",
    name: "CSS Float Helper",
    description: "Experiment with float-based layouts and generate CSS code with live preview.",
    slug: "css-float-helper",
    tags: ["CSS", "Layout", "Design", "Generators"],
    icon: "AlignLeft"
  },
  {
    id: "tool-31",
    name: "CSS Positioning Tool",
    description: "Visualize and experiment with CSS positioning types with drag-and-drop functionality.",
    slug: "css-positioning-tool",
    tags: ["CSS", "Layout", "Design"],
    icon: "Move"
  }
];

