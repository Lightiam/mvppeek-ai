import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Cookie, Eye, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Our Commitment to Privacy</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              At MvpPeek AI, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, and protect your data when you use our service.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-medium text-foreground mb-2">Personal Information</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Email address (when you create an account)</li>
                  <li>Name and profile information</li>
                  <li>Information you provide when submitting MVPs</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Usage Information</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Pages you visit and features you use</li>
                  <li>Search queries and interactions with MVPs</li>
                  <li>Device information and browser type</li>
                  <li>IP address and general location</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Cookies and Tracking</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Remember your preferences and settings</li>
                <li>Analyze how you use our service</li>
                <li>Provide personalized content and recommendations</li>
                <li>Measure the effectiveness of our features</li>
              </ul>
              <p>
                You can control cookie settings through your browser preferences. Note that disabling cookies 
                may affect the functionality of some features.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide and improve our services</li>
                <li>Communicate with you about your account and our services</li>
                <li>Personalize your experience</li>
                <li>Ensure the security and integrity of our platform</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Rights (GDPR)</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Under GDPR, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Rectification:</strong> Correct inaccurate personal data</li>
                <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Objection:</strong> Object to processing of your personal data</li>
                <li><strong>Restriction:</strong> Request restriction of processing</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at{" "}
                <a href="mailto:privacy@mvppeek.ai" className="text-primary hover:underline">
                  privacy@mvppeek.ai
                </a>
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
              over the internet is 100% secure.
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold">Contact Us</h2>
            </div>
            <div className="text-muted-foreground">
              <p className="mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2">
                <p>Email: <a href="mailto:privacy@mvppeek.ai" className="text-primary hover:underline">privacy@mvppeek.ai</a></p>
                <p>Address: [Your Company Address]</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy;