
import MainLayout from "@/layouts/MainLayout";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TermsOfService = () => {
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
              <FileText size={28} />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 primary-gradient bg-clip-text text-transparent tracking-tight">
              Terms of Service
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
              Welcome to OneStopDev. By accessing or using our platform, tools, and services, you agree to comply with 
              and be bound by the following terms and conditions. Please review these terms carefully before using our platform.
            </p>
            <p>
              If you do not agree with any part of these terms, you should not use OneStopDev or any of our services.
              These terms constitute a legally binding agreement between you and OneStopDev regarding your use of our platform.
            </p>
          </section>
          
          {/* Use of Services */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Use of Services</h2>
            <p>
              OneStopDev provides various developer tools, resources, and services intended for personal and educational use. 
              When using our platform, you agree to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use our services in compliance with all applicable laws and regulations.</li>
              <li>Respect the intellectual property rights of others and OneStopDev.</li>
              <li>Not engage in any activity that interferes with or disrupts the services (or the servers and networks connected to the services).</li>
              <li>Not attempt to access features or areas of the platform that you are not authorized to access.</li>
              <li>Not use automated means, including scripts, bots, or scrapers, to access or collect data from our platform.</li>
              <li>Not engage in any form of abusive, harmful, or malicious behavior towards other users or the platform itself.</li>
            </ul>
            <p>
              We reserve the right to terminate or restrict your access to our services if, in our sole discretion, 
              you are in violation of these terms or are misusing the platform.
            </p>
          </section>
          
          {/* Intellectual Property */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
            <p>
              All content, features, and functionality on OneStopDev, including but not limited to text, graphics, logos, 
              icons, images, audio clips, digital downloads, data compilations, and software, are owned by OneStopDev 
              or its licensors and protected by copyright, trademark, and other intellectual property laws.
            </p>
            <h3 className="text-xl font-medium mt-6 mb-3">OneStopDev Content</h3>
            <p>
              You may not copy, modify, distribute, sell, or lease any part of our services or included software, 
              nor may you reverse engineer or attempt to extract the source code of that software, unless laws 
              prohibit these restrictions or you have our written permission.
            </p>
            <h3 className="text-xl font-medium mt-6 mb-3">User Content</h3>
            <p>
              You retain ownership of any intellectual property rights that you hold in content you submit, post, 
              or display on or through the services. By submitting, posting, or displaying content on or through our services, 
              you give us a worldwide, non-exclusive, royalty-free license to use, host, store, reproduce, modify, create 
              derivative works, communicate, publish, publicly perform, publicly display, and distribute such content.
            </p>
          </section>
          
          {/* Tool Limitations */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Tool Limitations</h2>
            <p>
              OneStopDev provides various developer tools and resources on an "as-is" and "as-available" basis. We make no 
              warranties or representations about the accuracy, reliability, or quality of these tools, and we disclaim all 
              warranties, express or implied, including but not limited to merchantability, fitness for a particular purpose, 
              and non-infringement.
            </p>
            <p>
              Our tools may have bugs, errors, or limitations, and we do not guarantee that they will function without interruption or error. 
              You acknowledge that:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Tools are provided for convenience and educational purposes only.</li>
              <li>You should independently verify any results, outputs, or calculations before relying on them.</li>
              <li>We are not liable for any damage, loss, or harm resulting from your use of our tools or inability to use them.</li>
              <li>Tools may change, be updated, or be removed at any time without notice.</li>
            </ul>
            <p>
              In no event shall OneStopDev be liable for any direct, indirect, incidental, special, consequential, or punitive damages, 
              including loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of 
              (or inability to access or use) our services.
            </p>
          </section>
          
          {/* Third-Party Services */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p>
              OneStopDev may integrate with or provide access to third-party APIs, services, or tools. These third-party 
              services have their own terms of service and privacy policies, and your use of such services will be governed 
              by those terms in addition to these Terms of Service.
            </p>
            <p>
              We do not control these third-party services and are not responsible for their availability, reliability, 
              or compliance with applicable regulations. By using our platform:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>You acknowledge that you may be subject to additional terms when using third-party services.</li>
              <li>You agree to comply with any applicable third-party terms when using our platform.</li>
              <li>You understand that we do not endorse or guarantee any third-party service accessible through our platform.</li>
              <li>You agree that OneStopDev is not responsible for any loss or damage that may result from your use of these third-party services.</li>
            </ul>
          </section>
          
          {/* Changes to Terms */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
            <p>
              We may modify these Terms of Service at any time, at our sole discretion. If we do so, we'll let you know 
              by updating the date at the top of the terms and, in some cases, may provide additional notice.
            </p>
            <p>
              Your continued use of OneStopDev after the changes have been made will constitute your acceptance of the 
              changes. If you do not agree to the changes, please stop using our services immediately.
            </p>
            <p>
              It is your responsibility to review these Terms of Service periodically to stay informed of updates, as they 
              will be binding on you.
            </p>
          </section>
          
          {/* Contact Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>By email: support@onestopdev.xyz</li>
              <li>Through our contact form on the website</li>
            </ul>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default TermsOfService;
