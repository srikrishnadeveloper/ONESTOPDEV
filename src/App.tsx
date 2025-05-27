
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import RegexTester from "./pages/RegexTester";
import NotFound from "./pages/NotFound";
import ColorPaletteTool from "./pages/ColorPaletteTool";
import ApiHub from "./pages/ApiHub";
import AiHub from "./pages/AiHub";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ApiVault from "./pages/ApiVault";
import DeveloperTools from "./pages/DeveloperTools";
import WebTools from "./pages/WebTools";
import DevPerks from "./pages/DevPerks";
import DeveloperApis from "./pages/DeveloperApis";
import FlexboxPlayground from "./pages/FlexboxPlayground";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Documentation from "./pages/Documentation";
import TermsOfService from "./pages/TermsOfService";
import CssFormatter from "./pages/CssFormatter";
import HtmlValidator from "./pages/HtmlValidator";
import JavascriptMinifier from "./pages/JavascriptMinifier";
import GridGenerator from "./pages/GridGenerator";
import JsonFormatter from "./pages/JsonFormatter";
import CssAnimationGenerator from "./pages/CssAnimationGenerator";
import HttpStatusCodes from "./pages/HttpStatusCodes";
import MarkdownPreview from "./pages/MarkdownPreview";
import MetaTagGenerator from "./pages/MetaTagGenerator";
import ScrollbarCustomizer from "./pages/ScrollbarCustomizer";
import HtmlToJsxConverter from "./pages/HtmlToJsxConverter";
import Base64EncoderDecoder from "./pages/Base64EncoderDecoder";
import ButtonGenerator from "./pages/ButtonGenerator";
import SvgWaveGenerator from "./pages/SvgWaveGenerator";
import CssGradientGenerator from "./pages/CssGradientGenerator";
import BoxShadowGenerator from "./pages/BoxShadowGenerator";
import TextShadowGenerator from "./pages/TextShadowGenerator";
import BorderRadiusGenerator from "./pages/BorderRadiusGenerator";
import UuidGenerator from "./pages/UuidGenerator";
import TextCaseConverter from "./pages/TextCaseConverter";
import LoremIpsumGenerator from "./pages/LoremIpsumGenerator";
import SeoAnalyzer from "./pages/SeoAnalyzer";
import CssFloatHelper from "./pages/CssFloatHelper";
import CssPositioningTool from "./pages/CssPositioningTool";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="onestopdev-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tools/regex-tester" element={<RegexTester />} />
              <Route path="/tools/color-palette" element={<ColorPaletteTool />} />
              <Route path="/tools/flexbox-playground" element={<FlexboxPlayground />} />
              <Route path="/tools/css-formatter" element={<CssFormatter />} />
              <Route path="/tools/html-validator" element={<HtmlValidator />} />
              <Route path="/tools/javascript-minifier" element={<JavascriptMinifier />} />
              <Route path="/tools/grid-generator" element={<GridGenerator />} />
              <Route path="/tools/json-formatter" element={<JsonFormatter />} />
              <Route path="/tools/css-animation-generator" element={<CssAnimationGenerator />} />
              <Route path="/tools/http-status-codes" element={<HttpStatusCodes />} />
              <Route path="/tools/markdown-preview" element={<MarkdownPreview />} />
              <Route path="/tools/meta-tag-generator" element={<MetaTagGenerator />} />
              <Route path="/tools/scrollbar-customizer" element={<ScrollbarCustomizer />} />
              <Route path="/tools/html-to-jsx" element={<HtmlToJsxConverter />} />
              <Route path="/tools/base64-encoder-decoder" element={<Base64EncoderDecoder />} />
              <Route path="/tools/button-generator" element={<ButtonGenerator />} />
              <Route path="/tools/svg-wave-generator" element={<SvgWaveGenerator />} />
              <Route path="/tools/css-gradient-generator" element={<CssGradientGenerator />} />
              <Route path="/tools/box-shadow-generator" element={<BoxShadowGenerator />} />
              <Route path="/tools/text-shadow-generator" element={<TextShadowGenerator />} />
              <Route path="/tools/border-radius-generator" element={<BorderRadiusGenerator />} />
              <Route path="/tools/uuid-generator" element={<UuidGenerator />} />
              <Route path="/tools/text-case-converter" element={<TextCaseConverter />} />
              <Route path="/tools/lorem-ipsum-generator" element={<LoremIpsumGenerator />} />
              <Route path="/tools/seo-analyzer" element={<SeoAnalyzer />} />
              <Route path="/tools/css-float-helper" element={<CssFloatHelper />} />
              <Route path="/tools/css-positioning-tool" element={<CssPositioningTool />} />
              <Route path="/tools/developer-tools" element={<DeveloperTools />} />
              <Route path="/web-tools" element={<WebTools />} />
              <Route path="/api-hub" element={<ApiHub />} />
              <Route path="/ai-hub" element={<AiHub />} />
              <Route path="/dev-perks" element={<DevPerks />} />
              <Route path="/developer-apis" element={<DeveloperApis />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/api-vault" 
                element={
                  <ProtectedRoute>
                    <ApiVault />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
