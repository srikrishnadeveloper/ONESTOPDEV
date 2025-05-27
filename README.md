# OneStopDev - The Ultimate Developer Resource Hub

OneStopDev is a comprehensive web development toolkit that provides developers with a centralized platform for various tools, utilities, AI assistance, and exclusive developer perks. Built with modern technologies, it serves as a "one-stop" solution for all your development needs.

## 🚀 Features

### 🛠️ Web Development Tools
- **CSS Generators**: Gradient, Border Radius, Box Shadow, Text Shadow generators
- **Layout Tools**: Flexbox Playground, CSS Grid Generator, CSS Positioning tools
- **Code Formatters**: JSON, CSS, HTML, JavaScript formatters and validators
- **Text Utilities**: Case converters, Base64 encoder/decoder, Markdown preview
- **Generators**: UUID generator, Lorem Ipsum, Meta tag generator, SVG wave generator
- **Image Tools**: Image compressor with quality control
- **Developer Utilities**: Regex tester, HTTP status code reference, Scrollbar customizer

### 🤖 AI Hub
- Curated directory of AI tools and services across multiple categories
- AI-powered chatbot for code assistance and explanations
- Integration with Google Gemini for intelligent responses
- Code generation and debugging assistance

### 🔑 API Management
- **API Directory**: Comprehensive list of developer APIs with documentation
- **API Vault**: Secure storage for API keys and tokens (authenticated users)
- **API Request Tester**: Built-in tool for testing API endpoints

### 🎁 Developer Perks
- Exclusive discounts and freebies for developers
- Free credits for various developer services
- Educational resources and learning materials

### 👤 User Features
- GitHub OAuth authentication
- Personal profile management
- Secure API key storage
- Chat history preservation

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Routing**: React Router
- **State Management**: TanStack Query (React Query)
- **Authentication**: Supabase Auth with GitHub OAuth
- **Database**: Supabase (PostgreSQL)
- **Code Highlighting**: Prism.js via react-syntax-highlighter
- **Markdown Processing**: ReactMarkdown with remark-gfm
- **Icons**: Lucide React
- **Notifications**: Custom toast system
- **Linting**: ESLint with TypeScript support

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── layouts/         # Layout components
│   └── WebToolCard.tsx  # Tool card component
├── pages/               # Route components/pages
│   ├── AiHub.tsx       # AI tools directory
│   ├── ApiVault.tsx    # API key management
│   ├── DevPerks.tsx    # Developer perks
│   └── [tools]/        # Individual tool pages
├── hooks/               # Custom React hooks
│   ├── useAuth.ts      # Authentication hook
│   ├── useSearch.ts    # Search functionality
│   ├── useDebounce.ts  # Debounced input hook
│   └── useGeminiChat.ts # AI chat integration
├── data/                # Static data and configurations
│   ├── webToolsData.ts # Web development tools data
│   ├── aiToolsData.ts  # AI tools database
│   ├── apisData.ts     # API directory data
│   └── perksData.ts    # Developer perks data
├── lib/                 # Utility functions
│   ├── utils.ts        # General utilities
│   └── supabase.ts     # Supabase configuration
└── layouts/             # Page layouts
    └── MainLayout.tsx   # Main application layout
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun
- Supabase account (for authentication and database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/onestopdevsk.git
   cd onestopdevsk
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Environment Setup**
   
   Copy the environment template and configure your API keys:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your actual API keys:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Google Gemini AI Configuration  
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```
   
   **⚠️ Important Security Notes:**
   - Never commit `.env.local` to version control
   - Keep your API keys secure and private
   - Use environment variables in production deployments

4. **Supabase Setup**
   
   Set up your Supabase project:
   - Create a new project at [supabase.com](https://supabase.com)
   - Enable GitHub OAuth in Authentication settings
   - Create necessary tables for API vault functionality

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Key Features in Detail

### Web Tools
Each tool provides:
- Real-time preview and code generation
- Copy-to-clipboard functionality
- Export capabilities (SVG, CSS, etc.)
- Responsive design for mobile and desktop
- Syntax highlighting for generated code

### AI Assistant
- Powered by Google Gemini
- Streaming responses for real-time interaction
- Code explanation and debugging assistance
- Context-aware responses based on developer tools
- Chat history for authenticated users

### Search Functionality
- Global search across all tools and resources
- Fuzzy search with category filtering
- Tag-based filtering system
- Debounced input for optimal performance

### Responsive Design
- Mobile-first approach
- Adaptive layouts using Tailwind CSS
- Collapsible sidebar navigation
- Touch-friendly interface

## 🔐 Authentication

The app uses Supabase Auth with GitHub OAuth integration:
- Secure user authentication
- Profile management
- API key vault for authenticated users
- Session persistence

## 🌟 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. Follow TypeScript best practices
2. Use existing UI components from shadcn/ui
3. Maintain consistent styling with Tailwind CSS
4. Add proper error handling and loading states
5. Include appropriate toast notifications for user feedback

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Supabase](https://supabase.com/) for authentication and database services
- [Lucide](https://lucide.dev/) for the icon library
- [Vercel](https://vercel.com/) for hosting and deployment

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the [Documentation](./src/pages/Documentation.tsx) page
- Contact us at support@onestopdev.xyz

## 🔗 Links

- [Live Demo](https://onestopdev.vercel.app)
- [Documentation](https://onestopdev.vercel.app/documentation)
- [API Hub](https://onestopdev.vercel.app/api-hub)
- [AI Tools](https://onestopdev.vercel.app/ai-hub)
- [Developer Perks](https://onestopdev.vercel.app/dev-perks)

---

**Built with ❤️ by the OneStopDev Team**
