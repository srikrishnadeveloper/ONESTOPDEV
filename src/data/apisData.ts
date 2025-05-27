
import { LucideIcon } from "lucide-react";

export interface ApiInfo {
  name: string;
  description: string;
  tags: string[];
  icon: string; // Name of Lucide icon
  url: string;
  tryLink?: string;
}

export const apiList: ApiInfo[] = [
  {
    name: "OpenWeatherMap",
    description: "Real-time weather data with global coverage including forecasts, historical data, and current conditions.",
    tags: ["Weather", "Freemium"],
    icon: "CloudSun",
    url: "https://openweathermap.org/api",
    tryLink: "https://openweathermap.org/current"
  },
  {
    name: "NewsAPI",
    description: "Simple API that returns JSON metadata for headlines and articles from news sources and blogs.",
    tags: ["News", "Freemium"],
    icon: "Newspaper",
    url: "https://newsapi.org/",
    tryLink: "https://newsapi.org/docs/endpoints/top-headlines"
  },
  {
    name: "Firebase Auth",
    description: "Comprehensive auth solution supporting email/password, social logins, and more with an easy SDK.",
    tags: ["Authentication", "Freemium"],
    icon: "Key",
    url: "https://firebase.google.com/docs/auth",
    tryLink: "https://firebase.google.com/docs/auth/web/start"
  },
  {
    name: "Google Translate",
    description: "Neural machine translation for text in more than 100 languages with language detection.",
    tags: ["Translation", "Freemium"],
    icon: "Languages",
    url: "https://cloud.google.com/translate/docs",
    tryLink: "https://cloud.google.com/translate/docs/basic/translate-text"
  },
  {
    name: "Unsplash API",
    description: "Access to the world's largest open collection of high-quality photos with attribution.",
    tags: ["Images", "Freemium"],
    icon: "Image",
    url: "https://unsplash.com/developers",
    tryLink: "https://unsplash.com/documentation"
  },
  {
    name: "OpenAI",
    description: "Powerful AI models for text, image and audio generation, embeddings and assistants.",
    tags: ["AI", "NLP", "Freemium"],
    icon: "Bot",
    url: "https://platform.openai.com/docs/introduction",
    tryLink: "https://platform.openai.com/playground"
  },
  {
    name: "IPinfo",
    description: "Accurate IP address data including geolocation, company, carrier, and privacy detection.",
    tags: ["Location", "Freemium"],
    icon: "MapPin",
    url: "https://ipinfo.io/developers",
    tryLink: "https://ipinfo.io/demo"
  },
  {
    name: "Notion API",
    description: "Build with Notion's database, manage pages, blocks, and integrate with workspaces.",
    tags: ["Productivity", "Freemium"],
    icon: "File",
    url: "https://developers.notion.com/",
    tryLink: "https://developers.notion.com/docs/getting-started"
  },
  {
    name: "Twilio",
    description: "Send and receive text messages, make and receive phone calls, and communicate globally.",
    tags: ["SMS", "Voice", "Freemium"],
    icon: "MessageSquare",
    url: "https://www.twilio.com/docs/usage/api",
    tryLink: "https://www.twilio.com/docs/sms/quickstart"
  },
  {
    name: "Cron Job",
    description: "Free API for scheduled HTTP requests and recurring jobs with reliable execution.",
    tags: ["DevOps", "Free"],
    icon: "Clock",
    url: "https://www.cronjob.org/",
    tryLink: "https://docs.cronjob.org/"
  },
  {
    name: "Stripe",
    description: "Complete payments platform with APIs for accepting payments and managing businesses online.",
    tags: ["Finance", "Payments", "Freemium"],
    icon: "CreditCard",
    url: "https://stripe.com/docs/api",
    tryLink: "https://stripe.com/docs/testing"
  },
  {
    name: "GitHub API",
    description: "Programmatic access to GitHub data including repositories, issues, PRs, and user information.",
    tags: ["Developer Tools", "Free"],
    icon: "Github",
    url: "https://docs.github.com/en/rest",
    tryLink: "https://docs.github.com/en/rest/quickstart"
  },
  {
    name: "Cloudinary",
    description: "Media management platform for image and video uploads, transformations, and delivery.",
    tags: ["Media", "Images", "Freemium"],
    icon: "Cloud",
    url: "https://cloudinary.com/documentation/",
    tryLink: "https://cloudinary.com/documentation/image_transformations"
  },
  {
    name: "Mailchimp",
    description: "Email marketing platform API for managing lists, campaigns, and automation workflows.",
    tags: ["Email", "Marketing", "Freemium"],
    icon: "Mail",
    url: "https://mailchimp.com/developer/",
    tryLink: "https://mailchimp.com/developer/marketing/guides/quick-start/"
  },
  {
    name: "CoinGecko",
    description: "Comprehensive cryptocurrency data API including prices, market data, and exchange rates.",
    tags: ["Finance", "Crypto", "Free"],
    icon: "Bitcoin",
    url: "https://www.coingecko.com/en/api",
    tryLink: "https://www.coingecko.com/en/api/documentation"
  },
  {
    name: "Mapbox",
    description: "Maps, navigation, and location search for web and mobile apps with customizable styles.",
    tags: ["Maps", "Location", "Freemium"],
    icon: "Map",
    url: "https://docs.mapbox.com/",
    tryLink: "https://docs.mapbox.com/mapbox-gl-js/example/"
  },
  {
    name: "Algolia",
    description: "Powerful search API that works instantly across your digital content on any platform.",
    tags: ["Search", "Freemium"],
    icon: "Search",
    url: "https://www.algolia.com/doc/",
    tryLink: "https://www.algolia.com/developers/search-api-demo/"
  },
  {
    name: "Reddit API",
    description: "Access posts, comments, subreddits, and user data from the Reddit platform.",
    tags: ["Social Media", "Free"],
    icon: "MessageCircle",
    url: "https://www.reddit.com/dev/api/",
    tryLink: "https://www.reddit.com/prefs/apps"
  },
  {
    name: "Auth0",
    description: "Universal authentication & authorization platform with single sign-on and multi-factor auth.",
    tags: ["Authentication", "Identity", "Freemium"],
    icon: "Shield",
    url: "https://auth0.com/docs/api",
    tryLink: "https://auth0.com/docs/quickstart"
  },
  {
    name: "Spotify API",
    description: "Access user data, playlists, tracks, and control playback of the Spotify music service.",
    tags: ["Music", "Entertainment", "Free"],
    icon: "Music",
    url: "https://developer.spotify.com/documentation/web-api/",
    tryLink: "https://developer.spotify.com/console/"
  },
  {
    name: "SendGrid",
    description: "Email delivery service API for transactional and marketing emails with rich analytics.",
    tags: ["Email", "Freemium"],
    icon: "Mail",
    url: "https://docs.sendgrid.com/api-reference",
    tryLink: "https://docs.sendgrid.com/for-developers/sending-email/quickstart-nodejs"
  },
  {
    name: "VirusTotal",
    description: "Analyze suspicious files, domains, IPs and URLs to detect malware and other breaches.",
    tags: ["Security", "Freemium"],
    icon: "Shield",
    url: "https://developers.virustotal.com/reference",
    tryLink: "https://developers.virustotal.com/reference/getting-started"
  },
  {
    name: "Geocodio",
    description: "Convert addresses to geographic coordinates and Congressional districts with reverse geocoding.",
    tags: ["Geocoding", "Location", "Freemium"],
    icon: "MapPin",
    url: "https://www.geocod.io/docs/",
    tryLink: "https://www.geocod.io/features/"
  },
  {
    name: "JSONPlaceholder",
    description: "Free fake API for testing and prototyping with resources like posts, comments, and users.",
    tags: ["Development", "Testing", "Free"],
    icon: "Code",
    url: "https://jsonplaceholder.typicode.com/",
    tryLink: "https://jsonplaceholder.typicode.com/guide/"
  },
  {
    name: "Giphy",
    description: "World's largest GIF library API for animated content in apps, messages, and documents.",
    tags: ["Media", "Entertainment", "Freemium"],
    icon: "Image",
    url: "https://developers.giphy.com/docs/api",
    tryLink: "https://developers.giphy.com/explorer/"
  },
  {
    name: "The Movie Database",
    description: "API for movie, TV and actor images with fan ratings and movie posters for over 500,000 movies.",
    tags: ["Entertainment", "Media", "Free"],
    icon: "Film",
    url: "https://developers.themoviedb.org/3/getting-started/introduction",
    tryLink: "https://www.themoviedb.org/documentation/api"
  },
  {
    name: "PurgoMalum",
    description: "Free profanity filter web service for filtering and removing offensive content from text.",
    tags: ["Content", "Moderation", "Free"],
    icon: "FilterX",
    url: "https://www.purgomalum.com/",
    tryLink: "https://www.purgomalum.com/service/json?text=test%20test"
  },
  {
    name: "Clearbit",
    description: "Business data API providing company and contact details for sales and marketing teams.",
    tags: ["Business", "Data", "Freemium"],
    icon: "Building",
    url: "https://clearbit.com/docs",
    tryLink: "https://dashboard.clearbit.com/signup"
  },
  {
    name: "Pexels",
    description: "Free stock photos and videos from talented creators with simple integration.",
    tags: ["Images", "Media", "Free"],
    icon: "Image",
    url: "https://www.pexels.com/api/documentation/",
    tryLink: "https://www.pexels.com/api/v1/"
  },
  {
    name: "DeepL",
    description: "AI-powered translation API with support for 29 languages and exceptional accuracy.",
    tags: ["Translation", "AI", "Freemium"],
    icon: "Languages",
    url: "https://www.deepl.com/docs-api",
    tryLink: "https://www.deepl.com/translator"
  }
];
