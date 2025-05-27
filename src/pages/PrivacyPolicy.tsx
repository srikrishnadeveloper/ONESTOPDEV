
import MainLayout from "@/layouts/MainLayout";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="bg-background text-foreground py-10 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 -ml-2 text-muted-foreground" 
            asChild
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <div className="flex flex-col items-center justify-center text-center">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary mb-4">
              <ShieldCheck size={28} />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 primary-gradient bg-clip-text text-transparent tracking-tight">
              Privacy Policy
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mb-3">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose dark:prose-invert">
          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              Welcome to OneStopDev. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you use our website 
              and services designed for developers.
            </p>
            <p>
              By using OneStopDev, you agree to the collection and use of information in accordance with this policy. 
              We designed this policy to be straightforward and developer-friendly, avoiding unnecessary legal jargon 
              while still being comprehensive.
            </p>
          </section>
          
          {/* Information We Collect */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p>We collect several types of information for various purposes:</p>
            <h3 className="text-xl font-medium mt-6 mb-3">Personal Information</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Email address (when you create an account)</li>
              <li>Name or username</li>
              <li>Profile information</li>
              <li>Authentication data (if using third-party login providers)</li>
            </ul>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Usage Data</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent</li>
              <li>Features and tools used</li>
              <li>Device information</li>
            </ul>
            
            <h3 className="text-xl font-medium mt-6 mb-3">User-Generated Content</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>API keys stored in your vault (encrypted)</li>
              <li>Project data and configurations</li>
              <li>Preferences and settings</li>
            </ul>
          </section>
          
          {/* How We Use Your Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p>We use the collected data for various purposes:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>To provide and maintain our service</li>
              <li>To authenticate you and manage your account</li>
              <li>To notify you about changes to our service</li>
              <li>To allow you to participate in interactive features</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
              <li>To personalize your experience with developer tools and resources</li>
            </ul>
          </section>
          
          {/* How We Protect Your Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">How We Protect Your Information</h2>
            <p>
              The security of your data is important to us. We implement appropriate security measures to protect 
              against unauthorized access, alteration, disclosure, or destruction of your personal information:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>All sensitive data is encrypted in transit using TLS</li>
              <li>API keys and credentials are encrypted at rest</li>
              <li>We use industry-standard database security measures</li>
              <li>Regular security audits and updates</li>
              <li>Restricted access to personal information</li>
            </ul>
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure. While 
              we strive to use commercially acceptable means to protect your personal data, we cannot guarantee 
              its absolute security.
            </p>
          </section>
          
          {/* Third-Party Services */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p>
              OneStopDev integrates with several third-party services to enhance functionality. Each of these 
              services has their own privacy policies:
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Authentication Services</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Google Auth:</strong> When you use Google to sign in, we receive basic profile information. 
                See Google's <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>.
              </li>
              <li>
                <strong>Supabase:</strong> Powers our authentication and database services.
                See their <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>.
              </li>
            </ul>
            
            <h3 className="text-xl font-medium mt-6 mb-3">AI Services</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>OpenAI:</strong> Powers some of our AI tools and features.
                See their <a href="https://openai.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>.
              </li>
              <li>
                <strong>Gemini API:</strong> Used for AI-assisted development. 
                See Google's <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>.
              </li>
            </ul>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Infrastructure</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>n8n:</strong> Used for workflow automation.
                See their <a href="https://n8n.io/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>.
              </li>
              <li>
                <strong>Railway:</strong> Hosting platform for some of our services.
                See their <a href="https://railway.app/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>.
              </li>
              <li>
                <strong>Vercel:</strong> Hosting platform for our front-end.
                See their <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>.
              </li>
            </ul>
          </section>
          
          {/* Cookies & Tracking Technologies */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Cookies & Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our service and store certain information. 
              Cookies are files with a small amount of data which may include an anonymous unique identifier.
            </p>
            <p>
              OneStopDev uses cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Authentication and session management</li>
              <li>Remembering your preferences and settings</li>
              <li>Analytics to improve our service</li>
              <li>Feature functionality (like the theme switcher)</li>
            </ul>
            <p>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
              However, if you do not accept cookies, you may not be able to use some portions of our service.
            </p>
          </section>
          
          {/* Data Retention */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
            <p>
              We will retain your personal information only for as long as is necessary for the purposes set out in this policy. 
              We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, 
              and enforce our policies.
            </p>
            <p>
              If you request deletion of your account, we will delete your personal information from our active databases. However, 
              some information may be retained in backup or archived copies for a period of time, or as required by law.
            </p>
          </section>
          
          {/* User Rights */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">User Rights</h2>
            <p>
              As a user of OneStopDev, you have certain rights related to your personal information:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Access:</strong> You can request copies of your personal data.</li>
              <li><strong>Rectification:</strong> You can request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
              <li><strong>Erasure:</strong> You can request that we delete your personal data, under certain conditions.</li>
              <li><strong>Restriction:</strong> You can request that we restrict the processing of your personal data, under certain conditions.</li>
              <li><strong>Objection:</strong> You can object to our processing of your personal data, under certain conditions.</li>
              <li><strong>Data portability:</strong> You can request that we transfer the data we've collected to another organization, or directly to you, under certain conditions.</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the information provided in the Contact Information section.
            </p>
          </section>
          
          {/* Children's Privacy */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
            <p>
              Our service is not intended for use by children under the age of 16. We do not knowingly collect personal 
              information from children under 16. If we become aware that we have collected personal data from a child 
              under 16 without verification of parental consent, we take steps to remove that information from our servers.
            </p>
          </section>
          
          {/* Changes to This Policy */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last Updated" date at the top of this policy.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy 
              are effective when they are posted on this page.
            </p>
          </section>
          
          {/* Contact Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>By email: support@onestopdev.com</li>
              <li>Through our contact form on the website</li>
            </ul>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPolicy;
